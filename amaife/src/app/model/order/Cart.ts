import {Account} from "../user/Account";
import {EStatusCart} from "./EStatusCart";
import {Food} from "../food/Food";

export interface Cart {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  status: EStatusCart;
  food: Food;
  money: number;
  quantity: number;
}
