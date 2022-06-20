import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Food} from "../../../../../model/food/Food";

@Component({
  selector: 'app-deletefood',
  templateUrl: './deletefood.component.html',
  styleUrls: ['./deletefood.component.scss']
})
export class DeletefoodComponent implements OnInit {
  food!: Food;

  constructor(private dialogRef: MatDialogRef<DeletefoodComponent>,
              private foodService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.food = this.data;
  }

  deletefood() {
    this.foodService.deleteByIdFood(this.food.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá món thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
