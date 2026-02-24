import { Routes } from '@angular/router';
import { postExistsGuard } from './guards/post-exists.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'posts/:id',
    canActivate: [postExistsGuard],
    loadComponent: () => import('./pages/posts/posts').then((m) => m.Posts),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
