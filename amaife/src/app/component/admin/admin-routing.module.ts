import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ListfoodcategoryComponent} from "./content/foodcategory/listfoodcategory/listfoodcategory.component";
import {EditfoodcategoryComponent} from "./content/foodcategory/editfoodcategory/editfoodcategory.component";
import {CreatefoodcategoryComponent} from "./content/foodcategory/createfoodcategory/createfoodcategory.component";
import {ListfoodComponent} from "./content/food/listfood/listfood.component";

const routes: Routes = [
  {path: "foodcategory", component: ListfoodcategoryComponent},
  {path: "createfoodcategory", component: CreatefoodcategoryComponent},
  {path: "food", component: ListfoodComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
