import {Component, OnInit} from '@angular/core';
import {ShopService} from "../../../../../service/shop.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {Shop} from "../../../../../model/shop/Shop";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit {

  shop !: Array<Shop>;
  formShop !: FormGroup;
  shopboolen: boolean = true;
  url: string = "";
  selectedFile: File | any;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private snackBar: MatSnackBar,
              private angularFireStorage: AngularFireStorage,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.shopService.findAllShop().subscribe(
      data => {
        this.shop = data;
      }
    )
  }

  updateShop(shops: Shop) {
    this.shopboolen = false;
    this.shopService.findBy(shops.id).subscribe(
      (data) => {
        this.formShop = new FormGroup(
          {
            address: new FormControl(data.address, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
            nameShop: new FormControl(data.nameShop, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]),
            phone: new FormControl(data.phone, [Validators.required, Validators.min(0)]),
            slogen: new FormControl(data.slogen, [Validators.required, Validators.min(0)]),
            nameTransfer: new FormControl(data.nameTransfer, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
            bankName: new FormControl(data.bankName, Validators.required),
            id: new FormControl(data.id, Validators.required),
            number: new FormControl(data.number, Validators.required),
            facebook: new FormControl(data.facebook, Validators.required),
            youtube: new FormControl(data.youtube, Validators.required),
            content: new FormControl(data.content, Validators.required),
            instagram: new FormControl(data.instagram, Validators.required),
            logo: new FormControl(data.logo, Validators.required),
            email: new FormControl(data.email, Validators.required),
          }
        )
      })
  }

  cencal() {
    this.shopboolen = true;
  }

  onSubmit() {
    if (this.formShop.valid) {
      this.shopService.updateSupplier(this.formShop.value).subscribe(
        (data) => {
          this.snackBar.open("Cập nhật thông tin cửa hàng thành công !")._dismissAfter(3000);

        }
      )
    } else {
      this.snackBar.open("Cập nhật thông tin cửa hàng thấy bại !")._dismissAfter(3000);
    }
    this.url = "";
  }

  selectFile(event: any) {
    const path = new Date().toString();
    this.selectedFile = event.target.files[0];
    this.angularFireStorage.upload(path, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(
          (data) => {
            this.url = data;
            this.formShop.value.logo = this.url;
            if (this.formShop.value.logo != '') {
              this.shopService.updateSupplier(this.formShop.value).subscribe(
                (date) => {
                  this.snackBar.open("Cập nhật logo cửa hàng thành công", "OK", {
                    duration: 4000,
                    panelClass: ['mat-toolbar', 'mat-primary']

                  })
                }
              );
              this.url = "";
            } else {
              this.snackBar.open("Cập nhật logo cửa hàng thất bại", "OK", {
                duration: 4000,
                panelClass: ['mat-toolbar', 'mat-primary']
              });
            }
          }, error => {
            this.snackBar.open("Cập nhật logo cửa hàng thất bại", "OK", {
              duration: 4000,
              panelClass: ['mat-toolbar', 'mat-primary']

            });
          }
        )
      })
    ).subscribe();
  }

}
