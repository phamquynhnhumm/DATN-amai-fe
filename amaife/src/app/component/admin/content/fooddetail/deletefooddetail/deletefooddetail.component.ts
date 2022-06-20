import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodDetail} from "../../../../../model/food/FoodDetail";

@Component({
  selector: 'app-deletefooddetail',
  templateUrl: './deletefooddetail.component.html',
  styleUrls: ['./deletefooddetail.component.scss']
})
export class DeletefooddetailComponent implements OnInit {

  fooddetail!: FoodDetail;

  constructor(private dialogRef: MatDialogRef<DeletefooddetailComponent>,
              private fooddetailService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.fooddetail = this.data;
  }

  deletefooddetail() {
    this.fooddetailService.deleteByIdFoodDetail(this.fooddetail.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá nguyên liệu món thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
