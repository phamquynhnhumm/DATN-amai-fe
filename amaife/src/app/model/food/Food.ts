import {EStatusFood} from "./EStatusFood";
import {OrderDetail} from "../order/OrderDetail";

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
  describe: string;
  quanity: number;
  status: EStatusFood;
  orderDetailList: Array<OrderDetail>;
}
