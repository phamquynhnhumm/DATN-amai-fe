import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../../../../../service/registration.service";
import {Registration} from "../../../../../model/class/Registration";
import {EStatuasHandle} from "../../../../../model/class/EStatuasHandle";

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {

  registration!: Registration;
  eStatuasHandle = ['NOTCONTACTED', 'CONTACTED']

  constructor(
    private dialogRef: MatDialogRef<UpdateClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private registrationService: RegistrationService) {
  }

  formRegistration!: FormGroup;

  ngOnInit(): void {
    this.registration = this.data;
    this.formRegistration = new FormGroup(
      {
        handle: new FormControl(this.data.handle, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        isDeleted: new FormControl(this.data.isDeleted),
      }
    );
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật ", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formRegistration.value.isDeleted) {
      this.formRegistration.value.isDeleted = true;
    } else {
      this.formRegistration.value.isDeleted = false;
    }
    if (this.formRegistration.valid) {
      this.registration.handle = this.formRegistration.value.handle;
      if (!this.bolen) {
        this.registration.isDeleted = this.formRegistration.value.isDeleted;
        this.registrationService.updateRegistration(this.registration).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật thành công", "OK", {
              duration: 4000
            })
          }
        )
      }
    } else {
      this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
    }
  }
}
