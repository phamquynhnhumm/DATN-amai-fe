import {Component, Inject, OnInit} from '@angular/core';
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {OrderDetail} from "../../../../model/order/OrderDetail";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-detail-user',
  templateUrl: './order-detail-user.component.html',
  styleUrls: ['./order-detail-user.component.scss']
})
export class OrderDetailUserComponent implements OnInit {

  oder!: Oder;
  eStatusOrder = EStatusOrder;
  orderDetailList !: Array<OrderDetail>
  href !: String;

  constructor(private dialogRef: MatDialogRef<OrderDetailUserComponent>,
              private oderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.href = window.location.href;
    this.oder = this.data;
    this.oderService.findOderDetailUser(this.data.id).subscribe(
      dataOrrderDetail => {
        this.orderDetailList = dataOrrderDetail;
      }
    )
  }

  cancel() {
    this.dialogRef.close();
  }

  detailFood(oderDetail: OrderDetail
  ) {
    this.dialogRef.close();
    this.router.navigate(['/detailfood/' + oderDetail.food.id]);
  }
}
