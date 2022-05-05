import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutsComponent } from './layouts/layouts.component';
import { NavbarsComponent } from './navbars/navbars.component';
import { FootersComponent } from './footers/footers.component';
import { LoginsComponent } from './logins/logins.component';
import { MenusComponent } from './menus/menus.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { DetailProductComponent } from './product/detail-product/detail-product.component';

@NgModule({
  declarations: [
    LayoutsComponent,
    NavbarsComponent,
    FootersComponent,
    LoginsComponent,
    MenusComponent,
    ListProductComponent,
    CreateProductComponent,
    DetailProductComponent
  ],
  exports: [
    LayoutsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
