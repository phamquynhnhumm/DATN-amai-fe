import {Component, Inject, OnInit} from '@angular/core';
import {Oder} from "../../../../../model/order/Oder";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "../../../../../service/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Registration} from "../../../../../model/class/Registration";
import {RegistrationService} from "../../../../../service/registration.service";

@Component({
  selector: 'app-confirm-class',
  templateUrl: './confirm-class.component.html',
  styleUrls: ['./confirm-class.component.scss']
})
export class ConfirmClassComponent implements OnInit {

  registration!: Registration;

  constructor(private dialogRef: MatDialogRef<ConfirmClassComponent>,
              private registrationService: RegistrationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registration = this.data;
  }

  confirmClass() {
    this.registrationService.confirmCLass(this.registration).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xác nhận đã liên hệ thành công!!! ", "OK", {
        duration: 4000
      })
    })
  }
}
