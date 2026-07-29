import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { authorizationGuard } from './core/guards/authorization.guard';
import { PostComponent } from './pages/post/post.component';
import { unauthenticatedGuard } from './core/guards/unauthenticated.guard';
import { rootRedirectGuard } from './core/guards/root-redirect.guard';
import { MainComponent } from './layout/main/main.component';

export const routes: Routes = [

  {
    path: '', redirectTo: '', pathMatch: 'full',
    canActivate: [rootRedirectGuard]
  },

  {
    path: 'login', component: LoginComponent, 
    canActivate: [unauthenticatedGuard]
  },

  {
    path: 'register', component: RegisterComponent,
    canActivate: [unauthenticatedGuard]
  },

  {
    path: '',
    component: MainComponent,
    canActivate: [authenticatedGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },

      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [authorizationGuard]
      },

      {
        path: 'post/:id',
        component: PostComponent
      },

      {
        path: 'user/:id',
        component: UserComponent
      }
    ]
  }

];
