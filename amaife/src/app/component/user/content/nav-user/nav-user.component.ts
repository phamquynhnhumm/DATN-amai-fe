import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../service/auth.service";

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

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      this.authService.assignSessionStorageWithLocalStorage();
      this.userName = this.authService.getUsername();
    }
    ;
    console.log(this.navHome);
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
