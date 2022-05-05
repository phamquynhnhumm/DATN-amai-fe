import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddressComponent } from './address/address.component';
import { CartComponent } from './cart/cart.component';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SinupComponent } from './sinup/sinup.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    AddressComponent,
    CartComponent,
    ChatComponent,
    HomeComponent,
    LoginComponent,
    SinupComponent,
    MenuComponent,
    OrderComponent,
    InfoComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
