import {EStatusFood} from "./EStatusFood";
import {OrderDetail} from "../order/OrderDetail";
import {FoodCategory} from "./FoodCategory";
import {FoodDetail} from "./FoodDetail";
import {Account} from "../user/Account";
import {Cart} from "../order/Cart";

export interface Food {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  name: string;
  unit: string;
  price: number;
  image: string;
  content: string;
  status: EStatusFood;
  foodCategory: FoodCategory;
  cartList: Array<Cart>;
  orderDetailList: Array<OrderDetail>;
  foodDetailList: Array<FoodDetail>
}
