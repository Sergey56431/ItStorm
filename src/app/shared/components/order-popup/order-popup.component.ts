import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {DefaultResponseType} from "../../../types/default-response.type";
import {RequestService} from "../../services/request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryType} from "../../../types/category.type";
import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.scss']
})
export class OrderPopupComponent implements OnInit {

  thanks: boolean = false;
  categories: CategoryType[] = [];
  prodItem: string = '';
  order: boolean = true;
  dialogRef: MatDialogRef<any> | null = null;

  popupForm = this.fb.group({
    category: ['',],
    name: ['', [Validators.required, Validators.pattern('')]],
    phone: ['', [Validators.required, Validators.pattern('')]]
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private requestService: RequestService,
              private _snackBar: MatSnackBar,
              private categoryService: CategoriesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.order = this.requestService.order;
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data;
        this.activatedRoute.queryParams.subscribe(params => {
          if (params) {
            let prodItem: CategoryType | undefined;
            prodItem = this.categories.find(item => item.url === params['url']);
            if (prodItem) {
              this.prodItem = prodItem.name;
              this.popupForm.value.category = this.prodItem
            }
          }
        });

      })
  }

  get category() {
    return this.popupForm.get('category');
  }

  get name() {
    return this.popupForm.get('name');
  }

  get phone() {
    return this.popupForm.get('phone');
  }

  closePopup() {
    this.dialog.closeAll();
    this.router.navigate(['/']);

  }

  createRequest() {
    this.dialogRef?.backdropClick()
      .subscribe(() => {
        this.router.navigate(['/']);
      });

    if (this.order) {
      if (this.popupForm.value.name && this.popupForm.value.phone && this.popupForm.value.category)
        this.requestService.sendRequest(this.popupForm.value.name, this.popupForm.value.phone, 'order',
          this.popupForm.value.category)
          .subscribe((data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              return;
            } else {
              this._snackBar.open(data.message);
              this.thanks = true;
            }
          })
    }

    if (!this.order) {
      if (this.popupForm.value.name && this.popupForm.value.phone)
        this.requestService.sendRequest(this.popupForm.value.name, this.popupForm.value.phone, 'consultation')
          .subscribe((data: DefaultResponseType) => {
            if (data.error) {
              this._snackBar.open(data.message);
              return;
            } else {
              this._snackBar.open(data.message);
              this.thanks = true;
            }
          })
    }
  }


}
