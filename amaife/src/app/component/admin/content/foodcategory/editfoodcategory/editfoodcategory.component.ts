import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FoodCategory} from "../../../../../model/food/FoodCategory";

@Component({
  selector: 'app-editfoodcategory',
  templateUrl: './editfoodcategory.component.html',
  styleUrls: ['./editfoodcategory.component.scss']
})
export class EditfoodcategoryComponent implements OnInit {
  foodcategory!: FoodCategory;

  constructor(private dialogRef: MatDialogRef<EditfoodcategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.foodcategory = this.data;
  }

  editfoodcategory() {

  }
}
