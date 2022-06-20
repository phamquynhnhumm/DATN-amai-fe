import {Account} from "../user/Account";

export interface Shop {
  id: number;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  address: string;
  nameShop: string;
  phone: string;
  slogen: string;
  nameTransfer: string;
  bankName: string;
  number: number;
  facebook: string;
  youtube: string;
  content: string;
  instagram: string;
  logo: string;
  email: string;
}
