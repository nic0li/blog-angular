import { PostResponse } from './post-response';
import { UserProfileResponse } from './user-profile-response';

export interface CommentResponse {

  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserProfileResponse;
  post: PostResponse

}
