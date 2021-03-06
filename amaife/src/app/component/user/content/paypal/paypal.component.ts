import {Component, Input, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Oder} from "../../../../model/order/Oder";
import {Food} from "../../../../model/food/Food";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {getStorage, ref, uploadString} from "@angular/fire/storage";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  @Input() formOrder!: FormGroup;
  orderQrCode !: Oder;
  @Input() oder!: Oder;
  price1: number = 0.3;
  test!: boolean;
  cartList!: Array<Cart>
  p: number | any;
  OderQR!: Oder;
  eStatusCart = EStatusCart;
  quantity!: number;
  totalCart !: number;
  totalQuantityCart !: number;
  cartUpdate !: Cart;
  cart !: Cart;
  newOder!: Oder;
  paypal !: string;
  apppayapl: boolean = false;

  constructor(private router: Router,
              private orderService: OrderService,
              private snackBar: MatSnackBar,
              private route: Router,
              public cartService: OrderService
  ) {
  }

  ngOnInit(): void {
    console.log(this.formOrder);
    this.initConfig();
  }

  formOrderDEtail = new FormGroup(
    {
      isDeleted: new FormControl(''),
      orders: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      food: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )
  listOderDetail: OrderDetail[] = [];

  private initConfig(): Object {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest><unknown>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: this.price1,
            },
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onClientAuthorization: (data) => {
        this.formOrder.value.qrcode = "null";
        this.formOrder.value.status = "UNCONFIRMED";
        this.formOrder.value.money = this.totalCart;
        this.formOrder.value.quantity = this.totalQuantityCart;
        if (this.formOrder.valid) {
          //Ti??p t???c th???c hi???n th??m m???i Order
          this.cartService.createOderUser(this.formOrder.value).subscribe(
            (data) => {
              this.orderQrCode = data;
              this.newOder = data;
              this.formOrderDEtail.value.orders = this.newOder;
              this.formOrderDEtail.value.isDeleted = false;
              for (let i = 0; i < this.cartList.length; i++) {
                //Ch???y v??ng for ????5
                //khi ???? ?????t h??ng th??nh c??ng th?? th???c hi???n x??a m??n kh???i gio h??ng
                this.cartService.cancelByIdCart(this.cartList[i].id).subscribe();
                let newOderDetail: { quantity: any; isDeleted: any; orders: any; food: Food } = {
                  quantity: this.cartList[i].quantity,
                  food: this.cartList[i].food,
                  orders: this.formOrderDEtail.value.orders,
                  isDeleted: this.formOrderDEtail.value.isDeleted,
                };
                this.listOderDetail.push(<OrderDetail>newOderDetail);
              }
              this.cartService.createOderDetailUser(this.listOderDetail).subscribe(
                (data) => {
                  this.OderQR = this.orderQrCode;
                  this.cartService.createQRCode(this.OderQR).subscribe(
                    (dataQRcode) => {
                      const storage = getStorage();
                      const message4 = dataQRcode.qrcode;
                      const storageRef = ref(storage, 'some-child');
                      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                        dataQRcode.qrcode = "https://firebasestorage.googleapis.com/v0/b/amai-d208b.appspot.com/o/" + snapshot.metadata.fullPath + "?alt=media&token=38860683-4d62-4df1-99e0-452de2997840";
                        this.cartService.updateQrcode(dataQRcode).subscribe(
                          (data) => {
                            this.route.navigateByUrl("/home").then(() =>
                              this.snackBar.open("Vui l??ng ki???m tra mail v??? th??ng tin ????n h??ng ???? ?????t!")._dismissAfter(3000))
                          }, error => {
                            this.snackBar.open("?????t m??n th???t b???i!", "OK", {
                              duration: 3000,
                              panelClass: ['mat-toolbar', 'mat-warn']
                            })
                          }
                        );
                      });
                    }
                    , error => {
                      this.snackBar.open("C???p nh???t m?? QR th???t b???i!", "OK", {
                        duration: 3000,
                        panelClass: ['mat-toolbar', 'mat-warn']
                      })
                    })
                })
            }
          )
        } else {
          this.snackBar.open("?????t m??n th???t b???i! Vui l??ng nh???p th??ng tin", "OK", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          })
        }
      },
      onCancel: (data, actions) => {
        alert("Giao d???ch c???a qu?? kh??ch kh??ng ho??n th??nh");
      },
      onError: err => {
        alert("Paypal ????ng g???p tr???c tr???c mong b???n h??y th??? l???i sau!")
      },
      onClick: (data, actions) => {
      },
    };
    return this.payPalConfig;
  };

  checkout() {
    this.route.navigateByUrl("/shoping").then();
  }
}
