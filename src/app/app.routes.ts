import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticationGuard } from './core/guards/authentication.guard';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { adminGuard } from './core/guards/admin.guard';
import { PostComponent } from './pages/post/post.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'home', component: HomeComponent,
    canActivate: [authenticationGuard]
  },

  {
    path: 'categories', component: CategoriesComponent,
    canActivate: [authenticationGuard, adminGuard]
  },

  {
    path: 'post/:id', component: PostComponent,
    canActivate: [authenticationGuard]
  },

  {
    path: 'user/:id', component: UserComponent,
    canActivate: [authenticationGuard]
  },

];
