import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-detailfooduser',
  templateUrl: './detailfooduser.component.html',
  styleUrls: ['./detailfooduser.component.scss']
})
export class DetailfooduserComponent implements OnInit {

  food !: Food;
  foodList!: Array<Food>;
  p: number | any;
  id!: number | null;
  loads: boolean = true;

  constructor(private foodService: FoodService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params['id'];
    this.foodService.findByIdFoodUser(id).subscribe(
      dataFoodDetail => {
        this.food = dataFoodDetail;
        this.foodService.findAllFoodUserIsdeleteAndFoodCategory(this.food.foodCategory.id).subscribe(
          datafood => {
            this.p = 1;
            this.foodList = datafood;
          }
        )
      }
    );
  }
  detailFood(foods: Food) {
    location.replace("/detailfood/" + foods.id)
  }
}
