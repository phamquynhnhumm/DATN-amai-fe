import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Food} from "../model/food/Food";
import {Observable} from "rxjs";
import {FoodCategory} from "../model/food/FoodCategory";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  /**
   * URL Món
   */
  readonly URL_FOOD = "http://localhost:8080/api/food";
  readonly URL_FOOD_FINFDISDELETE = "http://localhost:8080/api/food/all";
  readonly URL_FOOD_UNDELETE = "http://localhost:8080/api/food/undelete";
  readonly URL_FOOD_DELETE = "http://localhost:8080/api/food/delete";

  /**
   * URL danh mục
   */
  readonly URL_FOODCATEGORY = "http://localhost:8080/api/foodcategory";
  readonly URL_FOODCATEGORY_SEARCH = "http://localhost:8080/api/foodcategory/search";
  readonly URL_FOODCATEGORY_DELETE = "http://localhost:8080/api/foodcategory/delete";
  readonly URL_FOODCATEGORY_UNDELETE = "http://localhost:8080/api/foodcategory/undelete";
  readonly URL_FOODCATEGOR_FINFDISDELETE = "http://localhost:8080/api/foodcategory/all";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD Món
   */

  findAllFood(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD);
  }

  findAllFoodIsdelete(isdelete: boolean): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINFDISDELETE + "/" + isdelete);
  }

  findByIdFood(id: number): Observable<Food> {
    return this.httpClient.get<Food>(this.URL_FOOD + "/" + id);
  }

  undeleteByIdFood(id: number, food: Object): Observable<Food> {
    return this.httpClient.put<Food>(this.URL_FOOD_UNDELETE + "/" + id, food);
  }

  updateFood(food: Object): Observable<FoodCategory> {
    return this.httpClient.put<FoodCategory>(this.URL_FOOD, food);
  }

  deleteByIdFood(id: number): Observable<Food> {
    return this.httpClient.delete<Food>(this.URL_FOOD_DELETE + "/" + id);
  }

  /**
   * CRUD Danh Mục Món
   */
  findAllFoodCategory(): Observable<Array<FoodCategory>> {
    return this.httpClient.get<Array<FoodCategory>>(this.URL_FOODCATEGORY);
  }

  searchNameandisDeleteFoodCategory(isDelete: boolean, name: string): Observable<Array<FoodCategory>> {
    return this.httpClient.get<Array<FoodCategory>>(this.URL_FOODCATEGORY_SEARCH, {params: new HttpParams().set('isDelete', isDelete).set('name', name)});
  }

  findAllFoodCategoryIsdelete(isdelete: boolean): Observable<Array<FoodCategory>> {
    return this.httpClient.get<Array<FoodCategory>>(this.URL_FOODCATEGOR_FINFDISDELETE + "/" + isdelete);
  }

  findByIdFoodCategory(id: number): Observable<FoodCategory> {
    return this.httpClient.get<FoodCategory>(this.URL_FOODCATEGORY + "/" + id);
  }

  updateFoodCategory(foodCategory: Object): Observable<FoodCategory> {
    return this.httpClient.put<FoodCategory>(this.URL_FOODCATEGORY, foodCategory);
  }

  deleteByIdFoodCategory(id: number): Observable<FoodCategory> {
    return this.httpClient.delete<FoodCategory>(this.URL_FOODCATEGORY_DELETE + "/" + id);
  }

  undeleteByIdFoodCategory(id: number, foodCategory: Object): Observable<FoodCategory> {
    return this.httpClient.put<FoodCategory>(this.URL_FOODCATEGORY_UNDELETE + "/" + id, foodCategory);
  }

  createFoodCategory(foodCategory: Object): Observable<FoodCategory> {
    return this.httpClient.post<FoodCategory>(this.URL_FOODCATEGORY, foodCategory);
  }
}
