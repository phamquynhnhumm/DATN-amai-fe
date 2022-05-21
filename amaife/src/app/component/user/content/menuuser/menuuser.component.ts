import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../../service/food.service";
import {Food} from "../../../../model/food/Food";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.scss']
})
export class MenuuserComponent implements OnInit {
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
