import {Component, Input, OnInit} from '@angular/core';
import {BestArticlesType} from "../../../types/best-articles.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'recomended-articles',
  templateUrl: './recomended-articles.component.html',
  styleUrls: ['./recomended-articles.component.scss']
})
export class RecomendedArticlesComponent implements OnInit {

  @Input()top!: BestArticlesType;
  serverStaticPath = environment.serverStaticPath;
  constructor() { }

  ngOnInit(): void {
  }

}
