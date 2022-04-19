import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SinupRoutingModule } from './sinup-routing.module';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  imports: [
    CommonModule,
    SinupRoutingModule
  ]
})
export class SinupModule { }
