import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductType} from "../../../types/product.type";
import {MatDialog} from "@angular/material/dialog";
import {OrderPopupComponent} from "../order-popup/order-popup.component";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'product-component',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input()product!: ProductType;

  constructor(private dialog: MatDialog,
              private requestService: RequestService) { }

  ngOnInit(): void {
  }

  request(){
    this.dialog.open(OrderPopupComponent);
    this.requestService.order = true;
  }

}
