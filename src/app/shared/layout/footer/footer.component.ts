import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {OrderPopupComponent} from "../../components/order-popup/order-popup.component";
import {RequestService} from "../../services/request.service";

@Component({
  selector: 'footer-comp',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private requestService: RequestService) { }

  ngOnInit(): void {
  }

  callRequest() {
    this.dialog.open(OrderPopupComponent);
    this.requestService.order = false;
  }

}
