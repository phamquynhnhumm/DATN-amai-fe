import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Supplier} from "../model/supplier/Supplier";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  /**
   * URL nhà cung cấp
   */
  readonly URL_SUPPLIER = "http://localhost:8080/api/admin/supplier";
  readonly URL_SUPPLIER_FINFDISDELETE = "http://localhost:8080/api/admin/supplier/all";
  readonly URL_SUPPLIER_UNDELETE = "http://localhost:8080/api/admin/supplier/undelete";
  readonly URL_SUPPLIER_DELETE = "http://localhost:8080/api/admin/supplier/delete";
  readonly URL_SUPPLIER_FINDBYFOODCATEGORY_ID = "http://localhost:8080/api/supplier/admin/findByFoodcategoryId";
  readonly URL_SUPPLIER_SEARCH = "http://localhost:8080/api/admin/supplier/search";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD Nhà cung cấp
   */
  findAllSupplier(): Observable<Array<Supplier>> {
    return this.httpClient.get<Array<Supplier>>(this.URL_SUPPLIER);
  }

  findAllSupplierIsdelete(isdelete: boolean): Observable<Array<Supplier>> {
    return this.httpClient.get<Array<Supplier>>(this.URL_SUPPLIER_FINFDISDELETE + "/" + isdelete);
  }

  findByIdSupplier(id: number): Observable<Supplier> {
    return this.httpClient.get<Supplier>(this.URL_SUPPLIER + "/" + id);
  }

  findAllFoodByFoodCategory_Id(id: number): Observable<Array<Supplier>> {
    return this.httpClient.get<Array<Supplier>>(this.URL_SUPPLIER_FINDBYFOODCATEGORY_ID + "/" + id);
  }

  undeleteByIdSupplier(id: number, supplier: Object): Observable<Supplier> {
    return this.httpClient.put<Supplier>(this.URL_SUPPLIER_UNDELETE + "/" + id, supplier);
  }

  updateSupplier(food: Object): Observable<Supplier> {
    return this.httpClient.put<Supplier>(this.URL_SUPPLIER, food);
  }

  deleteByIdSupplier(id: number): Observable<Supplier> {
    return this.httpClient.delete<Supplier>(this.URL_SUPPLIER_DELETE + "/" + id);
  }

  createSupplier(supplier: Object): Observable<Supplier> {
    return this.httpClient.post<Supplier>(this.URL_SUPPLIER, supplier);
  }

  searchSupplier(isDelete: boolean, name: string, email: string, phone: string, address: string): Observable<Array<Supplier>> {
    return this.httpClient.get<Array<Supplier>>(this.URL_SUPPLIER_SEARCH, {params: new HttpParams().set('isDelete', isDelete).set('name', name).set('email', email).set('phone', phone).set('address', address)});
  }
}
