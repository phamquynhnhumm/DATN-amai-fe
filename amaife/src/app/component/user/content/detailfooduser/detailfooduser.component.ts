import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {OrderService} from "../../../../service/order.service";
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";

@Component({
  selector: 'app-detailfooduser',
  templateUrl: './detailfooduser.component.html',
  styleUrls: ['./detailfooduser.component.scss']
})
export class DetailfooduserComponent implements OnInit {

  food !: Food;
  cart !: Cart;
  foodList!: Array<Food>;
  p: number | any;
  id!: number | null;
  loads: boolean = true;
  eStatusCart = EStatusCart;
  formCart!: FormGroup;
  quatity: number = 1;

  constructor(private foodService: FoodService,
              private router: Router,
              private createService: OrderService,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              public auth: AuthService
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.foodService.findByIdFoodUser(id).subscribe(
      dataFoodDetail => {
        this.food = dataFoodDetail;
        this.foodService.findAllFoodUserIsdeleteAndFoodCategory(this.food.foodCategory.id).subscribe(
          datafood => {
            this.p = 1;
            this.foodList = datafood;
          }
        )
      }
    );
  }

  detailFood(foods: Food) {
    location.replace("/detailfood/" + foods.id)
  }

  createCartShoping(food: Food) {
    if (this.quatity > 51) {
      this.quatity = 51;
      if (this.auth.getRole() == "") {
        this.router.navigateByUrl("/login");
      } else {
        this.formCart = new FormGroup(
          {
            quantity: new FormControl(this.quatity, Validators.required),
            status: new FormControl(this.eStatusCart.INSGOPPING, Validators.required),
            food: new FormControl(food, Validators.required),
            money: new FormControl(food.price * this.quatity, Validators.required),
          })
        this.createService.createCartUser(this.formCart.value).subscribe(
          (data) => {
            this.snackBar.open("Thêm vào giỏ hàng thành công!")._dismissAfter(3000);
          },
          error => {
            this.snackBar.open("Thêm vào giỏ hàng thấy bại !")._dismissAfter(3000);
          })
      }
    } else {
      if (this.auth.getRole() == "") {
        this.router.navigateByUrl("/login");
      } else {
        this.formCart = new FormGroup(
          {
            quantity: new FormControl(this.quatity, Validators.required),
            status: new FormControl(this.eStatusCart.INSGOPPING, Validators.required),
            food: new FormControl(food, Validators.required),
            money: new FormControl(food.price * this.quatity, Validators.required),
          })
        this.createService.createCartUser(this.formCart.value).subscribe(
          (data) => {
            this.snackBar.open("Thêm vào giỏ hàng thành công!")._dismissAfter(3000);
          },
          error => {
            this.snackBar.open("Thêm vào giỏ hàng thấy bại !")._dismissAfter(3000);
          })
      }
    }
  }

  quatitycong() {
    if (this.quatity < 51) {
      this.quatity = this.quatity + 1;
    }
  }

  quatitytru() {
    if (this.quatity > 1) {
      this.quatity = this.quatity - 1;
    }
  }
}
