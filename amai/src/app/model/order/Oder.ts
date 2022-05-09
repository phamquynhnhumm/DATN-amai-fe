import {Account} from "../user/Account";
import {EStatusOrder} from "./EStatusOrder";
import {OrderDetail} from "./OrderDetail";

export interface Oder {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  account: Account;
  address: string;
  phone: string;
  fullName: string;
  qrcode: string;
  status: EStatusOrder;
  orderDetailList: Array<OrderDetail>;
  meney: number;
  quantity: number;
}
