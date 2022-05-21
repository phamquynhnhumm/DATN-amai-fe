import { Component, OnInit } from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homeuser',
  templateUrl: './homeuser.component.html',
  styleUrls: ['./homeuser.component.scss']
})
export class HomeuserComponent implements OnInit {

  foodList!: Array<Food>;
  p: number | any;

  constructor(private foodService: FoodService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodIsdelete_User(false).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
        console.log(this.foodList)
      }
    )
  }

  detailFood(foods: Food) {
    // this.foodService.findByIdFoodUser(foods.foodCategory.id).subscribe(
    //   datafoodDetail => {
    this.router.navigate(['/detailfood/' + foods.foodCategory.id]);
    // }
    // )
  }
}
