import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeuserComponent} from "./content/homeuser/homeuser.component";
import {MenuuserComponent} from "./content/menuuser/menuuser.component";
import {DetailfooduserComponent} from "./content/detailfooduser/detailfooduser.component";
import {ShopingcartComponent} from "./content/shopingcart/shopingcart.component";
import {ClassComponent} from "./content/class/class.component";
import {AuthGuard} from "../../guard/auth.guard";
import {AccountuserComponent} from "./content/accountuser/accountuser.component";
import {AddressuserComponent} from "./content/addressuser/addressuser.component";
import {ChangepassComponent} from "./content/changepass/changepass.component";
import {OrderuserComponent} from "./content/orderuser/orderuser.component";
import {HistoryOrderUserComponent} from "./content/history-order-user/history-order-user.component";
import {CheckoutComponent} from "./content/checkout/checkout.component";

const routes: Routes = [
  {path: "home", component: HomeuserComponent},
  {path: "", component: HomeuserComponent},
  {
    path: "user", component: AccountuserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    /**
     * Nhập địa chỉ
     */
    path: "address", component: AddressuserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },  {
    /**
     * Nhập địa chỉ
     */
    path: "checkout", component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    /**
     * Nhập địa chỉ
     */
    path: "oder", component: OrderuserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    /**
     * Nhập địa chỉ
     */
    path: "history", component: HistoryOrderUserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    path: "menu", component: MenuuserComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    path: "shoping", component: ShopingcartComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    path: "class", component: ClassComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    path: "detailfood/:id", component: DetailfooduserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    path: "changePass", component: ChangepassComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
