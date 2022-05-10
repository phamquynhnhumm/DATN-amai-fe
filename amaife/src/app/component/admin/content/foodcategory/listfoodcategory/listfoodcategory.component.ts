import {Component, OnInit} from '@angular/core';
import {EditfoodcategoryComponent} from "../editfoodcategory/editfoodcategory.component";
import {MatDialog} from "@angular/material/dialog";
import {data} from "jquery";
import {FoodCategory} from "../../../../../model/food/FoodCategory";
import {ActivatedRoute} from "@angular/router";
import {DELETE} from "@angular/cdk/keycodes";
import {DetailfoodcategoryComponent} from "../detailfoodcategory/detailfoodcategory.component";
import {DelatefoodcategoryComponent} from "../delatefoodcategory/delatefoodcategory.component";

@Component({
  selector: 'app-listfoodcategory',
  templateUrl: './listfoodcategory.component.html',
  styleUrls: ['./listfoodcategory.component.scss']
})
export class ListfoodcategoryComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) {
  }

  dtOptions: DataTables.Settings = {};
  foodcategory!: FoodCategory;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  openEditFoodCategory(foodcategory: FoodCategory) {
    const dialogRef = this.dialog.open(EditfoodcategoryComponent, {
      width: '300px',
      height: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

  openDeleteFoodCategory(foodcategory: FoodCategory) {
    const dialogRef = this.dialog.open(DelatefoodcategoryComponent, {
      width: '450px',
      height: '250px',
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
  openDetailFoodCategory(foodcategory: FoodCategory) {
    const dialogRef = this.dialog.open(DetailfoodcategoryComponent, {
      width: '300px',
      height: '200px',
      data: data
    });
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
