import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Material} from "../model/food/Material";
import {Oder} from "../model/order/Oder";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  /**
   * URL đơn hànd
   */
  readonly URL_ORDER = "http://localhost:8080/api/admin/order";
  readonly URL_ORDER_FINFDISDELETE = "http://localhost:8080/api/admin/order/all";
  readonly URL_ORDER_UNDELETE = "http://localhost:8080/api/admin/order/undelete";
  readonly URL_ORDER_DELETE = "http://localhost:8080/api/admin/order/delete";
  readonly URL_ORDER_FINDBYACOUNT_NAME = "http://localhost:8080/api/admin/order/findBySupplierId";
  readonly URL_ORDER_SEARCH = "http://localhost:8080/api/admin/order/search";


  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD đơn hàng
   */

  findAllOder(): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER);
  }

  findAllOrderlIsdelete(isdelete: boolean): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER_FINFDISDELETE + "/" + isdelete);
  }

  findByIdOder(id: number): Observable<Oder> {
    return this.httpClient.get<Oder>(this.URL_ORDER + "/" + id);
  }

  findAllMaterialBySupplier_Id(id: number): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER_FINDBYACOUNT_NAME + "/" + id);
  }

  undeleteByIdOder(id: number, order: Object): Observable<Oder> {
    return this.httpClient.put<Oder>(this.URL_ORDER_UNDELETE + "/" + id, order);
  }

  updateOder(order: Object): Observable<Oder> {
    return this.httpClient.put<Oder>(this.URL_ORDER, order);
  }

  deleteByIdOder(id: number): Observable<Oder> {
    return this.httpClient.delete<Oder>(this.URL_ORDER_DELETE + "/" + id);
  }

  createOder(order: Object): Observable<Oder> {
    return this.httpClient.post<Oder>(this.URL_ORDER, order);
  }

  searcOder(isDeleteOder: boolean, isDeleteAccount: boolean, fullName: string, userName: string, address: string, phone: string): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER_SEARCH, {params: new HttpParams().set('isDeleteOder', isDeleteOder).set('isDeleteAccount', isDeleteAccount).set('fullName', fullName).set('userName', userName).set('address',address).set('phone',phone)});
  }
}
