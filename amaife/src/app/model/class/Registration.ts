import {Account} from "../user/Account";
import {EStatuasHandle} from "./EStatuasHandle";

export interface Registration {
  id: number;
  createAt: Date;
  updatedBy: Account;
  updateAt: Date;
  isDeleted: boolean;
  name: string;
  phone: string;
  content: number;
  handle: EStatuasHandle
}
