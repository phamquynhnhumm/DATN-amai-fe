import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Shop} from "../model/shop/Shop";
import {Food} from "../model/food/Food";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  /**
   * URL nhà cung cấp
   */
  readonly URL_SHOP = "http://localhost:8080/api/admin/shop";
  readonly URL_SHOP_CUSTOMER = "http://localhost:8080/api/shop";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD shop
   */
  findAllShop(): Observable<Array<Shop>> {
    return this.httpClient.get<Array<Shop>>(this.URL_SHOP);
  }

  updateSupplier(shop: Object): Observable<Shop> {
    return this.httpClient.put<Shop>(this.URL_SHOP, shop);
  }

  findBy(id: number): Observable<Shop> {
    return this.httpClient.get<Shop>(this.URL_SHOP + "/" + id);
  }

  findAllShopCustomer(): Observable<Array<Shop>> {
    return this.httpClient.get<Array<Shop>>(this.URL_SHOP_CUSTOMER, {headers: this.requestHeader});
  }
}
