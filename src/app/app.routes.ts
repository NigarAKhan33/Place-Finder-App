import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'loader',
    pathMatch: 'full',
  },
  {
    path: 'loader',
    loadComponent: () => import('./pages/loader/loader.page').then((m) => m.LoaderPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'search-place',
    loadComponent: () => import('./pages/search-place/search-place.page').then(m => m.SearchPlacePage)
  },
  {
    path: 'map-directions',
    loadComponent: () => import('./pages/map-directions/map-directions.page').then(m => m.MapDirectionsPage)
  },
];
