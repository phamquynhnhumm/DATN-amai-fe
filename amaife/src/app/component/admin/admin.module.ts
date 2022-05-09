import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { FooterComponent } from './footer/footer.component';
import {
  AvatarModule,
  BreadcrumbModule, CardModule,
  DropdownModule, FormModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule
} from "@coreui/angular";
import { HeaderadminComponent } from './headeradmin/headeradmin.component';
import { ListfoodcategoryComponent } from './content/foodcategory/listfoodcategory/listfoodcategory.component';
import { CreatefoodcategoryComponent } from './content/foodcategory/createfoodcategory/createfoodcategory.component';
import { DetailfoodcategoryComponent } from './content/foodcategory/detailfoodcategory/detailfoodcategory.component';
import { EditfoodcategoryComponent } from './content/foodcategory/editfoodcategory/editfoodcategory.component';
import {IconModule} from "@coreui/icons-angular";
import {FormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";


@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    HeaderadminComponent,
    ListfoodcategoryComponent,
    CreatefoodcategoryComponent,
    DetailfoodcategoryComponent,
    EditfoodcategoryComponent
  ],
  exports: [
    LayoutComponent,
    HeaderadminComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        GridModule,
        SidebarModule,
        NavModule,
        DropdownModule,
        AvatarModule,
        BreadcrumbModule,
        HeaderModule,
        IconModule,
        FormModule,
        CardModule,
        FormsModule,
        DataTablesModule
    ]
})
export class AdminModule { }
