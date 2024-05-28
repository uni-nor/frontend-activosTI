import { Routes } from '@angular/router';
import { ReporteSeguimientosComponent } from './reporte-seguimientos/reporte-seguimientos.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Activos TI'
    },
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
      },
      {
        path: 'activos',
        loadComponent: () => import('./activo/activo.component').then(m => m.ActivoComponent),
        data: {
          title: 'Listar Activos'
        }
      },
      {
        path: 'titulares',
        loadComponent: () => import('./titular/titular.component').then(m => m.TitularComponent),
        data: {
          title: 'Listar Titulares'
        }
      },
      {
        path: 'ubicaciones',
        loadComponent: () => import('./ubicacion/ubicacion.component').then(m => m.UbicacionComponent),
        data: {
          title: 'Listar Ubicaciones'
        }
      },

      {
        path: 'seguimientos',
        loadComponent: () => import('./seguimiento/seguimiento.component').then(m => m.SeguimientoComponent),
        data: {
          title: 'Listar Seguimientos'
        }
      },
      {
        path: '',
        data: {
          title: 'Reportes'
        },
        children: [
          {
            path: '',
            redirectTo: 'activosti',
            pathMatch: 'full'
          },
          {
            path: 'reporte-activos',
            loadComponent: () => import('./reporte-activos/reporte-activos.component').then(m => m.ReporteActivosComponent),
            data: {
              title: 'Reporte Activos Por titular'
            }
          },
          {
            path: 'reporte-seguimiento',
            loadComponent: () => import('./reporte-seguimientos/reporte-seguimientos.component').then(m => m.ReporteSeguimientosComponent),
            data: {
              title: 'Reporte Seguimiento Activos'
            }
          }
        ]
      }
      
    ]
  }
];

