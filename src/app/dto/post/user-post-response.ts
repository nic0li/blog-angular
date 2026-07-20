import { CategoryResponse } from "../category/category-response";
import { CommentViewResponse } from "../comment/comment-view-response";

export interface UserPostResponse {

  id: number;
  title: string;
  content: string;
  category: CategoryResponse;
  comments: CommentViewResponse[];
  createdAt: Date;
  updatedAt: Date;

}
