import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FoodService} from "../../../../../service/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-editfoodcategory',
  templateUrl: './editfoodcategory.component.html',
  styleUrls: ['./editfoodcategory.component.scss']
})
export class EditfoodcategoryComponent implements OnInit {
  foodcategory!: FoodCategory;

  constructor(private dialogRef: MatDialogRef<EditfoodcategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private foodcategoryService: FoodService,
              private route: Router,
              private fb: FormBuilder
  ) {
  }
  formFoodCategory!: FormGroup;



  ngOnInit(): void {

    this.formFoodCategory =  this.fb.group(
      {
        name:  ['', Validators.required],
        isDeleted: ['', Validators.required],
      }
    )
    this.formFoodCategory = this.data;

  }

  save() {
    this.foodcategory.name = this.formFoodCategory.value.name;
    this.foodcategory.isDeleted = false;
    this.foodcategoryService.updateFoodCategory(this.foodcategory);
    this.snackBar.open("Cập nhật thành cồn", "OK", {
      duration: 4000
    })
  }

  cencal() {
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật danh mục", "OK", {
      duration: 4000
    })
  }
}
