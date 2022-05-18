import {AccountLoginDTO} from "./AccountLoginDTO";

export interface UserRequest {
  id: number;
  fullName: string;
  account: AccountLoginDTO;
  email: string
}
