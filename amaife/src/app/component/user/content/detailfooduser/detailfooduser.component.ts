import {Component, OnInit} from '@angular/core';
import {Food} from "../../../../model/food/Food";
import {FoodService} from "../../../../service/food.service";
import {ActivatedRoute} from "@angular/router";

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
  id_food: string | any;

  constructor(private foodService: FoodService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // let id = this.activatedRoute.snapshot.params['id'];
    console.log("nhận idd xem được ko  nào")
    console.log(this.activatedRoute.data)
    this.activatedRoute.paramMap.subscribe(
      paramap => {
        this.id_food = paramap.get("id");
        console.log(this.id_food)
      });

    this.foodService.findByIdFood(1).subscribe(
      dataFoodDetail => {
        this.food = dataFoodDetail;
        this.foodService.findAllFoodUserIsdeleteAndFoodCategory(1).subscribe(
          datafood => {
            this.p = 1;
            this.foodList = datafood;
            console.log(this.foodList)
          }
        )
      }
    )
  }
}
