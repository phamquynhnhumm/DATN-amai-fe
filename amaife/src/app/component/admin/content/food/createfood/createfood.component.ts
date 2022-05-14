import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FoodService} from "../../../../../service/food.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Food} from "../../../../../model/food/Food";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {EStatusFood} from "../../../../../model/food/EStatusFood";
import {FoodDetail} from "../../../../../model/food/FoodDetail";

@Component({
  selector: 'app-createfood',
  templateUrl: './createfood.component.html',
  styleUrls: ['./createfood.component.scss']
})
export class CreatefoodComponent implements OnInit {
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  food!: Food;
  foodcategory !: Array<FoodCategory>;
  fooddetail!: FoodDetail;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private foodService: FoodService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodCategoryIsdelete(false).subscribe(
      data => {
        this.foodcategory = data;
      }
    )
  }

  formFood = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      unit: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      describe: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]),
      quanity: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      foodcategory: new FormGroup({
          id: new FormControl()
        }
      ),
      orderDetailList: new FormArray([]),
      image: new FormControl('', Validators.required),
    }
  )

  onSubmit() {
    if (this.formFood.valid) {
      this.foodService.createFood(this.formFood.value).subscribe(
        (data) => {
          console.log(this.formFood.value)
          this.route.navigateByUrl("/food").then(() => this.snackBar.open("Thêm mới thành công!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Thêm mới thấy bại !")._dismissAfter(3000);
    }
  }
}
