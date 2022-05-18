import {Oder} from "./Oder";
import {Food} from "../food/Food";
import {Account} from "../user/Account";

export interface OrderDetail {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  orders: Oder;
  quantity: number;
  food: Food;
}
