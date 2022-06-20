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
          //Tiép tục thực hiện thêm mới Order
          this.cartService.createOderUser(this.formOrder.value).subscribe(
            (data) => {
              this.orderQrCode = data;
              this.newOder = data;
              this.formOrderDEtail.value.orders = this.newOder;
              this.formOrderDEtail.value.isDeleted = false;
              for (let i = 0; i < this.cartList.length; i++) {
                //Chạy vòng for đê5
                //khi đã đặt hàng thành công thì thực hiện xóa món khỏi gio hàng
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
                              this.snackBar.open("Vui lòng kiểm tra mail về thông tin đơn hàng đã đặt!")._dismissAfter(3000))
                          }, error => {
                            this.snackBar.open("Đặt món thất bại!", "OK", {
                              duration: 3000,
                              panelClass: ['mat-toolbar', 'mat-warn']
                            })
                          }
                        );
                      });
                    }
                    , error => {
                      this.snackBar.open("Cập nhật mã QR thất bại!", "OK", {
                        duration: 3000,
                        panelClass: ['mat-toolbar', 'mat-warn']
                      })
                    })
                })
            }
          )
        } else {
          this.snackBar.open("Đặt món thất bại! Vui lòng nhập thông tin", "OK", {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          })
        }
      },
      onCancel: (data, actions) => {
        alert("Giao dịch của quý khách không hoàn thành");
      },
      onError: err => {
        alert("Paypal đăng gặp trục trặc mong bản hãy thử lại sau!")
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
