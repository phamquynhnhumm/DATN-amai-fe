import {Component, OnInit} from '@angular/core';
import {Shop} from "../../../../../model/shop/Shop";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopService} from "../../../../../service/shop.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-shop',
  templateUrl: './update-shop.component.html',
  styleUrls: ['./update-shop.component.scss']
})
export class UpdateShopComponent implements OnInit {

  shop !: Shop;
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
        for (let sp of data) {
          this.shop = data[0];
          console.log(this.shop);
          this.formShop = new FormGroup(
            {
              address: new FormControl(this.shop.address, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
              nameShop: new FormControl(this.shop.nameShop, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
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
        }
      }
    )
  }

  onSubmit() {
  }
}

