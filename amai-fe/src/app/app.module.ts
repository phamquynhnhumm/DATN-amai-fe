import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SinupModule} from "./component/sinup/sinup.module";
import {LoginModule} from "./component/login/login.module";
import {VerificationModule} from "./component/verification/verification.module";
import { FooterComponent } from './display/footer/footer.component';
import { NavbarComponent } from './display/navbar/navbar.component';
import { HomeComponent } from './display/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SinupModule,
    VerificationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
