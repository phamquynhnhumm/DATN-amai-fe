import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {FoodService} from "../../../../service/food.service";
import {FoodCategory} from "../../../../model/food/FoodCategory";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {
  userName!: string | null;
  navHome !: string;
  navFood !: string;
  navService !: string;
  navAccount !: string;
  navConten !: string;
  totalCart !: number;
  foodcategory !: Array<FoodCategory>;

  constructor(public authService: AuthService,
              public foodcategoryService: FoodService,
              public auth: AuthService,
              public cartService: OrderService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.cartService.totalMoneyCart(this.auth.getUsername()).subscribe(
      data => {
        this.totalCart = data;
      },
      error => {
        this.totalCart = 0;
      }
    );
    this.foodcategoryService.findAllFoodCategoryIsdeleteUser().subscribe(
      data => {
        this.foodcategory = data;
      }
    )
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.clear();
  }

  navHomeFunction() {
    this.navHome = "active";
    this.navFood = "";
    this.navService = "";
    this.navAccount = "";
    this.navConten = "";
  }

  navFoodFunction() {
    this.navFood = "active";
    this.navHome = "";
    this.navService = "";
    this.navAccount = "";
    this.navConten = "";

  }

  navAccountFunction() {
    this.navAccount = "active";
    this.navHome = "";
    this.navFood = "";
    this.navService = "";
    this.navConten = "";

  }

  navContenFunction() {
    this.navConten = "active";
    this.navHome = "";
    this.navFood = "";
    this.navService = "";
    this.navAccount = "";
  }

  reload(id: number) {
    location.replace("/category/" + id);
  }
}
