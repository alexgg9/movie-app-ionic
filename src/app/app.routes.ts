import { Routes } from '@angular/router';
import { MovieProfilePage } from './pages/movie-profile/movie-profile.page';
import { LoginPage } from './pages/login/login.page';
import { LogincallbackPage } from './pages/logincallback/logincallback.page';



export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'login/callback',
    component: LogincallbackPage,
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'movie-profile/:id', 
    component: MovieProfilePage,
  },
];
