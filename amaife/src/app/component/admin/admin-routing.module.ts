import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ListfoodcategoryComponent} from "./content/foodcategory/listfoodcategory/listfoodcategory.component";
import {EditfoodcategoryComponent} from "./content/foodcategory/editfoodcategory/editfoodcategory.component";
import {CreatefoodcategoryComponent} from "./content/foodcategory/createfoodcategory/createfoodcategory.component";

const routes: Routes = [
  {path: "admin", component: LayoutComponent,
  children:[
    {path: "editfoodcategory", component: EditfoodcategoryComponent},
  ]},
  {path: "foodcategory", component: ListfoodcategoryComponent},
  {path: "createfoodcategory", component: CreatefoodcategoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
