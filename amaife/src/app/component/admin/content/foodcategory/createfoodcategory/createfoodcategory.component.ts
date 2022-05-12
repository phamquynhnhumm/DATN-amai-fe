import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FoodService} from "../../../../../service/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-createfoodcategory',
  templateUrl: './createfoodcategory.component.html',
  styleUrls: ['./createfoodcategory.component.scss']
})
export class CreatefoodcategoryComponent implements OnInit {
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  foodcategory!: FoodCategory;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private foodcategoryservice: FoodService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formFoodCategory = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)])
    }
  )

  onSubmit() {
    if (this.formFoodCategory.valid) {
      this.foodcategoryservice.createFoodCategory(this.formFoodCategory.value).subscribe(
        (data) => {
          console.log(this.formFoodCategory.value)
          this.route.navigateByUrl("/foodcategory").then(() => this.snackBar.open("Thêm mới thành công!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Thêm mới thấy bại !")._dismissAfter(3000);
    }
  }
}
