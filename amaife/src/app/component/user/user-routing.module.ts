import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeuserComponent} from "./content/homeuser/homeuser.component";
import {MenuuserComponent} from "./content/menuuser/menuuser.component";

const routes: Routes = [
  {path:"home",component:HomeuserComponent},
  {path:"menu",component:MenuuserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
