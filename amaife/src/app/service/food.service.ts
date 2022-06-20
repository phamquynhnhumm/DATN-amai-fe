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

  /**
   * URL Món
   */
  readonly URL_FOOD = "https://salty-cove-09707.herokuapp.com/api/admin/food";
  readonly URL_Matrerail = "https://salty-cove-09707.herokuapp.com/api/admin/fooddetail/findByIdFood";
  readonly URL_FOOD_FINFDISDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/food/all";
  readonly URL_FOOD_FINFDISDELETANDFOODCATEGORY = "https://salty-cove-09707.herokuapp.com/api/admin/food/allFood";
  readonly URL_FOOD_UNDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/food/undelete";
  readonly URL_FOOD_DELETE = "https://salty-cove-09707.herokuapp.com/api/admin/food/delete";
  readonly URL_FOOD_FINDBYFOODCATEGORY_ID = "https://salty-cove-09707.herokuapp.com/api/admin/food/findByFoodcategoryId";
  readonly URL_FOOD_SEARCH = "https://salty-cove-09707.herokuapp.com/api/admin/food/search";
  readonly URL_FOOD_SEARCH_MATERIALID = "https://salty-cove-09707.herokuapp.com/api/admin/food/searchfindBymaterial";

  /**
   * URL danh mục
   */
  readonly URL_FOODCATEGORY = "https://salty-cove-09707.herokuapp.com/api/admin/foodcategory";
  readonly URL_FOODCATEGORY_SEARCH = "https://salty-cove-09707.herokuapp.com/api/admin/foodcategory/search";
  readonly URL_FOODCATEGORY_DELETE = "https://salty-cove-09707.herokuapp.com/api/admin/foodcategory/delete";
  readonly URL_FOODCATEGORY_UNDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/foodcategory/undelete";
  readonly URL_FOODCATEGOR_FINFDISDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/foodcategory/all";

  /**
   *URL chi tiết món
   */
  readonly URL_FOODDETAIL = "https://salty-cove-09707.herokuapp.com/api/admin/fooddetail";
  readonly URL_FOODDETAIL_SEARCH = "https://salty-cove-09707.herokuapp.com/api/admin/fooddetail/search";
  readonly URL_FOODDETAIL_DELETE = "https://salty-cove-09707.herokuapp.com/api/admin/fooddetail/delete";
  readonly URL_FOODDETAIL_UNDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/fooddetail/undelete";
  readonly URL_FOODDETAIL_FINFDISDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/fooddetail/all";

  /**
   * URL nguyên liệu
   */
  readonly URL_MATERIAL = "https://salty-cove-09707.herokuapp.com/api/admin/material";
  readonly URL_MATERIAL_FINFDISDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/material/all";
  readonly URL_MATERIAL_UNDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/material/undelete";
  readonly URL_MATERIAL_DELETE = "https://salty-cove-09707.herokuapp.com/api/admin/material/delete";
  readonly URL_MATERIAL_FINDBYSUPPLIER_ID = "https://salty-cove-09707.herokuapp.com/api/admin/material/findBySupplierId";
  readonly URL_MATERIAL_SEARCH = "https://salty-cove-09707.herokuapp.com/api/admin/material/search";


  /**
   * URL Food cho người dùng
   */
  readonly URL_FOODUSER_FINFDISDELETE = "https://salty-cove-09707.herokuapp.com/api/food/all";
  readonly URL_FOODUSER_IDCATEGORY = "https://salty-cove-09707.herokuapp.com/api/food/allFood";
  readonly URL_FOODUSER = "https://salty-cove-09707.herokuapp.com/api/food";
  readonly URL_FOODUSER_SEARCH = "https://salty-cove-09707.herokuapp.com/api/food/search";
  readonly URL_FOODUSER_SEARCHNAME = "https://salty-cove-09707.herokuapp.com/api/food/oderByName";
  readonly URL_FOODUSER_SEARCHCATEGORY = "https://salty-cove-09707.herokuapp.com/api/food/oderByFoodCategory";
  readonly URL_FOODUSER_SEARCHPRICE = "https://salty-cove-09707.herokuapp.com/api/food/oderByPrice";
  readonly URL_FOOD_FINFDISDELETANDFOODCATEGORYUSER = "https://salty-cove-09707.herokuapp.com/api/food/allFood";
  readonly URL_FOODCATEGOR_FINFDISDELETEUSER = "https://salty-cove-09707.herokuapp.com/api/food/foodcategoryall";
  readonly URL_FOOD_FINDBYFOODCATEGORY_IDUSER = "https://salty-cove-09707.herokuapp.com/api/food/findByFoodcategoryId";
  readonly URL_FOODCATEGORYUSER = "https://salty-cove-09707.herokuapp.com/api/food/foodcategory";

  constructor(private httpClient: HttpClient) {
  }

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  /**
   * CRUD Món
   */

  findAllFood(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD);
  }

  findAllFoodIsdeleteAndFoodCategory(isdeleteFood: boolean, idDeleteFoodCategory: boolean): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINFDISDELETANDFOODCATEGORY + "/" + isdeleteFood + "/" + idDeleteFoodCategory);
  }

  findAllFoodIsdelete(isdeleteFood: boolean): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINFDISDELETE + "/" + isdeleteFood);
  }

  findByIdFood(id: number): Observable<Food> {
    return this.httpClient.get<Food>(this.URL_FOOD + "/" + id);
  }

  /**
   * Danh sách nguyên liệu tạo nên một món
   * @param idFood
   */
  findByMaterailFindByIdFood(idFood: number): Observable<Array<FoodDetail>> {
    return this.httpClient.get<Array<FoodDetail>>(this.URL_Matrerail + "/" + idFood);
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

  /**
   * crud FOOD CHO  người dùn
   * @param isdeleteFood
   */
  findAllFoodIsdelete_User(isdeleteFood: boolean): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOODUSER_FINFDISDELETE + "/" + isdeleteFood, {headers: this.requestHeader});
  }

  findAllFoodUserIsdeleteAndFoodCategory(idFoodCategory: number): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOODUSER_IDCATEGORY + "/" + idFoodCategory, {headers: this.requestHeader});
  }

  findByIdFoodUser(id: number): Observable<Food> {
    return this.httpClient.get<Food>(this.URL_FOODUSER + "/" + id, {headers: this.requestHeader});
  }

  searcFoodUser(isDelete: boolean, name: string, foodCategoryName: string): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOODUSER_SEARCH, {
      params: new HttpParams().set('isDelete', isDelete).set('name', name).set('foodCategoryName', foodCategoryName),
      headers: this.requestHeader
    });
  }


  findAllFoodIsdeleteAndFoodCategoryUer(isdeleteFood: boolean, idDeleteFoodCategory: boolean): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINFDISDELETANDFOODCATEGORYUSER + "/" + isdeleteFood + "/" + idDeleteFoodCategory,
      {headers: this.requestHeader});
  }

  OrderByNameACS(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOODUSER_SEARCHNAME, {headers: this.requestHeader});
  }

  OrderByFoodCategoryACS(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOODUSER_SEARCHCATEGORY, {headers: this.requestHeader});
  }

  OrderByPriceACS(): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOODUSER_SEARCHPRICE, {headers: this.requestHeader});
  }

  findAllFoodCategoryIsdeleteUser(): Observable<Array<FoodCategory>> {
    return this.httpClient.get<Array<FoodCategory>>(this.URL_FOODCATEGOR_FINFDISDELETEUSER, {headers: this.requestHeader});
  }

  findAllFoodByFoodCategory_IdUSer(id: number): Observable<Array<Food>> {
    return this.httpClient.get<Array<Food>>(this.URL_FOOD_FINDBYFOODCATEGORY_IDUSER + "/" + id, {headers: this.requestHeader});
  }

  findByIdFoodCategoryUser(id: number): Observable<FoodCategory> {
    return this.httpClient.get<FoodCategory>(this.URL_FOODCATEGORYUSER + "/" + id, {headers: this.requestHeader});
  }
}
