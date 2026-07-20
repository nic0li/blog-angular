import { UserViewResponse } from "../user/user-view-response";
import { UserPostResponse } from "./user-post-response";

export interface UserPostsResponse {

    user: UserViewResponse,
    posts: UserPostResponse[]

}