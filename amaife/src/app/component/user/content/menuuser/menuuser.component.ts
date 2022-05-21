import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../../service/food.service";
import {Food} from "../../../../model/food/Food";

@Component({
  selector: 'app-menuuser',
  templateUrl: './menuuser.component.html',
  styleUrls: ['./menuuser.component.scss']
})
export class MenuuserComponent implements OnInit {
  foodList!: Array<Food>;
  p: number | any;

  constructor(private foodService: FoodService) {
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
}
