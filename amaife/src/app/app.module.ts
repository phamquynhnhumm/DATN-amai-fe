import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AlertModule, FormModule, GridModule, SidebarModule} from "@coreui/angular";
import {ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {MatNativeDateModule} from "@angular/material/core";
import {HttpClientModule} from "@angular/common/http";
import {AdminModule} from "./component/admin/admin.module";
import {UserModule} from "./component/user/user.module";
import {DataTablesModule} from "angular-datatables";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterModule} from "@angular/router";
import {NgxPayPalModule} from "ngx-paypal";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {ZXingScannerModule} from "@zxing/ngx-scanner";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    AlertModule,
    FormModule,
    IconModule,
    AdminModule,
    UserModule,
    GridModule,
    SidebarModule,
    DataTablesModule,
    RouterModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxPaginationModule,
    NgxPayPalModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ZXingScannerModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
