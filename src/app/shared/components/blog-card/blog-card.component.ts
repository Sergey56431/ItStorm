import {Component, Input, OnInit} from '@angular/core';
import {BestArticlesType} from "../../../types/best-articles.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {

  @Input()article!: BestArticlesType
  serverStaticPath = environment.serverStaticPath;

  constructor() { }

  ngOnInit(): void {
  }

}
