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
    console.log(this.foodcategory);
  }

  private errors: any;

  deletefoodcategory() {
    this.foodcategoryService.deleteByIdFoodCategory(this.foodcategory.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá danh mục món thành công !!! ", "OK", {
        duration: 4000
      })
      // }, error => {
      //   this.errors = error
      // });
      // if (!this.errors) {
      //   this.dialogRef.close();
      //   this.snackBar.open("Xoá thất bại ! ", "Hủy", {
      //     duration: 4000
    })
    // }
  }
}
