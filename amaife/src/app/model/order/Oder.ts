import {Account} from "../user/Account";
import {EStatusOrder} from "./EStatusOrder";
import {OrderDetail} from "./OrderDetail";
import {EPayments} from "./EPayments";

export interface Oder {
  id: number;
  account: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  address: string;
  phone: string;
  fullName: string;
  qrcode: string;
  status: EStatusOrder;
  orderDetailList: Array<OrderDetail>;
  money: number;
  quantity: number;
  payments: EPayments;
}
