import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
    data: { title: 'Willkommen' }
  },

  {
    path: 'inventory',
    loadComponent: () =>
      import('./features/inventory/inventory.component').then((m) => m.InventoryComponent),
    data: { title: 'Vorräte verwalten' }
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/error-page/error-page.component').then((m) => m.ErrorPageComponent),
    data: { title: 'Seite nicht gefunden', errorCode: '404', errorMessage: 'Seite nicht gefunden' }
  }
];
