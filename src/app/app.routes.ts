import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { adminGuard } from './guards/admin.guard';
import { PostViewComponent } from './pages/post/view/post-view.component';

export const routes: Routes = [

{path: '', redirectTo: 'login', pathMatch: 'full'},

{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},

{path: 'home', component: HomeComponent, 
  canActivate: [authGuard]},

{path: 'categories', component: CategoryComponent, 
  canActivate: [authGuard, adminGuard]},

{path: 'posts/:id', component: PostViewComponent, 
  canActivate: [authGuard]},

{path: 'users/:id', component: UserComponent, 
  canActivate: [authGuard]},
  
];
