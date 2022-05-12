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
  isdelete!: boolean;

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
    console.log(this.foodcategory)
    this.formFoodCategory = new FormGroup(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(6)]),
        isDeleted: new FormControl('', [Validators.required, Validators.minLength(6)]),
      }
    )
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật danh mục", "OK", {
      duration: 4000
    })
  }


  onSubmit() {
    console.log(this.isdelete)
    this.foodcategory.name = this.formFoodCategory.value.name;
    this.foodcategory.isDeleted = false;
    if (!this.bolen) {
      this.foodcategoryService.updateFoodCategory(this.foodcategory).subscribe(data => {
          this.dialogRef.close();
          this.snackBar.open("Cập nhật danh mục thành công", "OK", {
            duration: 4000
          })
        }
      )
    }
  }
}
