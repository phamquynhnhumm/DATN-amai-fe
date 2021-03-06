import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeuserComponent} from "./content/homeuser/homeuser.component";
import {MenuuserComponent} from "./content/menuuser/menuuser.component";
import {DetailfooduserComponent} from "./content/detailfooduser/detailfooduser.component";
import {ShopingcartComponent} from "./content/shopingcart/shopingcart.component";
import {AuthGuard} from "../../guard/auth.guard";
import {AccountuserComponent} from "./content/accountuser/accountuser.component";
import {ChangepassComponent} from "./content/changepass/changepass.component";
import {OrderuserComponent} from "./content/orderuser/orderuser.component";
import {HistoryOrderUserComponent} from "./content/history-order-user/history-order-user.component";
import {CheckoutComponent} from "./content/checkout/checkout.component";
import {FoodCategoryComponent} from "./content/food-category/food-category.component";
import {PaypalComponent} from "./content/paypal/paypal.component";
import {SinupUserComponent} from "./content/sinup-user/sinup-user.component";
import {ForgotpasswordComponent} from "./content/forgotpassword/forgotpassword.component";
import {ChatbotComponent} from "./content/chatbot/chatbot.component";

const routes: Routes = [
  {path: "home", component: HomeuserComponent},
  {path: "sinup", component: SinupUserComponent},
  {path: "", component: HomeuserComponent},
  {path: "forgot", component: ForgotpasswordComponent},
  {
    path: "chat", component: ChatbotComponent, canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
    path: "user", component: AccountuserComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {
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
    path: "menu", component: MenuuserComponent
  },
  {
    path: "shoping", component: ShopingcartComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  }, {
    path: "paypal", component: PaypalComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_CUSTOMER']}
  },
  {path: "detailfood/:id", component: DetailfooduserComponent},
  {path: "category/:id", component: FoodCategoryComponent},
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
