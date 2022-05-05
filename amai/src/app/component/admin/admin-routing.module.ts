import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutsComponent} from "./layouts/layouts.component";
import {ListProductComponent} from "./product/list-product/list-product.component";
import {CreateProductComponent} from "./product/create-product/create-product.component";

const routes: Routes = [
  {path: "", component: LayoutsComponent},
  {path: "listsp", component: ListProductComponent},
  {path: "createsp", component: CreateProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
