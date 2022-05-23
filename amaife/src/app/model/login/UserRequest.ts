import {AccountLoginDTO} from "./AccountLoginDTO";

export interface UserRequest {
  id: string;
  fullName: string;
  account: AccountLoginDTO;
  email: string
}
