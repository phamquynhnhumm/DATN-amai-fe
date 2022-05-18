import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Food} from "../model/food/Food";
import {Observable} from "rxjs";
import {FoodCategory} from "../model/food/FoodCategory";
import {FoodDetail} from "../model/food/FoodDetail";
import {Material} from "../model/food/Material";

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );
  /**
   * URL Món
   */
  readonly URL_FOOD = "http://localhost:8080/api/admin/food";
  readonly URL_FOOD_FINFDISDELETE = "http://localhost:8080/api/admin/food/all";
  readonly URL_FOOD_UNDELETE = "http://localhost:8080/api/admin/food/undelete";
  readonly URL_FOOD_DELETE = "http://localhost:8080/api/admin/food/delete";
  readonly URL_FOOD_FINDBYFOODCATEGORY_ID = "http://localhost:8080/api/admin/food/findByFoodcategoryId";
  readonly URL_FOOD_SEARCH = "http://localhost:8080/api/admin/food/search";
  readonly URL_FOOD_SEARCH_MATERIALID = "http://localhost:8080/api/admin/food/searchfindBymaterial";

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
   * URL nguyên liệu
   */
  readonly URL_MATERIAL = "http://localhost:8080/api/material";
  readonly URL_MATERIAL_FINFDISDELETE = "http://localhost:8080/api/material/all";
  readonly URL_MATERIAL_UNDELETE = "http://localhost:8080/api/material/undelete";
  readonly URL_MATERIAL_DELETE = "http://localhost:8080/api/material/delete";
  readonly URL_MATERIAL_FINDBYSUPPLIER_ID = "http://localhost:8080/api/material/findBySupplierId";
  readonly URL_MATERIAL_SEARCH = "http://localhost:8080/api/material/search";

  /**
   * CRUD Món
   */

  findAllFood(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD);
  }

  findAllFoodIsdelete(isdelete: boolean): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINFDISDELETE + "/" + isdelete, {headers: this.requestHeader});
  }

  findByIdFood(id: number): Observable<Food> {
    return this.httpClient.get<Food>(this.URL_FOOD + "/" + id,{headers: this.requestHeader});
  }

  findAllFoodByFoodCategory_Id(id: number): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINDBYFOODCATEGORY_ID + "/" + id);
  }

  undeleteByIdFood(id: number, food: Object): Observable<Food> {
    return this.httpClient.put<Food>(this.URL_FOOD_UNDELETE + "/" + id, food);
  }

  updateFood(food: Object): Observable<Food> {
    return this.httpClient.put<Food>(this.URL_FOOD, food);
  }

  deleteByIdFood(id: number): Observable<Food> {
    return this.httpClient.delete<Food>(this.URL_FOOD_DELETE + "/" + id);
  }

  createFood(food: Object): Observable<Food> {
    return this.httpClient.post<Food>(this.URL_FOOD, food);
  }

  searcFood(isDelete: boolean, name: string, unit: string, foodCategoryName: string): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_SEARCH, {params: new HttpParams().set('isDelete', isDelete).set('name', name).set('unit', unit).set('foodCategoryName', foodCategoryName)});
  }

  /**
   * Tìm kiếm theo trạng thái của món và theo id của nguyên liệu để hiện thi cách món sử dùng 1 nguyên liệu
   */
  searchFoodfindMaterialID(isDelete: boolean, id: number): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_SEARCH_MATERIALID, {params: new HttpParams().set('isDelete', isDelete).set('id', id)});
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

  searchFoodDetailFoodandMaterial(isDeleteFoodDetail: boolean, isDeleteFood: boolean, isDeleteMaterial: boolean, nameFood: string, nameMaterial: string): Observable<Array<FoodDetail>> {
    return this.httpClient.get<Array<FoodDetail>>(this.URL_FOODDETAIL_SEARCH, {params: new HttpParams().set('isDeleteFoodDetail', isDeleteFoodDetail).set('isDeleteFood', isDeleteFood).set('isDeleteMaterial', isDeleteMaterial).set('nameFood', nameFood).set('nameMaterial', nameMaterial)});
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

  /**
   * CRUD nguyên liệu
   */

  findAllMaterial(): Observable<Array<Material>> {
    return this.httpClient.get<Array<Material>>(this.URL_MATERIAL);
  }

  findAllMaterialIsdelete(isdelete: boolean): Observable<Array<Material>> {
    return this.httpClient.get<Array<Material>>(this.URL_MATERIAL_FINFDISDELETE + "/" + isdelete);
  }

  findByIdMaterial(id: number): Observable<Material> {
    return this.httpClient.get<Material>(this.URL_MATERIAL + "/" + id);
  }

  findAllMaterialBySupplier_Id(id: number): Observable<Array<Material>> {
    return this.httpClient.get<Array<Material>>(this.URL_MATERIAL_FINDBYSUPPLIER_ID + "/" + id);
  }

  undeleteByIdMaterial(id: number, material: Object): Observable<Material> {
    return this.httpClient.put<Material>(this.URL_MATERIAL_UNDELETE + "/" + id, material);
  }

  updateMaterial(material: Object): Observable<Material> {
    return this.httpClient.put<Material>(this.URL_MATERIAL, material);
  }

  deleteByIdMaterial(id: number): Observable<Material> {
    return this.httpClient.delete<Material>(this.URL_MATERIAL_DELETE + "/" + id);
  }

  createMaterial(material: Object): Observable<Material> {
    return this.httpClient.post<Material>(this.URL_MATERIAL, material);
  }

  searcMaterial(isDelete: boolean, name: string, unit: string, supplierName: string): Observable<Array<Material>> {
    return this.httpClient.get<Array<Material>>(this.URL_MATERIAL_SEARCH, {params: new HttpParams().set('isDelete', isDelete).set('name', name).set('unit', unit).set('supplierName', supplierName)});
  }
}
