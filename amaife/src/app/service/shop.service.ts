import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD Nhà cung cấp
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
}
