import {Component, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderService} from "../../../../service/order.service";

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  // @Input() price!: number;
  // @Input() booking!: Booking;
  price1: number = 0.3;
  test!: boolean;

  constructor(private router: Router,
              private orderService: OrderService,
              private snackBar: MatSnackBar,) {
  }

  ngOnInit(): void {
    this.initConfig();
  }

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
        // this.bookingService.updateStatus(this.booking.id).subscribe(
        //   data => {
        //     console.log(data),
        this.snackBar.open("Giao dịch của quý khách đã được hoàn thành", "Oke", {
            //         duration: 3000,
            //         panelClass: ['mat-toolbar', 'mat-toolbar']
            //       })
            //     this.router.navigateByUrl("/");
          }
        )
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
}

