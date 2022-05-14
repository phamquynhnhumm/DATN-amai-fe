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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
