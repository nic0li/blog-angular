import { UserRole } from '../shared/enums/user-role.enum';

export interface UserResponse {

  id: number;
  name: string;
  email: string;
  photo: string;
  bio: string;
  role: UserRole;

}
