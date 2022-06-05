import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../../../service/shop.service";
import {FoodService} from "../../../../../service/food.service";
import {SupplierService} from "../../../../../service/supplier.service";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Shop} from "../../../../../model/shop/Shop";

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit {

  shop !: Array<Shop>;
  formShop !: FormGroup;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.shopService.findAllShop().subscribe(
      data => {
        this.shop = data;
      }
    )
  }

  onSubmit() {
  }
}
