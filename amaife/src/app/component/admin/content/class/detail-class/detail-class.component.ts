import {Component, Inject, OnInit} from '@angular/core';
import {OrderDetail} from "../../../../../model/order/OrderDetail";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RegistrationService} from "../../../../../service/registration.service";
import {Registration} from "../../../../../model/class/Registration";
import {EStatuasHandle} from "../../../../../model/class/EStatuasHandle";

@Component({
  selector: 'app-detail-class',
  templateUrl: './detail-class.component.html',
  styleUrls: ['./detail-class.component.scss']
})
export class DetailClassComponent implements OnInit {
  registration!: Registration;
  orderDetailList !: Array<OrderDetail>
  eStatuasHandle = EStatuasHandle;

  constructor(private dialogRef: MatDialogRef<DetailClassComponent>,
              private registrationService: RegistrationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registration = this.data;
  }

  cancel() {
    this.dialogRef.close();
    this.snackBar.open("Tắt chi đơn đăng ký tự làm món thành công", "OK", {
      duration: 4000
    })
  }
}
