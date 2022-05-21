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
        FoodyouComponent
    ],
  exports: [
    NavUserComponent,
    FooterUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    MatIconModule
  ]
})
export class UserModule { }
