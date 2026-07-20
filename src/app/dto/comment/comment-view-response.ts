import { UserViewResponse } from "../user/user-view-response";

export interface CommentViewResponse {

  id: number;
  content: string;
  user: UserViewResponse;
  createdAt: Date;
  updatedAt: Date;

}
