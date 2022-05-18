import {Material} from "../food/Material";
import {Account} from "../user/Account";

export interface Supplier {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  name: string;
  email: string;
  address: string;
  phone: string;
  materialList: Array<Material>
}
