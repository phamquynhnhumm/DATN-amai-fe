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
  {path: "food", component: ListfoodComponent},
  {path: "createfood", component: CreatefoodComponent},

  /**
   * URL nhà cung cấp
   */
  {path: "supplier", component: ListsupplierComponent},
  {path: "createsupplier", component: CreatesupplierComponent},

  /**
   * URL nguyên liệu
   */
  {path: "material", component: ListmaterialComponent},
  {path: "creatematerial", component: CreartematerialComponent},

  /**
   * URL nguyên liệu sử dùng món
   */
  {path: "fooddetail", component: ListfooddetailComponent},
  {path: "createfooddetail", component: CreatefooddetailComponent},
  /**
   * URL đơn hàng
   */
  {path: "order", component: ListorderComponent},
  /**
   * lOGIN
   */
  {path: "loginadmin", component: LoginadminComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
