import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {LayoutComponent} from './layout/layout.component';
import {
  AvatarModule,
  BreadcrumbModule, CardModule,
  DropdownModule, FormModule,
  GridModule,
  HeaderModule,
  NavModule,
  SidebarModule
} from "@coreui/angular";
import {HeaderadminComponent} from './headeradmin/headeradmin.component';
import {ListfoodcategoryComponent} from './content/foodcategory/listfoodcategory/listfoodcategory.component';
import {CreatefoodcategoryComponent} from './content/foodcategory/createfoodcategory/createfoodcategory.component';
import {DetailfoodcategoryComponent} from './content/foodcategory/detailfoodcategory/detailfoodcategory.component';
import {EditfoodcategoryComponent} from './content/foodcategory/editfoodcategory/editfoodcategory.component';
import {IconModule} from "@coreui/icons-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataTablesModule} from "angular-datatables";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {DelatefoodcategoryComponent} from './content/foodcategory/delatefoodcategory/delatefoodcategory.component';
import {ListfoodComponent} from './content/food/listfood/listfood.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxPaginationModule} from "ngx-pagination";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DeletefoodandcategoryComponent } from './content/bin/deletefoodandcategory/deletefoodandcategory.component';
import { UndofoodandcategoryComponent } from './content/bin/undofoodandcategory/undofoodandcategory.component';
import { UndofoodComponent } from './content/bin/undofood/undofood.component';
import { CreatefoodComponent } from './content/food/createfood/createfood.component';
import { DetailfoodComponent } from './content/food/detailfood/detailfood.component';
import { DeletefoodComponent } from './content/food/deletefood/deletefood.component';
import { EditfoodComponent } from './content/food/editfood/editfood.component';
import {MatSelectModule} from "@angular/material/select";
import { ListsupplierComponent } from './content/supplier/listsupplier/listsupplier.component';
import { CreatesupplierComponent } from './content/supplier/createsupplier/createsupplier.component';
import { EditsupplierComponent } from './content/supplier/editsupplier/editsupplier.component';
import { DetailsupplierComponent } from './content/supplier/detailsupplier/detailsupplier.component';
import { DeletesupplierComponent } from './content/supplier/deletesupplier/deletesupplier.component';
import { UnsupplierComponent } from './content/bin/unsupplier/unsupplier.component';
import { UnmaterialComponent } from './content/bin/unmaterial/unmaterial.component';
import { UnoderComponent } from './content/bin/unoder/unoder.component';
import { UnoderdetailComponent } from './content/bin/unoderdetail/unoderdetail.component';
import { CreartematerialComponent } from './content/material/creartematerial/creartematerial.component';
import { ListmaterialComponent } from './content/material/listmaterial/listmaterial.component';
import { EditmaterialComponent } from './content/material/editmaterial/editmaterial.component';
import { DeletematerialComponent } from './content/material/deletematerial/deletematerial.component';
import { DetailmaterialComponent } from './content/material/detailmaterial/detailmaterial.component';
import { ListfooddetailComponent } from './content/fooddetail/listfooddetail/listfooddetail.component';
import { CreatefooddetailComponent } from './content/fooddetail/createfooddetail/createfooddetail.component';
import { EditfooddetailComponent } from './content/fooddetail/editfooddetail/editfooddetail.component';
import { DeletefooddetailComponent } from './content/fooddetail/deletefooddetail/deletefooddetail.component';
import { DetailfooddetailComponent } from './content/fooddetail/detailfooddetail/detailfooddetail.component';
import { ListorderComponent } from './content/order/listorder/listorder.component';
import { UpdateorderComponent } from './content/order/updateorder/updateorder.component';
import { DetailorderComponent } from './content/order/detailorder/detailorder.component';
import { DeleteorderComponent } from './content/order/deleteorder/deleteorder.component';
import { LoginadminComponent } from './content/loginadmin/loginadmin.component';
import {AuthGuard} from "../../guard/auth.guard";
import {LoginService} from "../../service/login.service";
import {AuthInterceptor} from "../../guard/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig} from "@abacritt/angularx-social-login";
import { ForbiddenComponent } from './content/forbidden/forbidden.component';
import { ListComponent } from './content/account/list/list.component';
import { NewpasswordComponent } from './content/account/newpassword/newpassword.component';
import { DeleteaccountComponent } from './content/account/deleteaccount/deleteaccount.component';
import { EditaccountComponent } from './content/account/editaccount/editaccount.component';
import { HomeadminComponent } from './content/homeadmin/homeadmin.component';
import { ConfirmOderComponent } from './content/order/confirm-oder/confirm-oder.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderadminComponent,
    ListfoodcategoryComponent,
    CreatefoodcategoryComponent,
    DetailfoodcategoryComponent,
    EditfoodcategoryComponent,
    DelatefoodcategoryComponent,
    ListfoodComponent,
    DeletefoodandcategoryComponent,
    UndofoodandcategoryComponent,
    UndofoodComponent,
    CreatefoodComponent,
    DetailfoodComponent,
    DeletefoodComponent,
    EditfoodComponent,
    ListsupplierComponent,
    CreatesupplierComponent,
    EditsupplierComponent,
    DetailsupplierComponent,
    DeletesupplierComponent,
    UnsupplierComponent,
    UnmaterialComponent,
    UnoderComponent,
    UnoderdetailComponent,
    CreartematerialComponent,
    ListmaterialComponent,
    EditmaterialComponent,
    DeletematerialComponent,
    DetailmaterialComponent,
    ListfooddetailComponent,
    CreatefooddetailComponent,
    EditfooddetailComponent,
    DeletefooddetailComponent,
    DetailfooddetailComponent,
    ListorderComponent,
    UpdateorderComponent,
    DetailorderComponent,
    DeleteorderComponent,
    LoginadminComponent,
    ForbiddenComponent,
    ListComponent,
    NewpasswordComponent,
    DeleteaccountComponent,
    EditaccountComponent,
    HomeadminComponent,
    ConfirmOderComponent
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
        DataTablesModule,
        MatButtonModule,
        MatFormFieldModule,
        MatDialogModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        MatSnackBarModule,
        MatSelectModule
    ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1081742702049-mvi68nuauktdq43q10420bgj4b97df5o.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1819058964959430')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoginService
  ]
})
export class AdminModule {
}
