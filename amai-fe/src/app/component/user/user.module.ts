import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { VerificationComponent } from './verification/verification.component';
import { AddressComponent } from './address/address.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { CartComponent } from './cart/cart.component';
import { SinupUserComponent } from './sinup-user/sinup-user.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    VerificationComponent,
    AddressComponent,
    PersonalInformationComponent,
    CartComponent,
    SinupUserComponent,
    MenuComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
