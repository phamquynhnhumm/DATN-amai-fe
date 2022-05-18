import {ERole} from "./ERole";
import {Oder} from "../order/Oder";
import {Users} from "./Users";

export interface Account {
  userName : string;
  createdBy: String;
  createAt: Date;
  updatedBy: String;
  updateAt: Date;
  isDeleted: boolean;
  role: ERole;
  password: string;
  ordersList: Array<Oder>;
  user: Users;
}
