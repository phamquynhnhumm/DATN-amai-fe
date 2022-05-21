import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeuserComponent} from "./content/homeuser/homeuser.component";

const routes: Routes = [
  {path:"home",component:HomeuserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
