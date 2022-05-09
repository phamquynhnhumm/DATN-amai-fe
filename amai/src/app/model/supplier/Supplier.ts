import {Material} from "../food/Material";

export interface Supplier {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  name: string;
  email: string;
  address: string;
  phone: string;
  materialList: Array<Material>
}
