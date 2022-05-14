import {EStatusFood} from "./EStatusFood";
import {OrderDetail} from "../order/OrderDetail";
import {FoodCategory} from "./FoodCategory";
import {FoodDetail} from "./FoodDetail";

export interface Food {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  name: string;
  unit: string;
  price: number;
  image: string;
  quanity: number;
  status: EStatusFood;
  foodCategory: FoodCategory;
  orderDetailList: Array<OrderDetail>;
  foodDetailList: Array<FoodDetail>
}
