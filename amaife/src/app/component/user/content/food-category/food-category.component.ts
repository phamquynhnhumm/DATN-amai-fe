import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {FoodService} from "../../../../service/food.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {MatOptionSelectionChange} from "@angular/material/core";
import {FoodCategory} from "../../../../model/food/FoodCategory";

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.component.html',
  styleUrls: ['./food-category.component.scss']
})
export class FoodCategoryComponent implements OnInit {

  foodList!: Array<Food>;
  p: number | any;
  searchSubject = ['Tên món'];
  searchss: string = "Chọn thuộc tính";
  formCart!: FormGroup;
  quatity: number = 1;
  eStatusCart = EStatusCart;
  id !: number;
  foodCategory !: FoodCategory;

  constructor(private foodService: FoodService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private matSnackBar: MatSnackBar,
              private fb: FormBuilder,
              private createService: OrderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.foodService.findAllFoodByFoodCategory_IdUSer(id).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
      }
    );
    this.foodService.findByIdFoodCategoryUser(id).subscribe(
      foodCatregory => {
        this.foodCategory = foodCatregory;
      }
    )
  }

  searchForm = this.fb.group({
    search: ['', Validators.maxLength(100)],
  });

  detailFood(foods: Food) {
    location.replace("/DATN-amai-fe/amaife/detailfood/" + foods.id);
    // this.router.navigate(['/DATN-amai-fe/amaife/detailfood/' + foods.id]);
  }

  onCheckboxChangeFood($event: MatOptionSelectionChange<string>, searchs: string) {
    this.searchss = searchs;
  }

  searchFood(search: string) {
    if (this.searchss == this.searchSubject[0]) {
      this.foodService.searcFoodUser(false, search, this.foodCategory.name).subscribe(
        (data) => {
          this.foodList = data;
        },
        (error) => {
          this.foodService.findAllFoodByFoodCategory_IdUSer(this.activatedRoute.snapshot.params['id']).subscribe(
            data => {
              this.p = 1;
              this.foodList = data;
            }
          )
          this.matSnackBar.open("Hiện không có kết quả nào phù hợp với thông tin cần tìm!")._dismissAfter(3000)
        }
      );
    }
  }

  createCartShoping(foods: Food) {
    this.formCart = new FormGroup(
      {
        quantity: new FormControl(this.quatity, Validators.required),
        status: new FormControl(this.eStatusCart.INSGOPPING, Validators.required),
        food: new FormControl(foods, Validators.required),
        money: new FormControl(foods.price * this.quatity, Validators.required),
      })
    console.log(this.formCart.value);
    this.createService.createCartUser(this.formCart.value).subscribe(
      (data) => {
        this.snackBar.open("Thêm vào giỏ hàng thành công!")._dismissAfter(3000);
        location.replace("/DATN-amai-fe/amaife/category/" + this.foodCategory.id);
      },
      error => {
        this.snackBar.open("Thêm vào giỏ hàng thấy bại !")._dismissAfter(3000);
      });
  }
}
