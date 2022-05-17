import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Oder} from "../../../../../model/order/Oder";
import {OrderService} from "../../../../../service/order.service";

@Component({
  selector: 'app-unoder',
  templateUrl: './unoder.component.html',
  styleUrls: ['./unoder.component.scss']
})
export class UnoderComponent implements OnInit {

  oder!: Oder;

  constructor(private dialogRef: MatDialogRef<UnoderComponent>,
              private oderService: OrderService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.oder = this.data;
  }

  undomaterial() {
    this.oder.isDeleted = false;
    this.oderService.undeleteByIdOder(this.oder.id, this.oder).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Hoàn tác đơn hàng thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
