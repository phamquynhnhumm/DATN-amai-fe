import {Supplier} from "../supplier/Supplier";
import {Account} from "../user/Account";

export interface Material {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  supplierList: Supplier;
  quantity: number;
  price: number;
  name: string;
}
