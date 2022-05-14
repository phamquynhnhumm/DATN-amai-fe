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

  constructor(
    private dialogRef: MatDialogRef<EditfoodcategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private foodcategoryService: FoodService,
    private route: Router,
    private fb: FormBuilder) {
  }

  formFoodCategory!: FormGroup;

  ngOnInit(): void {
    this.foodcategory = this.data;
    this.formFoodCategory = new FormGroup(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        isDeleted: new FormControl(this.data.isDeleted),
      }
    );}

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật danh mục", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formFoodCategory.value.isDeleted) {
      this.formFoodCategory.value.isDeleted = true;
    } else {
      this.formFoodCategory.value.isDeleted = false;
    }
    if (this.formFoodCategory.valid) {
      this.foodcategory.name = this.formFoodCategory.value.name;
      if (!this.bolen) {
        this.foodcategory.isDeleted = this.formFoodCategory.value.isDeleted;
        this.foodcategoryService.updateFoodCategory(this.foodcategory).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật danh mục thành công", "OK", {
              duration: 4000
            })
          }
        )
      }
    } else {
      this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
    }
  }
}
