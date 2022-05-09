import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Food} from "../model/food/Food";
import {Observable} from "rxjs";
import {FoodCategory} from "../model/food/FoodCategory";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  readonly URL_FOOD = "http://localhost:8080/api/food";
  readonly URL_FOODCATEGORY = "http://localhost:8080/api/foodcategory";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD Món
   */

  findAllFood(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD);
  }

  findByIdFood(id: number): Observable<Food> {
    return this.httpClient.get<Food>(this.URL_FOOD + "/" + id);
  }

  /**
   * CRUD Danh Mục Món
   */
  findAllFoodCategory(): Observable<Array<FoodCategory>> {
    return this.httpClient.get<Array<FoodCategory>>(this.URL_FOODCATEGORY);
  }

  findByIdFoodCategory(id: number): Observable<FoodCategory> {
    return this.httpClient.get<FoodCategory>(this.URL_FOODCATEGORY + "/" + id);
  }
}
