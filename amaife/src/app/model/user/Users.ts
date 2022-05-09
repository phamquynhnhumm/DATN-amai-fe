import {EGender} from "./EGender";
import {Account} from "./Account";

export interface Users {
  id: number;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  fullName: string;
  birthday: Date;
  email: string;
  phone: string;
  gender: EGender;
  image: string;
  account: Account
}
