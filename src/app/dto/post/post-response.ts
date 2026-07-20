import { CategoryResponse } from "../category/category-response";
import { UserResponse } from "../user/user-response";

export interface PostResponse {

  id: number;
  title: string;
  content: string;
  category: CategoryResponse;
  user: UserResponse;
  createdAt: Date;
  updatedAt: Date;

}
