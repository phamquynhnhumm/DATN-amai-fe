import { Component, OnInit } from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";

@Component({
  selector: 'app-detailfooduser',
  templateUrl: './detailfooduser.component.html',
  styleUrls: ['./detailfooduser.component.scss']
})
export class DetailfooduserComponent implements OnInit {

  foodList!: Array<Food>;
  p: number | any;

  constructor(private foodService: FoodService) {
  }

  ngOnInit(): void {
    this.foodService.findAllFoodUserIsdeleteAndFoodCategory(2).subscribe(
      datafood => {
        this.p = 1;
        this.foodList = datafood;
        console.log(this.foodList)
      }
    )
  }
}
