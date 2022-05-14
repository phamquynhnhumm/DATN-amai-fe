import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  /**
   * URL Món
   */
  readonly URL_FOOD = "http://localhost:8080/api/food";
  readonly URL_FOOD_FINFDISDELETE = "http://localhost:8080/api/food/all";
  readonly URL_FOOD_UNDELETE = "http://localhost:8080/api/food/undelete";
  readonly URL_FOOD_DELETE = "http://localhost:8080/api/food/delete";
  readonly URL_FOOD_FINDBYFOODCATEGORY_ID = "http://localhost:8080/api/food/findByFoodcategoryId";
  readonly URL_FOOD_SEARCH = "http://localhost:8080/api/food/search";

  constructor(private httpClient: HttpClient) {
  }
}
