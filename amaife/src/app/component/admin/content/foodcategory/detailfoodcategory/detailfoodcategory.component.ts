import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-detailfoodcategory',
  templateUrl: './detailfoodcategory.component.html',
  styleUrls: ['./detailfoodcategory.component.scss']
})
export class DetailfoodcategoryComponent implements OnInit {

  foodcategory!: FoodCategory;

  constructor(private dialogRef: MatDialogRef<DetailfoodcategoryComponent>,
              private foodcategoryService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }


  ngOnInit(): void {
    this.foodcategory = this.data;
  }

  deletefoodcategory() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi tiết danh mục thành công", "OK", {
      duration: 4000
    })
  }
}
