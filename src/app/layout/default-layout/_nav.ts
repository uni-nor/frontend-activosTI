import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  //==============================================================
  //inicio menus activos
  //==============================================================
  {
    title: true,
    name: 'ACTIVOS TI'
  },
  {
    name: 'Activos',
    url: '/activosti/activos',
    iconComponent: { name: 'cil-devices' }
  },
  {
    name: 'Titulares',
    url: '/activosti/titulares',
    iconComponent: { name: 'cil-people' }
  },
  
  {
    name: 'Ubicaciones',
    url: '/activosti/ubicaciones',
    iconComponent: { name: 'cil-location-pin' }
  },

  {
    name: 'Seguimientos',
    url: '/activosti/seguimientos',
    iconComponent: { name: 'cil-magnifying-glass' }
  },

  {
    name: 'Reportes',
    url: '/activosti',
    iconComponent: { name: 'cil-spreadsheet' },
    children: [
      {
        name: 'Reporte Activos',
        url: '/activosti/reporte-activos',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Reporte Seguimiento',
        url: '/activosti/reporte-seguimiento',
        icon: 'nav-icon-bullet'
      },
    ]
  },

  //==============================================================
  // fin menu activos
  //==============================================================
  
  {
    name: 'Components',
    title: true
  },
    
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
  {
    title: true,
    name: 'Links',
    class: 'mt-auto'
  },
  {
    name: 'Docs',
    url: 'https://coreui.io/angular/docs/5.x/',
    iconComponent: { name: 'cil-description' },
    attributes: { target: '_blank' }
  }
];
