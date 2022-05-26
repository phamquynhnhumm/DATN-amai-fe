import {Component, Input, OnInit, Output} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {OrderService} from "../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.scss']
})
export class HomeuserComponent implements OnInit {

  foodList!: Array<Food>;
  p: number | any;
  formCart!: FormGroup;
  quatity: number = 1;
  eStatusCart = EStatusCart;

  constructor(private foodService: FoodService,
              private router: Router,
              private createService: OrderService,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodIsdelete_User(false).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
      }
    );
  }

  detailFood(foods: Food) {
    this.router.navigate(['/detailfood/' + foods.foodCategory.id]);
  }

  createCartShoping(foods: Food) {
    this.formCart = new FormGroup(
      {
        quantity: new FormControl(this.quatity, Validators.required),
        status: new FormControl(this.eStatusCart.INSGOPPING, Validators.required),
        food: new FormControl(foods, Validators.required),
        money: new FormControl(foods.price * this.quatity, Validators.required),
      })
    this.createService.createCartUser(this.formCart.value).subscribe(
      (data) => {
        this.snackBar.open("Thêm vào giỏ hàng thành công!")._dismissAfter(3000);
        location.replace("/home");
      },
      error => {
        this.snackBar.open("Thêm vào giỏ hàng thấy bại !")._dismissAfter(3000);
      });
  }
}
