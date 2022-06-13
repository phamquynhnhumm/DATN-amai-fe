import {Account} from "../user/Account";

export interface Chat {
  id: number;
  createdBy: Account;
  createAt: Date;
  updatedBy: string;
  updateAt: Date;
  isDeleted: boolean;
  msg: string;
  msgchatbot: string;
}
