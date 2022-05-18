import {Account} from "../user/Account";
import {EStatusOrder} from "./EStatusOrder";
import {OrderDetail} from "./OrderDetail";

export interface Oder {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  account: Account;
  address: string;
  phone: string;
  fullName: string;
  qrcode: string;
  status: EStatusOrder;
  orderDetailList: Array<OrderDetail>;
  money: number;
  quantity: number;
}
