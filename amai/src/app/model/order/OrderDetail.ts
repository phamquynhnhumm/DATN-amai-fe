import {Oder} from "./Oder";
import {Food} from "../food/Food";

export interface OrderDetail {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  orders: Oder;
  quantity: number;
  food: Food;
}
