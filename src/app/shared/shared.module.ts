import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {RouterModule} from "@angular/router";
import { ProductComponent } from './components/product/product.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { RecomendedArticlesComponent } from './components/recomended-articles/recomended-articles.component';
import {DescriptionMaxLengthPipe} from './pipes/description-max-lenth.pipe';
import {MatMenuModule} from "@angular/material/menu";
import { OrderPopupComponent } from './components/order-popup/order-popup.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { TitleMaxLengthPipe } from './pipes/title-max-length.pipe';
import { LoaderComponent } from './components/loader/loader.component';




@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ProductComponent,
        BlogCardComponent,
        RecomendedArticlesComponent,
        DescriptionMaxLengthPipe,
        OrderPopupComponent,
        TitleMaxLengthPipe,
        LoaderComponent,

    ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    BlogCardComponent,
    RecomendedArticlesComponent,
    OrderPopupComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
