import {Component, Inject, OnInit} from '@angular/core';
import {Food} from "../../../../../model/food/Food";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {Material} from "../../../../../model/food/Material";
import {data} from "jquery";

@Component({
  selector: 'app-editfooddetail',
  templateUrl: './editfooddetail.component.html',
  styleUrls: ['./editfooddetail.component.scss']
})
export class EditfooddetailComponent implements OnInit {

  foodDetail!: FoodDetail;
  foodList !: Array<Food>;
  materialList !: Array<Material>;
  formFoodDetail!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditfooddetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.foodDetail = this.data;
    this.foodService.findAllFoodIsdelete(false).subscribe(
      dataList => {
        this.foodList = dataList;
      }
    );

    this.foodService.findAllMaterialIsdelete(false).subscribe(
      dataMaterial => {
        this.materialList = dataMaterial;
      }
    );

    this.formFoodDetail = new FormGroup(
      {
        food: new FormControl(this.data.foodList, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        material: new FormControl(this.data.materialList, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        kg: new FormControl(this.data.kg, [Validators.required, Validators.min(0)])
      }
    )
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật chi tiết món", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    console.log(this.formFoodDetail.value)
    if (this.formFoodDetail.valid) {
      this.foodDetail.food = this.formFoodDetail.value.food;
      this.foodDetail.material = this.formFoodDetail.value.material;
      this.foodDetail.kg = this.formFoodDetail.value.kg;
      console.log(this.foodDetail)

      if (!this.bolen) {
        this.foodService.updateMaterial(this.foodDetail).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật chi tiết thành công", "OK", {
              duration: 4000
            })
          }
        )
      } else {
        this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
      }
    }
  }
}
