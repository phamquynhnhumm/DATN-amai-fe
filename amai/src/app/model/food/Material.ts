import {Supplier} from "../supplier/Supplier";

export interface Material {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  supplierList: Supplier;
  unit: string;
  quantity: number;
  price: number;
  name: string;
  importKg: number;
  remainingKg: number
}
