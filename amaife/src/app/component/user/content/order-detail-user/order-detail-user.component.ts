import {Component, Inject, OnInit} from '@angular/core';
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-detail-user',
  templateUrl: './order-detail-user.component.html',
  styleUrls: ['./order-detail-user.component.scss']
})
export class OrderDetailUserComponent implements OnInit {

  oder!: Oder;
  eStatusOrder = EStatusOrder;

  constructor(private dialogRef: MatDialogRef<OrderDetailUserComponent>,
              private oderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.oder = this.data;
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi đơn hàng thành công", "OK", {
      duration: 4000
    })
  }
}
