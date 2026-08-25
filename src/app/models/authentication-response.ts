import { UserResponse } from './user-response';

export interface AuthenticationResponse {

  user: UserResponse;
  token: string;

}
