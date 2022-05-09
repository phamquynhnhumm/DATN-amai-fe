import {Material} from "./Material";
import {Food} from "./Food";

export interface FoodDetail {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  material: Material;
  food: Food;
  kg: number
}
