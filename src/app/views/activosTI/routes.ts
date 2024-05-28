import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
    //   {
    //     path: '',
    //     redirectTo: 'cards',
    //     pathMatch: 'full'
    //   },
      {
        path: 'listar',
        loadComponent: () => import('../activosTI/activo/activo.component').then(m => m.ActivoComponent),
        data: {
          title: 'Activos'
        }
      },
    //   {
    //     path: 'breadcrumbs',
    //     loadComponent: () => import('./breadcrumbs/breadcrumbs.component').then(m => m.BreadcrumbsComponent),
    //     data: {
    //       title: 'Breadcrumbs'
    //     }
    //   },
      
    ]
  }
];


