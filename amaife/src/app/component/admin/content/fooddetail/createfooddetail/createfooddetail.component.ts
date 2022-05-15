import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../../model/food/Food";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FoodService} from "../../../../../service/food.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../../../model/food/Material";

@Component({
  selector: 'app-createfooddetail',
  templateUrl: './createfooddetail.component.html',
  styleUrls: ['./createfooddetail.component.scss']
})
export class CreatefooddetailComponent implements OnInit {

  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  fooddetail!: FoodDetail;
  foodList !: Array<Food>;
  materialList!: Array<Material>;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private foodService: FoodService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodIsdelete(false).subscribe(
      data => {
        this.foodList = data;
      }
    )
    this.foodService.findAllMaterialIsdelete(false).subscribe(
      datafoodDetail => {
        this.materialList = datafoodDetail;
      }
    )
  }

  formFoodDetail = new FormGroup(
    {
      food: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      material: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      kg: new FormControl('', [Validators.required, Validators.min(0)])
    }
  )

  onSubmit() {
    console.log(this.formFoodDetail.value);
    if (this.formFoodDetail.valid) {
      this.foodService.createFoodDetail(this.formFoodDetail.value).subscribe(
        (data) => {
          console.log(this.formFoodDetail.value)
          this.route.navigateByUrl("/fooddetail").then(() => this.snackBar.open("Thêm mới thành công!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Thêm mới thấy bại !")._dismissAfter(3000);
    }
  }
}
