import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MemberComponent } from './content/member/member.component';
import { LayoutUserComponent } from './content/layout-user/layout-user.component';
import { FooterUserComponent } from './content/footer-user/footer-user.component';
import { NavUserComponent } from './content/nav-user/nav-user.component';
import { HomeuserComponent } from './content/homeuser/homeuser.component';
import { MenuuserComponent } from './content/menuuser/menuuser.component';
import { OrderuserComponent } from './content/orderuser/orderuser.component';
import { AccountuserComponent } from './content/accountuser/accountuser.component';
import { AddressuserComponent } from './content/addressuser/addressuser.component';
import { FoodyouComponent } from './content/foodyou/foodyou.component';
import {NgxPaginationModule} from "ngx-pagination";
import {MatIconModule} from "@angular/material/icon";
import { DetailfooduserComponent } from './content/detailfooduser/detailfooduser.component';
import { ShopingcartComponent } from './content/shopingcart/shopingcart.component';
import { ClassComponent } from './content/class/class.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {GridModule} from "@coreui/angular";
import { ChangepassComponent } from './content/changepass/changepass.component';
import { OrderDetailUserComponent } from './content/order-detail-user/order-detail-user.component';
import { HistoryOrderUserComponent } from './content/history-order-user/history-order-user.component';
import { DeleteCartComponent } from './content/delete-cart/delete-cart.component';
import { CheckoutComponent } from './content/checkout/checkout.component';


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
        AddressuserComponent,
        FoodyouComponent,
        DetailfooduserComponent,
        ShopingcartComponent,
        ClassComponent,
        ChangepassComponent,
        OrderDetailUserComponent,
        HistoryOrderUserComponent,
        DeleteCartComponent,
        CheckoutComponent
    ],
    exports: [
        NavUserComponent,
        FooterUserComponent,
        HomeuserComponent
    ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    GridModule,
    FormsModule
  ]
})
export class UserModule { }
