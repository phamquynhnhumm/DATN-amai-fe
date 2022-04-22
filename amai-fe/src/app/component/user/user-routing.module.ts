import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginUserComponent} from "./login-user/login-user.component";
import {VerificationComponent} from "./verification/verification.component";
import {SinupUserComponent} from "./sinup-user/sinup-user.component";
import {AddressComponent} from "./address/address.component";
import {CartComponent} from "./cart/cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {PersonalInformationComponent} from "./personal-information/personal-information.component";
import {MenuComponent} from "./menu/menu.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: "sinup", component: SinupUserComponent},
  {path: "", component: HomeComponent},
  {path: "menu", component: MenuComponent},
  {path: "info", component: PersonalInformationComponent},
  {path: "address", component: AddressComponent},
  {path: "card", component: CartComponent},
  {path: "order", component: OrdersComponent},
  {path: "login", component: LoginUserComponent},
  {path: "Verification", component: VerificationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
