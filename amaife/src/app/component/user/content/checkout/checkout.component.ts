import {Component, OnInit} from '@angular/core';
import {Cart} from "../../../../model/order/Cart";
import {EStatusCart} from "../../../../model/order/EStatusCart";
import {AuthService} from "../../../../service/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Oder} from "../../../../model/order/Oder";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {Food} from "../../../../model/food/Food";
import {Router} from "@angular/router";
import {getStorage, ref, uploadString} from "firebase/storage";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartList!: Array<Cart>
  p: number | any;
  eStatusCart = EStatusCart;
  quantity!: number;
  totalCart !: number;
  totalQuantityCart !: number;
  cartUpdate !: Cart;
  cart !: Cart;
  oder !: Oder;
  newOder!: Oder;
  OderQR!: Oder;
  paypal !: string;
  apppayapl: boolean = false;
  QR !: string;
  url: string = "";
  selectedFile: File | any;
  urlqrcode !: string;
  orderQrCode !: Oder;

  constructor(public auth: AuthService,
              private dialog: MatDialog,
              private route: Router,
              private snackBar: MatSnackBar,
              public cartService: OrderService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.cartService.findCartUser(this.auth.getUsername()).subscribe(
      dataCart => {
        this.p = 1;
        this.cartList = dataCart;
      }
    );


    // @ts-ignore
    this.cartService.totalMoneyCart(this.auth.getUsername()).subscribe(
      data => {
        this.totalCart = data;
      }
    );
    // @ts-ignore
    this.cartService.totalQuantityCart(this.auth.getUsername()).subscribe(
      data => {
        this.totalQuantityCart = data;
      }
    )
  }

  formOrder = new FormGroup(
    {
      address: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8})\\b)")]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      qrcode: new FormControl(''),
      status: new FormControl(''),
      money: new FormControl(''),
      quantity: new FormControl(''),
      payments: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )

  formOrderDEtail = new FormGroup(
    {
      isDeleted: new FormControl(''),
      orders: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      food: new FormControl('', [Validators.required, Validators.min(0)]),
    }
  )
  listOderDetail: OrderDetail[] = [];

  onSubmit() {
   if (this.formOrder.value.payments == 'CASH') {
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
    } else if (this.formOrder.value.payments == 'NO') {
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
                          this.snackBar.open("Vui lòng kiểm tra mail về thông tin đơn hàng đã đặt!")._dismissAfter(3000);
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
        this.route.navigateByUrl("/home").then(() =>
          this.snackBar.open(" Đặt món thành công!. Quý khách đến của hàng an toàn nhé! Chúng tôi sẽ chuẩn bị món ngon cho bạn")._dismissAfter(3000));
      } else {
        this.snackBar.open("Đặt món thất bại ! Vui lòng nhập thông tin", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
      }
    } else if (this.formOrder.value.payments == 'TRANSFER') {
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
                          this.snackBar.open("Vui lòng kiểm tra mail về thông tin đơn hàng đã đặt!")._dismissAfter(3000);
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
        this.route.navigateByUrl("/home").then(() =>
          this.snackBar.open(" Đặt món thành công!. Quý khách đến của hàng an toàn nhé! Chúng tôi sẽ chuẩn bị món ngon cho bạn")._dismissAfter(3000));
      } else {
        this.snackBar.open("Đặt món thất bại ! Vui lòng nhập thông tin", "OK", {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn']
        })
      }
    } else {
      this
        .snackBar
        .open(
          "Vui lòng chọn phương thức thanh toán"
          ,
          "OK"
          , {
            duration: 3000
            ,
            panelClass: ['mat-toolbar', 'mat-warn']
          }
        )
    }
  }
}
