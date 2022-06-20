import {UserRequest} from "./UserRequest";

export interface LoginResponse {
  jwt: string;
  user: UserRequest;
  status: string;
}
