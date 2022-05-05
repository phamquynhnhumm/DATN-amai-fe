import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SinupComponent} from "./sinup/sinup.component";
import {HomeComponent} from "./home/home.component";
import {MenuComponent} from "./menu/menu.component";
import {InfoComponent} from "./info/info.component";
import {AddressComponent} from "./address/address.component";
import {CartComponent} from "./cart/cart.component";
import {OrderComponent} from "./order/order.component";
import {LoginComponent} from "./login/login.component";
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: "sinup", component: SinupComponent},
 {path: "home", component: LayoutComponent},
 {path: "home", component: HomeComponent},
  {path: "menu", component: MenuComponent},
  {path: "info", component: InfoComponent},
  {path: "address", component: AddressComponent},
  {path: "card", component: CartComponent},
  {path: "order", component: OrderComponent},
  {path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
