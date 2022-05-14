import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Food} from "../model/food/Food";
import {Observable} from "rxjs";
import {FoodCategory} from "../model/food/FoodCategory";
import {FoodDetail} from "../model/food/FoodDetail";

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
  readonly URL_FOOD_FINDBYFOODCATEGORY_ID = "http://localhost:8080/api/food/findByFoodcategoryId";

  /**
   * URL danh mục
   */
  readonly URL_FOODCATEGORY = "http://localhost:8080/api/foodcategory";
  readonly URL_FOODCATEGORY_SEARCH = "http://localhost:8080/api/foodcategory/search";
  readonly URL_FOODCATEGORY_DELETE = "http://localhost:8080/api/foodcategory/delete";
  readonly URL_FOODCATEGORY_UNDELETE = "http://localhost:8080/api/foodcategory/undelete";
  readonly URL_FOODCATEGOR_FINFDISDELETE = "http://localhost:8080/api/foodcategory/all";

  /**
   *URL chi tiết món
   */
  readonly URL_FOODDETAIL = "http://localhost:8080/api/fooddetail";
  readonly URL_FOODDETAIL_SEARCH = "http://localhost:8080/api/fooddetail/search";
  readonly URL_FOODDETAIL_DELETE = "http://localhost:8080/api/fooddetail/delete";
  readonly URL_FOODDETAIL_UNDELETE = "http://localhost:8080/api/fooddetail/undelete";
  readonly URL_FOODDETAIL_FINFDISDELETE = "http://localhost:8080/api/fooddetail/all";

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

  findAllFoodByFoodCategory_Id(id: number): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINDBYFOODCATEGORY_ID + "/" + id);
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

  createFood(food: Object): Observable<Food> {
    return this.httpClient.post<Food>(this.URL_FOOD, food);
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

  /**
   * CRUD chi tiết món
   */
  findAllFoodDetail(): Observable<Array<FoodDetail>> {
    return this.httpClient.get<Array<FoodDetail>>(this.URL_FOODDETAIL);
  }

  searchNameandisDeleteFoodDetail(isDelete: boolean, name: string): Observable<Array<FoodDetail>> {
    return this.httpClient.get<Array<FoodDetail>>(this.URL_FOODDETAIL_SEARCH, {params: new HttpParams().set('isDelete', isDelete).set('name', name)});
  }

  findAllFoodDetailIsdelete(isdelete: boolean): Observable<Array<FoodDetail>> {
    return this.httpClient.get<Array<FoodDetail>>(this.URL_FOODDETAIL_FINFDISDELETE + "/" + isdelete);
  }

  findByIdFoodDetail(id: number): Observable<FoodDetail> {
    return this.httpClient.get<FoodDetail>(this.URL_FOODDETAIL + "/" + id);
  }

  updateFoodDetail(foodDetail: Object): Observable<FoodDetail> {
    return this.httpClient.put<FoodDetail>(this.URL_FOODDETAIL, foodDetail);
  }

  deleteByIdFoodDetail(id: number): Observable<FoodDetail> {
    return this.httpClient.delete<FoodDetail>(this.URL_FOODDETAIL_DELETE + "/" + id);
  }

  undeleteByIdFoodDetail(id: number, foodDetail: Object): Observable<FoodDetail> {
    return this.httpClient.put<FoodDetail>(this.URL_FOODDETAIL_UNDELETE + "/" + id, foodDetail);
  }

  createFoodDetail(foodDetail: Object): Observable<FoodDetail> {
    return this.httpClient.post<FoodDetail>(this.URL_FOODDETAIL, foodDetail);
  }
}
