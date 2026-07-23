import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { UserEditComponent } from './pages/user/edit/user-edit.component';
import { PostComponent } from './pages/post/post.component';
import { PostFormComponent } from './pages/post/form/post-form.component';
import { CategoryComponent } from './pages/category/category.component';

export const routes: Routes = [

{path: '', redirectTo: 'login', pathMatch: 'full'},

{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'home', component: HomeComponent, canActivate: [authGuard]},

{path: 'users/:id', component: UserComponent, canActivate: [authGuard]},
{path: 'users/:id/edit', component: UserEditComponent, canActivate: [authGuard]},

{path: 'posts/:id', component: PostComponent, canActivate: [authGuard]},
{path: 'posts/:id/edit', component: PostFormComponent, canActivate: [authGuard]},

{path: 'categories', component: CategoryComponent, canActivate: [authGuard]}

];
