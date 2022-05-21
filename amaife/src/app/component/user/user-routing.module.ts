import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeuserComponent} from "./content/homeuser/homeuser.component";
import {MenuuserComponent} from "./content/menuuser/menuuser.component";
import {DetailfooduserComponent} from "./content/detailfooduser/detailfooduser.component";
import {ShopingcartComponent} from "./content/shopingcart/shopingcart.component";

const routes: Routes = [
  {path:"home",component:HomeuserComponent},
  {path:"menu",component:MenuuserComponent},
  {path:"shoping",component:ShopingcartComponent},
  {path:"detailfood/:id",component:DetailfooduserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
