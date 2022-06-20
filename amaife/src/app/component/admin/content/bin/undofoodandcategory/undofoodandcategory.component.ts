import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodCategory} from "../../../../../model/food/FoodCategory";

@Component({
  selector: 'app-undofoodandcategory',
  templateUrl: './undofoodandcategory.component.html',
  styleUrls: ['./undofoodandcategory.component.scss']
})
export class UndofoodandcategoryComponent implements OnInit {
  foodcategory!: FoodCategory;
  constructor(private dialogRef: MatDialogRef<UndofoodandcategoryComponent>,
              private foodcategoryService: FoodService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.foodcategory = this.data;
  }

  undofoodcategory() {
    this.foodcategory.isDeleted = false;
    this.foodcategoryService.undeleteByIdFoodCategory(this.foodcategory.id, this.foodcategory).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Hoàn tác danh mục thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
