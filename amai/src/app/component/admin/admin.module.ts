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
import { ListfoodcategoryComponent } from './food/foodcategory/listfoodcategory/listfoodcategory.component';
import { EditfoodcategoryComponent } from './food/foodcategory/editfoodcategory/editfoodcategory.component';
import { CreatefoodcategoryComponent } from './food/foodcategory/createfoodcategory/createfoodcategory.component';
import { DeletefoodcategoryComponent } from './food/foodcategory/deletefoodcategory/deletefoodcategory.component';
import { DetailfoodcategoryComponent } from './food/foodcategory/detailfoodcategory/detailfoodcategory.component';
import {FormModule} from "@coreui/angular";

@NgModule({
  declarations: [
    LayoutsComponent,
    NavbarsComponent,
    FootersComponent,
    LoginsComponent,
    MenusComponent,
    ListProductComponent,
    CreateProductComponent,
    DetailProductComponent,
    ListfoodcategoryComponent,
    EditfoodcategoryComponent,
    CreatefoodcategoryComponent,
    DeletefoodcategoryComponent,
    DetailfoodcategoryComponent
  ],
  exports: [
    LayoutsComponent,
    MenusComponent,
    NavbarsComponent,
    FootersComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormModule
    ]
})
export class AdminModule { }
