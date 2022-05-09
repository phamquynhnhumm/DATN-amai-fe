import {ERole} from "./ERole";
import {Oder} from "../order/Oder";
import {Users} from "./Users";

export interface Account {
  userName : string;
  createdBy: Date;
  createAt: string;
  updatedBy: Date;
  updateAt: string;
  isDeleted: boolean;
  role: ERole;
  password: string;
  ordersList: Array<Oder>;
  user: Users;
}
