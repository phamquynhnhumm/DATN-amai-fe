import {Food} from "./Food";
import {Account} from "../user/Account";

export interface FoodCategory{
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  name: string;
  foodList: Array<Food>
}
