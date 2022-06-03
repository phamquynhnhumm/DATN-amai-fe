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

  shop !: Shop;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.shopService.findAllShop().subscribe(
      data => {
        for (let sp of data) {
          this.shop = data[0];
          console.log(this.shop)
        }
      }
    )
  }

  formShop = new FormGroup(
    {
      address: new FormControl(this.shop.address, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      nameShop: new FormControl(this.shop.nameShop, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      phone: new FormControl(this.shop.phone, [Validators.required, Validators.min(0)]),
      slogen: new FormControl(this.shop.slogen, [Validators.required, Validators.min(0)]),
      nameTransfer: new FormControl(this.shop.nameTransfer, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      bankName: new FormControl(this.shop.bankName, Validators.required),
      number: new FormControl(this.shop.number, Validators.required),
      facebook: new FormControl(this.shop.facebook, Validators.required),
      youtube: new FormControl(this.shop.youtube, Validators.required),
      content: new FormControl(this.shop.content, Validators.required),
      instagram: new FormControl(this.shop.instagram, Validators.required),
      logo: new FormControl(this.shop.logo, Validators.required),
      email: new FormControl(this.shop.email, Validators.required),
    }
  )

  onSubmit() {

  }
}
