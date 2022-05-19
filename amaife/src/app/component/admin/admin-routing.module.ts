import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ListfoodcategoryComponent} from "./content/foodcategory/listfoodcategory/listfoodcategory.component";
import {EditfoodcategoryComponent} from "./content/foodcategory/editfoodcategory/editfoodcategory.component";
import {CreatefoodcategoryComponent} from "./content/foodcategory/createfoodcategory/createfoodcategory.component";
import {ListfoodComponent} from "./content/food/listfood/listfood.component";
import {DeletefoodandcategoryComponent} from "./content/bin/deletefoodandcategory/deletefoodandcategory.component";
import {CreatefoodComponent} from "./content/food/createfood/createfood.component";
import {EditfoodComponent} from "./content/food/editfood/editfood.component";
import {ListsupplierComponent} from "./content/supplier/listsupplier/listsupplier.component";
import {CreatesupplierComponent} from "./content/supplier/createsupplier/createsupplier.component";
import {ListmaterialComponent} from "./content/material/listmaterial/listmaterial.component";
import {CreartematerialComponent} from "./content/material/creartematerial/creartematerial.component";
import {ListfooddetailComponent} from "./content/fooddetail/listfooddetail/listfooddetail.component";
import {CreatefooddetailComponent} from "./content/fooddetail/createfooddetail/createfooddetail.component";
import {ListorderComponent} from "./content/order/listorder/listorder.component";
import {LoginadminComponent} from "./content/loginadmin/loginadmin.component";
import {AuthGuard} from "../../guard/auth.guard";
import {FormCheckComponent} from "@coreui/angular";
import {ForbiddenComponent} from "./content/forbidden/forbidden.component";
import {ListComponent} from "./content/account/list/list.component";
import {NewpasswordComponent} from "./content/account/newpassword/newpassword.component";
import {EditaccountComponent} from "./content/account/editaccount/editaccount.component";

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
  },
  {path: "createfood", component: CreatefoodComponent},
  {
    path: "food", component: ListfoodComponent,
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
  {path: "account", component: ListComponent},
  {path: "newpassword", component: NewpasswordComponent},
  {path: "editaccount", component: EditaccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
