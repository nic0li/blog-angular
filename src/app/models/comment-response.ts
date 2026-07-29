import { UserViewResponse } from './user-view-response';

export interface CommentResponse {

  id: number;
  content: string;
  user: UserViewResponse;
  createdAt: Date;
  updatedAt: Date;

}
