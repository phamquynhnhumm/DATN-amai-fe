import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FoodService} from "../../../../../service/food.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Material} from "../../../../../model/food/Material";
import {Supplier} from "../../../../../model/supplier/Supplier";
import {SupplierService} from "../../../../../service/supplier.service";

@Component({
  selector: 'app-creartematerial',
  templateUrl: './creartematerial.component.html',
  styleUrls: ['./creartematerial.component.scss']
})
export class CreartematerialComponent implements OnInit {

  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  material!: Material;
  suppliers !: Array<Supplier>;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private materialService: FoodService,
              private supplierService: SupplierService) {
  }

  ngOnInit(): void {
    this.supplierService.findAllSupplierIsdelete(false).subscribe(
      data => {
        this.suppliers = data;
      }
    )
  }

  formMaterial = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      unit: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      importKg: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      supplierList: new FormControl('', Validators.required),
      remainingKg: new FormControl(''),
    }
  )

  onSubmit() {
    console.log(this.formMaterial.value);
    if (this.formMaterial.valid) {
      this.formMaterial.value.remainingKg = this.formMaterial.value.importKg;
      console.log(this.formMaterial.value)
      this.materialService.createMaterial(this.formMaterial.value).subscribe(
        (data) => {
          this.route.navigateByUrl("/material").then(() => this.snackBar.open("Th??m m???i th??nh c??ng!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Th??m m???i th???y b???i !")._dismissAfter(3000);
    }
  }
}
