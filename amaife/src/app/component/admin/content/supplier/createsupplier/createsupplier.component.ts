import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-createsupplier',
  templateUrl: './createsupplier.component.html',
  styleUrls: ['./createsupplier.component.scss']
})
export class CreatesupplierComponent implements OnInit {
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  supplier!: Supplier;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private supplierService: SupplierService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  formSupplier = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      address: new FormControl('', [Validators.required, Validators.min(0)]),
      phone: new FormControl('', [Validators.required, Validators.min(0)]),
      materialList: new FormArray([]),
    }
  )

  onSubmit() {
    console.log(this.formSupplier.value);
    if (this.formSupplier.valid) {
      this.supplierService.createSupplier(this.formSupplier.value).subscribe(
        (data) => {
          console.log(this.formSupplier.value)
          this.route.navigateByUrl("/supplier").then(() => this.snackBar.open("Thêm mới thành công!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Thêm mới thấy bại !")._dismissAfter(3000);
    }
  }
}
