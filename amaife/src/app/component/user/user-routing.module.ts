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

const routes: Routes = [
  {path: "home", component: HomeuserComponent},
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
  },
  {path: "menu", component: MenuuserComponent},
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
  {path: "detailfood/:id", component: DetailfooduserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
