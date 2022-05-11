import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {FormBuilder} from "@angular/forms";
import {FoodService} from "../../../../../service/food.service";

@Component({
  selector: 'app-createfoodcategory',
  templateUrl: './createfoodcategory.component.html',
  styleUrls: ['./createfoodcategory.component.scss']
})
export class CreatefoodcategoryComponent implements OnInit {
   colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
  foodcategory!: FoodCategory;

  constructor(private snackBar: MatSnackBar,
              private foodcategoryservice: FoodService,
              private snack: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  createfoodcategory(foodcategory: any) {

  }
}
