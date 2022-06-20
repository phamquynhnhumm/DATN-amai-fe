import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Oder} from "../model/order/Oder";
import {OrderDetail} from "../model/order/OrderDetail";
import {Cart} from "../model/order/Cart";
import {EStatusOrder} from "../model/order/EStatusOrder";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  /**
   * URL đơn hàng ADmin
   */
  readonly URL_ORDER = "https://salty-cove-09707.herokuapp.com/api/admin/order";
  readonly URL_ORDER_CONFIRM = "https://salty-cove-09707.herokuapp.com/api/admin/order/confirm";
  readonly URL_ORDER_FINFDISDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/order/all";
  readonly URL_ORDER_STATUS = "https://salty-cove-09707.herokuapp.com/api/admin/order/status";
  readonly URL_ORDER_UNDELETE = "https://salty-cove-09707.herokuapp.com/api/admin/order/undelete";
  readonly URL_ORDER_DELETE = "https://salty-cove-09707.herokuapp.com/api/admin/order/delete";
  readonly URL_ORDER_FINDBYACOUNT_NAME = "https://salty-cove-09707.herokuapp.com/api/admin/order/findBySupplierId";
  readonly URL_ORDER_SEARCH = "https://salty-cove-09707.herokuapp.com/api/admin/order/search";

  /**
   * URL đơn hàng cho khách hàng
   */
  readonly URL_ORDER_FINFDISDELETE_USER = "https://salty-cove-09707.herokuapp.com/api/order/userName";
  readonly URL_ORDERUSER = "https://salty-cove-09707.herokuapp.com/api/order";
  readonly URL_ORDERUSERCACEL = "https://salty-cove-09707.herokuapp.com/api/order/cancel";
  readonly URL_ORDERDETAILUSER = "https://salty-cove-09707.herokuapp.com/api/order/detail";
  readonly URL_CREATEORDERUSER = "https://salty-cove-09707.herokuapp.com/api/order/createOder";

  /**
   * URL giỏ hàng
   */
  readonly URL_CARTRUSER = "https://salty-cove-09707.herokuapp.com/api/cart";
  readonly URL_CARTRUSER_TOTALMONEY = "https://salty-cove-09707.herokuapp.com/api/cart/totalMoney";
  readonly URL_CARTRUSER_QUANTITY = "https://salty-cove-09707.herokuapp.com/api/cart/totalQuantity";
  readonly URL_CARTRUSER_DELETE = "https://salty-cove-09707.herokuapp.com/api/cart/delete";
  readonly URL_CARTRUSER_CANCEL = "https://salty-cove-09707.herokuapp.com/api/cart/cancel";

  /**
   * URL chi tiết đơn hàng phía User
   */
  readonly URL_ODERDETAIL_CREATE = "https://salty-cove-09707.herokuapp.com/api/order/createDetailOder";
  readonly URL_CREATEQRCODE = "https://salty-cove-09707.herokuapp.com/api/order/generateQRCode";


  /**
   * URL chi tiết đơn hàng phía Admin
   */
  readonly OrderDetail = "https://salty-cove-09707.herokuapp.com/api/admin/orderdetail/detail";

  requestHeader = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor(private httpClient: HttpClient) {
  }

  /**
   * CRUD đơn hàng ADMIN
   */
  // danh đơn hàng mới
  finAllStatus(status: EStatusOrder): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER_STATUS + "/" + status);
  }

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

  confirmOder(order: Object): Observable<Oder> {
    return this.httpClient.put<Oder>(this.URL_ORDER_CONFIRM, order);
  }

  deleteByIdOder(id: number): Observable<Oder> {
    return this.httpClient.delete<Oder>(this.URL_ORDER_DELETE + "/" + id);
  }

  createOder(order: Object): Observable<Oder> {
    return this.httpClient.post<Oder>(this.URL_ORDER, order);
  }

  searcOder(isDeleteOder: boolean, isDeleteAccount: boolean, fullName: string, userName: string, address: string, phone: string): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER_SEARCH, {params: new HttpParams().set('isDeleteOder', isDeleteOder).set('isDeleteAccount', isDeleteAccount).set('fullName', fullName).set('userName', userName).set('address', address).set('phone', phone)});
  }

  /**
   * CRUD chi tiết đơn hàng phía ADMIN
   */
  // danh sách chi tiết đơn hàng có cùng mã đơn hàng
  findAllOrderDetailByIdOder(id: number): Observable<Array<OrderDetail>> {
    return this.httpClient.get<Array<OrderDetail>>(this.OrderDetail + "/" + id);
  }

  /**
   * CRUD đơn hàng người dùng
   */
  findOderUser(userName: string): Observable<Array<Oder>> {
    return this.httpClient.get<Array<Oder>>(this.URL_ORDER_FINFDISDELETE_USER + "/" + userName);
  }

  /**
   * Người dùng thêm mới đơn hàng
   * @param order
   */
  createOderUser(order: Object): Observable<Oder> {
    return this.httpClient.post<Oder>(this.URL_CREATEORDERUSER, order);
  }


  /**
   * danh sách chi tiết món tìm kiếm theo id order
   * @param idOders
   */
  findOderDetailUser(idOders: number): Observable<Array<OrderDetail>> {
    return this.httpClient.get<Array<OrderDetail>>(this.URL_ORDERDETAILUSER + "/" + idOders);
  }

  findByIdOderUser(id: number): Observable<Oder> {
    return this.httpClient.get<Oder>(this.URL_ORDERUSER + "/" + id);
  }

  updateOderUser(order: Object): Observable<Oder> {
    return this.httpClient.put<Oder>(this.URL_ORDERUSER, order);
  }
  cancelOderUser(order: Object): Observable<Oder> {
    return this.httpClient.put<Oder>(this.URL_ORDERUSERCACEL, order);
  }

  /**
   * CRUD giỏ hàng
   */
  findCartUser(userName: string): Observable<Array<Cart>> {
    return this.httpClient.get<Array<Cart>>(this.URL_CARTRUSER, {params: new HttpParams().set('userName', userName)});
  }

  createCartUser(cart: Object): Observable<Cart> {
    return this.httpClient.post<Cart>(this.URL_CARTRUSER, cart);
  }

  deleteByIdCart(id: number): Observable<Cart> {
    return this.httpClient.delete<Cart>(this.URL_CARTRUSER_DELETE + "/" + id);
  }

  /**
   * Xóa card khỏi giỏ hàng ( xóa hoàn toàn)
   * @param id
   */
  cancelByIdCart(id: number): Observable<Cart> {
    return this.httpClient.delete<Cart>(this.URL_CARTRUSER_CANCEL + "/" + id);
  }

  findByIdCart(id: number): Observable<Cart> {
    return this.httpClient.get<Cart>(this.URL_CARTRUSER + "/" + id);
  }

  totalMoneyCart(userName: string): Observable<number> {
    return this.httpClient.get<number>(this.URL_CARTRUSER_TOTALMONEY, {
      params: new HttpParams().set('userName', userName),
    });
  }

  totalQuantityCart(userName: string): Observable<number> {
    return this.httpClient.get<number>(this.URL_CARTRUSER_QUANTITY, {params: new HttpParams().set('userName', userName)});
  }

  updateCart(cart: Object): Observable<Cart> {
    return this.httpClient.put<Cart>(this.URL_CARTRUSER, cart);
  }


  /**
   * Thêm đồng thời nhiều chi tiết món cùng một lúc
   */
  createOderDetailUser(orderDetails: Array<OrderDetail>): Observable<OrderDetail> {
    return this.httpClient.post<OrderDetail>(this.URL_ODERDETAIL_CREATE, orderDetails);
  }

  createQRCode(oder: Oder): Observable<Oder> {
    return this.httpClient.post<Oder>(this.URL_CREATEQRCODE, oder);
  }

  /**
   * Cập nhật max QR coee thành link firebase
   */
  updateQrcode(order: Object): Observable<Oder> {
    return this.httpClient.put<Oder>(this.URL_ORDERUSER, order);
  }
}
