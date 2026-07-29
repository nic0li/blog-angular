import { CategoryResponse } from './category-response';
import { CommentResponse } from './comment-response';
import { UserViewResponse } from './user-view-response';

export interface PostResponse {

  id: number;
  title: string;
  content: string;
  category: CategoryResponse;
  user: UserViewResponse;
  comments: CommentResponse[];
  createdAt: Date;
  updatedAt: Date;

}
