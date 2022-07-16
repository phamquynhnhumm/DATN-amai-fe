import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodService} from "../../../../../service/food.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Food} from "../../../../../model/food/Food";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-editfood',
  templateUrl: './editfood.component.html',
  styleUrls: ['./editfood.component.scss']
})
export class EditfoodComponent implements OnInit {

  food!: Food;
  foodcategory !: Array<FoodCategory>;
  formFood!: FormGroup;
  url: string = "";
  selectedFile: File | any;
  upload!: boolean;
  imagelink !: String

  constructor(
    private dialogRef: MatDialogRef<EditfoodComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private angularFireStorage: AngularFireStorage,
    private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodCategoryIsdelete(false).subscribe(
      data => {
        this.foodcategory = data;

      }
    )
    this.food = this.data;
    this.imagelink = this.data.image;

    this.formFood = new FormGroup(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        unit: new FormControl(this.data.unit, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        price: new FormControl(this.data.price, [Validators.required, Validators.min(1000), Validators.max(1000000)]),
        content: new FormControl(this.data.content, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        status: new FormControl(this.data.status, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        foodCategory: new FormControl(this.data.foodCategory, Validators.required),
        orderDetailList: new FormArray([]),
        foodDetailList: new FormArray([]),
        image: new FormControl(this.data.image, Validators.required),
      }
    )
  }

  cencal() {
    this.dialogRef.close();
    this.snackBar.open("Hủy cập nhật món", "OK", {
      duration: 4000
    })
  }

  onSubmit() {
    if (this.upload == false) {
      this.formFood.value.image = this.url;
      if (this.formFood.valid) {
        this.food.name = this.formFood.value.name;
        this.food.unit = this.formFood.value.unit;
        this.food.content = this.formFood.value.content;
        this.food.price = this.formFood.value.price;
        this.food.status = this.formFood.value.status;
        this.food.foodCategory = this.formFood.value.foodCategory;
        this.food.foodDetailList = this.formFood.value.foodDetailList;
        this.food.image = this.url;
        this.foodService.updateFood(this.food).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật món thành công", "OK", {
              duration: 4000
            });
            this.ngOnInit();
          }
        )
      } else {
        this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
      }
    }

    else  {
      this.formFood.value.image = this.imagelink;
      if (this.formFood.valid) {
        this.food.name = this.formFood.value.name;
        this.food.unit = this.formFood.value.unit;
        this.food.content = this.formFood.value.content;
        this.food.price = this.formFood.value.price;
        this.food.status = this.formFood.value.status;
        this.food.foodCategory = this.formFood.value.foodCategory;
        this.food.foodDetailList = this.formFood.value.foodDetailList;
        this.food.image = this.formFood.value.image;
        this.foodService.updateFood(this.food).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật món thành công", "OK", {
              duration: 4000
            });
            this.ngOnInit();
          }
        )
      } else {
        this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
      }
    }
  }

  selectFile(event: any) {
    this.upload = false;
    const path = new Date().toString();
    this.selectedFile = event.target.files[0];
    this.angularFireStorage.upload(path, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(
          (data) => {
            this.url = data;
          }
        )
      })
    ).subscribe();
  }
}
