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

    this.formFood = new FormGroup(
      {
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]),
        unit: new FormControl(this.data.unit, [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
        price: new FormControl(this.data.price, [Validators.required, Validators.min(1000), Validators.max(1000000)]),
        content: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        status: new FormControl(this.data.status, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
        foodCategory: new FormControl(this.data.foodCategory, Validators.required),
        orderDetailList: new FormArray([]),
        foodDetailList: new FormArray([]),
        image: new FormControl('',Validators.required),
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
      this.food.unit = this.formFood.value.unit;
      this.food.content = this.formFood.value.content;
      this.food.price = this.formFood.value.price;
      this.food.status = this.formFood.value.status;
      this.food.foodCategory = this.formFood.value.foodCategory;
      this.food.foodDetailList = this.formFood.value.foodDetailList;
      /**
       * Trường họpe nếu cập nhât ảnh thì lấy ảnh mới còn ko thì lấy ảnh cũ ( tránh trường hợp ko cập nhật ảnh nhưng submit kiếm image bị null
       */
      if (this.formFood.value.image != "") {
        this.food.image = this.url;
      }
      if (!this.bolen) {
        this.food.isDeleted = this.formFood.value.isDeleted;
        this.foodService.updateFood(this.food).subscribe(data => {
            this.dialogRef.close();
            this.snackBar.open("Cập nhật món thành công", "OK", {
              duration: 4000
            });
            this.ngOnInit();
          }
        )
      }
    } else {
      this.snackBar.open("Cập nhật thấy bại !")._dismissAfter(3000);
    }
  }

  selectFile(event: any) {
    const path = new Date().toString();
    this.selectedFile = event.target.files[0];
    this.angularFireStorage.upload(path, this.selectedFile).snapshotChanges().pipe(
      finalize(() => {
        this.angularFireStorage.ref(path).getDownloadURL().subscribe(
          (data) => {
            this.url = data;
            console.log(this.url)
          }
        )
      })
    ).subscribe();
  }
}
