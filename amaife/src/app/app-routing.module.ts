import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "./component/admin/layout/layout.component";
import {
  ListfoodcategoryComponent
} from "./component/admin/content/foodcategory/listfoodcategory/listfoodcategory.component";
import {
  EditfoodcategoryComponent
} from "./component/admin/content/foodcategory/editfoodcategory/editfoodcategory.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
