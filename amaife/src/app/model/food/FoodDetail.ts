import {Material} from "./Material";
import {Food} from "./Food";
import {Account} from "../user/Account";

export interface FoodDetail {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  material: Material;
  food: Food;
  kg: number
}
