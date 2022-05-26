import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../../service/order.service";

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

  constructor(public authService: AuthService,
              public auth: AuthService,
              public cartService: OrderService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.authService.assignSessionStorageWithLocalStorage();
      this.userName = this.authService.getUsername();
    }
    // @ts-ignore
    this.cartService.totalMoneyCart(this.auth.getUsername()).subscribe(
      data => {
        this.totalCart = data;
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

  navServiceFunction() {
    this.navService = "active";
    this.navHome = "";
    this.navFood = "";
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
}
