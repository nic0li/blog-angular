import { CategoryResponse } from './category-response';
import { CommentResponse } from './comment-response';
import { UserProfileResponse } from './user-profile-response';

export interface PostResponse {

  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryResponse;
  user: UserProfileResponse;
  comments: CommentResponse[];

}
