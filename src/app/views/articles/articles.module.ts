import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { DetailComponent } from './detail/detail.component';
import {SharedModule} from "../../shared/shared.module";
import { BlogComponent } from './blog/blog.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DetailComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ArticlesRoutingModule,
    FormsModule
  ]
})
export class ArticlesModule { }
