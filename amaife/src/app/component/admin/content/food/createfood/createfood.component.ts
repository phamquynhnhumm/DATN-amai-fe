import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FoodService} from "../../../../../service/food.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Food} from "../../../../../model/food/Food";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FoodDetail} from "../../../../../model/food/FoodDetail";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";

@Component({
  selector: 'app-createfood',
  templateUrl: './createfood.component.html',
  styleUrls: ['./createfood.component.scss']
})
export class CreatefoodComponent implements OnInit {
  colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  food!: Food;
  foodcategory !: Array<FoodCategory>;
  fooddetail!: Array<FoodDetail>;
  url: string = "";
  selectedFile: File | any;

  constructor(private snackBar: MatSnackBar,
              private route: Router,
              private foodService: FoodService,
              private angularFireStorage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodCategoryIsdelete(false).subscribe(
      data => {
        this.foodcategory = data;
      }
    )
    this.foodService.findAllFoodDetailIsdelete(false).subscribe(
      datafoodDetail => {
        this.fooddetail = datafoodDetail;
      }
    )
  }

  formFood = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      unit: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      content: new FormControl('', [Validators.required, Validators.min(0)]),
      status: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
      foodCategory: new FormControl('', Validators.required),
      orderDetailList: new FormArray([]),
      foodDetailList: new FormArray([]),
      image: new FormControl('', Validators.required),
    }
  )

  onSubmit() {
    if (this.formFood.valid) {
      this.formFood.value.image = this.url;
      this.foodService.createFood(this.formFood.value).subscribe(
        (data) => {
          this.route.navigateByUrl("/food").then(() => this.snackBar.open("Thêm mới thành công!")._dismissAfter(3000))
        }
      )
    } else {
      this.snackBar.open("Thêm mới thấy bại !")._dismissAfter(3000);
    };
    this.url ="";
  }

  selectFile(event: any) {
    const path = new Date().toString();
    this.selectedFile = event.target.files[0];
    console.log(this.selectFile)
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
