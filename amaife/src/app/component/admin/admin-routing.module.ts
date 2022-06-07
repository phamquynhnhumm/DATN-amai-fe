import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListfoodcategoryComponent} from "./content/foodcategory/listfoodcategory/listfoodcategory.component";
import {CreatefoodcategoryComponent} from "./content/foodcategory/createfoodcategory/createfoodcategory.component";
import {ListfoodComponent} from "./content/food/listfood/listfood.component";
import {DeletefoodandcategoryComponent} from "./content/bin/deletefoodandcategory/deletefoodandcategory.component";
import {CreatefoodComponent} from "./content/food/createfood/createfood.component";
import {ListsupplierComponent} from "./content/supplier/listsupplier/listsupplier.component";
import {CreatesupplierComponent} from "./content/supplier/createsupplier/createsupplier.component";
import {ListmaterialComponent} from "./content/material/listmaterial/listmaterial.component";
import {CreartematerialComponent} from "./content/material/creartematerial/creartematerial.component";
import {ListfooddetailComponent} from "./content/fooddetail/listfooddetail/listfooddetail.component";
import {CreatefooddetailComponent} from "./content/fooddetail/createfooddetail/createfooddetail.component";
import {ListorderComponent} from "./content/order/listorder/listorder.component";
import {LoginadminComponent} from "./content/loginadmin/loginadmin.component";
import {AuthGuard} from "../../guard/auth.guard";
import {ForbiddenComponent} from "./content/forbidden/forbidden.component";
import {ListComponent} from "./content/account/list/list.component";
import {NewpasswordComponent} from "./content/account/newpassword/newpassword.component";
import {HomeadminComponent} from "./content/homeadmin/homeadmin.component";
import {ListcustomerComponent} from "./content/customer/listcustomer/listcustomer.component";
import {ListmanagenmentComponent} from "./content/managenment/listmanagenment/listmanagenment.component";
import {ListClassComponent} from "./content/class/list-class/list-class.component";
import {ListShopComponent} from "./content/shop/list-shop/list-shop.component";
import {SinupAdminComponent} from "./content/account/sinup-admin/sinup-admin.component";

const routes: Routes = [
  /**
   * URL danh mục món
   */
  {path: "foodcategory", component: ListfoodcategoryComponent},
  {path: "createfoodcategory", component: CreatefoodcategoryComponent},
  {path: "deletefoodandcategory", component: DeletefoodandcategoryComponent},

  /**
   * URL món
   */
  {
    path: "food",
    component: ListfoodComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  }, {
    path: "sinupadmin",
    component: SinupAdminComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMIN']}
  },
  {
    path: "customer",
    component: ListcustomerComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  {
    path: "shop",
    component: ListShopComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  }, {
    path: "management",
    component: ListmanagenmentComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  }, {
    path: "registration",
    component: ListClassComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  {path: "createfood", component: CreatefoodComponent},
  {
    path: "food", component: ListfoodComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  {
    path: "food", component: ListfoodComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  {
    path: "admin", component: HomeadminComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },

  /**
   * URL nhà cung cấp
   */
  {path: "supplier", component: ListsupplierComponent},
  {
    path: "createsupplier", component: CreatesupplierComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },

  /**
   * URL nguyên liệu
   */
  {path: "material", component: ListmaterialComponent},
  {
    path: "creatematerial", component: CreartematerialComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },

  /**
   * URL nguyên liệu sử dùng món
   */
  {path: "fooddetail", component: ListfooddetailComponent},
  {
    path: "createfooddetail", component: CreatefooddetailComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  /**
   * URL đơn hàng
   */
  {
    path: "order", component: ListorderComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  /**
   * lOGIN
   */
  {path: "login", component: LoginadminComponent},
  {path: "forbidden", component: ForbiddenComponent},
  {
    path: "account", component: ListComponent,
    canActivate: [AuthGuard],
    data: {role: ['ROLE_MANAGEMENT', 'ROLE_ADMIN']}
  },
  {path: "newpassword", component: NewpasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
