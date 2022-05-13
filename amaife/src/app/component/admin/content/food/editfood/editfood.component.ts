import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Food} from "../../../../../model/food/Food";

@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.scss']
})
export class EditfoodComponent implements OnInit {

  food!: Food;

  constructor(
    private dialogRef: MatDialogRef<EditfoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private foodService: FoodService,
    private route: Router,
    private fb: FormBuilder) {
  }

  formFood!: FormGroup;

  ngOnInit(): void {
    this.food = this.data;
       this.formFood = new FormGroup(
         {
        name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        unit: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        price: new FormControl('', [Validators.required, Validators.min(0)]),
        describe: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(1000)]),
        quanity: new FormControl('', [Validators.required, Validators.min(0)]),
        status: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        foodCategory: new FormGroup({
            id: new FormControl()
          }
        ),
        image: new FormControl('', Validators.required),
      }
    )
  }

  bolen: boolean = false;

  cencal() {
    this.bolen = true;
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật món", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    /**
     * Trách trường hợp isDelete null
     */
    if (this.formFood.value.isDeleted) {
      this.formFood.value.isDeleted = true;
    } else {
      this.formFood.value.isDeleted = false;
    }
    if (this.formFood.valid) {
      this.food.name = this.formFood.value.name;
      if (!this.bolen) {
        this.food.isDeleted = this.formFood.value.isDeleted;
        this.foodService.updateFood(this.food).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật món thành công", "OK", {
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
