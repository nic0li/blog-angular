import { CategoryResponse } from "../category/category-response";
import { CommentViewResponse } from "../comment/comment-view-response";
import { UserViewResponse } from "../user/user-view-response";

export interface PostViewResponse {

  id: number;
  title: string;
  content: string;
  category: CategoryResponse;
  user: UserViewResponse;
  comments: CommentViewResponse[];
  createdAt: Date;
  updatedAt: Date;

}
