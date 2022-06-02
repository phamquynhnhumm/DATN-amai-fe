import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Registration} from "../../../../../model/class/Registration";
import {RegistrationService} from "../../../../../service/registration.service";

@Component({
  selector: 'app-delete-class',
  templateUrl: './delete-class.component.html',
  styleUrls: ['./delete-class.component.scss']
})
export class DeleteClassComponent implements OnInit {

  registration!: Registration;

  constructor(private dialogRef: MatDialogRef<DeleteClassComponent>,
              private registrationService: RegistrationService,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.registration = this.data;
  }

  deleteregistration() {
    this.registrationService.deleteById(this.registration.id).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open("Xoá thành công !!! ", "OK", {
        duration: 4000
      })
    })
  }
}
