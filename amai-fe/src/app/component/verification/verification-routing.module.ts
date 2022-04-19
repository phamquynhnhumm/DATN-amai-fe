import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "../sinup/user/user.component";
import {VerificationComponent} from "./verification/verification.component";

const routes: Routes = [
  {path: "varification", component: VerificationComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
