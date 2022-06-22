import {EGender} from "./EGender";
import {Account} from "./Account";

export interface Users {
  id: string;
  createdBy: Account;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  fullName: string;
  birthday: Date;
  email: string;
  phone: string;
  gender: EGender;
  image: string;
  account: Account;
  address: string;
}
