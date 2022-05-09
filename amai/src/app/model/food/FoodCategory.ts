import {Food} from "./Food";

export interface FoodCategory{
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  name: string;
  foodList: Array<Food>
}
