import { UserResponse } from '../user/user-response';

export interface CommentResponse {

  id: number;
  content: string;
  user: UserResponse;
  createdAt: Date;
  updatedAt: Date;

}
