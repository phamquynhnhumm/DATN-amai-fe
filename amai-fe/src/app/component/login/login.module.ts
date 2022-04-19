import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginUserComponent } from './login-user/login-user.component';


@NgModule({
  declarations: [
    LoginUserComponent
  ],
  exports: [
    LoginUserComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
