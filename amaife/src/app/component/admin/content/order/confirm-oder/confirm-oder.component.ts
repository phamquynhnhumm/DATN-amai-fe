import {Component, Inject, OnInit} from '@angular/core';
import {Oder} from "../../../../../model/order/Oder";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-confirm-oder',
  templateUrl: './confirm-oder.component.html',
  styleUrls: ['./confirm-oder.component.scss']
})
export class ConfirmOderComponent implements OnInit {

  oder!: Oder;

  constructor(private dialogRef: MatDialogRef<ConfirmOderComponent>,
              private oderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.oder = this.data;
  }

  confirmOder() {
    this.oderService.confirmOder(this.oder).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xác nhận đơn hàng thành công!!! ", "OK", {
        duration: 4000
      })
    })
  }
}
