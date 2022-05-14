import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-editsupplier',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.scss']
})
export class EditsupplierComponent implements OnInit {
  supplier!: Supplier;

  constructor(
    private dialogRef: MatDialogRef<EditsupplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private supplierService: SupplierService,
    private route: Router,
    private fb: FormBuilder) {
  }

  formSupplier!: FormGroup;

  ngOnInit(): void {
    this.supplier = this.data;

    this.formSupplier = new FormGroup(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        email: new FormControl(this.data.email, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        address: new FormControl(this.data.address, [Validators.required, Validators.min(0)]),
        phone: new FormControl(this.data.phone, [Validators.required, Validators.min(0)]),
        isDeleted: new FormControl(this.data.isDeleted),
      }
    );
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật danh mục", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formSupplier.value.isDeleted) {
      this.formSupplier.value.isDeleted = true;
    } else {
      this.formSupplier.value.isDeleted = false;
    }
    if (this.formSupplier.valid) {
      this.supplier.name = this.formSupplier.value.name;
      this.supplier.email = this.formSupplier.value.email
      this.supplier.phone = this.formSupplier.value.phone;
      this.supplier.address = this.formSupplier.value.address;
      if (!this.bolen) {
        this.supplier.isDeleted = this.formSupplier.value.isDeleted;
        this.supplierService.updateSupplier(this.supplier).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật nhà cung cấp thành công", "OK", {
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
