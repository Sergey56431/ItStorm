import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {SharedModule} from "./shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./core/auth/auth.interceptor";
import { MainComponent } from './views/main/main.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import {ReactiveFormsModule} from "@angular/forms";
import { MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    CarouselModule,
    MatDialogModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 4000}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
