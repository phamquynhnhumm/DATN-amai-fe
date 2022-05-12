import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {FoodCategory} from "../../../../../model/food/FoodCategory";

@Component({
  selector: 'app-delatefoodcategory',
  templateUrl: './delatefoodcategory.component.html',
  styleUrls: ['./delatefoodcategory.component.scss']
})
export class DelatefoodcategoryComponent implements OnInit {
  foodcategory!: FoodCategory;

  constructor(private dialogRef: MatDialogRef<DelatefoodcategoryComponent>,
              private foodcategoryService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.foodcategory = this.data;
  }

  deletefoodcategory() {
    this.foodcategoryService.deleteByIdFoodCategory(this.foodcategory.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá danh mục món thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
