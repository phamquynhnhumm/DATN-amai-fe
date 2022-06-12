import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserRoutingModule} from './user-routing.module';
import {MemberComponent} from './content/member/member.component';
import {LayoutUserComponent} from './content/layout-user/layout-user.component';
import {FooterUserComponent} from './content/footer-user/footer-user.component';
import {NavUserComponent} from './content/nav-user/nav-user.component';
import {HomeuserComponent} from './content/homeuser/homeuser.component';
import {MenuuserComponent} from './content/menuuser/menuuser.component';
import {OrderuserComponent} from './content/orderuser/orderuser.component';
import {AccountuserComponent} from './content/accountuser/accountuser.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import {DetailfooduserComponent} from './content/detailfooduser/detailfooduser.component';
import {ShopingcartComponent} from './content/shopingcart/shopingcart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {GridModule} from "@coreui/angular";
import {ChangepassComponent} from './content/changepass/changepass.component';
import {OrderDetailUserComponent} from './content/order-detail-user/order-detail-user.component';
import {HistoryOrderUserComponent} from './content/history-order-user/history-order-user.component';
import {DeleteCartComponent} from './content/delete-cart/delete-cart.component';
import {CheckoutComponent} from './content/checkout/checkout.component';
import {FoodCategoryComponent} from './content/food-category/food-category.component';
import {PaypalComponent} from './content/paypal/paypal.component';
import {NgxPayPalModule} from "ngx-paypal";
import {MatDialogModule} from "@angular/material/dialog";
import {SinupUserComponent} from './content/sinup-user/sinup-user.component';
import {ForgotpasswordComponent} from './content/forgotpassword/forgotpassword.component';
import {CancelorderComponent} from './content/cancelorder/cancelorder.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { ChatbotComponent } from './content/chatbot/chatbot.component';

export function rootLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MemberComponent,
    LayoutUserComponent,
    FooterUserComponent,
    NavUserComponent,
    HomeuserComponent,
    MenuuserComponent,
    OrderuserComponent,
    AccountuserComponent,
    DetailfooduserComponent,
    ShopingcartComponent,
    ChangepassComponent,
    OrderDetailUserComponent,
    HistoryOrderUserComponent,
    DeleteCartComponent,
    CheckoutComponent,
    FoodCategoryComponent,
    PaypalComponent,
    SinupUserComponent,
    ForgotpasswordComponent,
    CancelorderComponent,
    ChatbotComponent
  ],
    exports: [
        NavUserComponent,
        FooterUserComponent,
        HomeuserComponent,
        SinupUserComponent,
        ForgotpasswordComponent,
        ChatbotComponent
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    GridModule,
    FormsModule,
    NgxPayPalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: rootLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatDialogModule
  ]
})
export class UserModule {
}
