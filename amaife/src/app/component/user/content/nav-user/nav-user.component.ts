import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {OrderService} from "../../../../service/order.service";
import {FoodService} from "../../../../service/food.service";
import {FoodCategory} from "../../../../model/food/FoodCategory";
import {Router} from "@angular/router";
import {Shop} from "../../../../model/shop/Shop";
import {ShopService} from "../../../../service/shop.service";
import {TranslateConfigService} from "../../../../service/translate-config.service";

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
  totalQuantityCart !: number;
  foodcategory !: Array<FoodCategory>;
  shop !: Array<Shop>;

  constructor(public authService: AuthService, private shopService: ShopService,
              public foodcategoryService: FoodService,
              public auth: AuthService,
              private router: Router,
              public cartService: OrderService,
              private translateConfigService: TranslateConfigService
  ) {
  }

  ngOnInit(): void {
    if (this.auth.getUsername() != null) {
      // @ts-ignore
      this.cartService.totalMoneyCart(this.auth.getUsername()).subscribe(
        data => {
          this.totalCart = data;
        },
        error => {
          this.totalCart = 0;
        }
      );
      // @ts-ignore
      this.cartService.totalQuantityCart(this.auth.getUsername()).subscribe(
        data => {
          this.totalQuantityCart = data;
        }
      )
    } else {
      this.totalCart = 0;
      this.totalQuantityCart = 0;
    }
    this.shopService.findAllShopCustomer().subscribe(
      data => {
        this.shop = data;
      }
    )
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
    location.replace("/login");
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

  reload(id: number) {
    this.router.navigate(['/category/' + id]);
  }

  login() {
    location.replace("/login");
  }

  /* Change default language */
  changeDefaultLanguage(langType: string) {
    this.translateConfigService.changeLanguage(langType);
  }
}
