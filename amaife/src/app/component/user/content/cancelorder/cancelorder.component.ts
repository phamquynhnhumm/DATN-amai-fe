import {Component, Inject, OnInit} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FoodService} from "../../../../service/food.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Oder} from "../../../../model/order/Oder";
import {EStatusOrder} from "../../../../model/order/EStatusOrder";
import {OrderService} from "../../../../service/order.service";

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.component.html',
  styleUrls: ['./cancelorder.component.scss']
})
export class CancelorderComponent implements OnInit {

  oder!: Oder;

  constructor(private dialogRef: MatDialogRef<CancelorderComponent>,
              private orderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.oder = this.data;
  }

  CancelOder() {
    this.oder.status = <EStatusOrder>'CANCEL';
    this.orderService.updateOderUser(this.oder).subscribe(data => {
        this.snackBar.open("Hủy đơn hàng thành công", "OK", {
          duration: 4000
        });
      }
    )
    this.dialogRef.close();
  }
}
