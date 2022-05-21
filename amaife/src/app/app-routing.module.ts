import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeuserComponent} from "./component/user/content/homeuser/homeuser.component";

const routes: Routes = [
  {path:"",component:HomeuserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
