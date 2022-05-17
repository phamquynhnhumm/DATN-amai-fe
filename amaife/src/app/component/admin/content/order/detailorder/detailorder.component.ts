import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Oder} from "../../../../../model/order/Oder";
import {OrderService} from "../../../../../service/order.service";
import {EStatusOrder} from "../../../../../model/order/EStatusOrder";

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.scss']
})
export class DetailorderComponent implements OnInit {

  oder!: Oder;
  eStatusOrder = EStatusOrder;

  constructor(private dialogRef: MatDialogRef<DetailorderComponent>,
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
