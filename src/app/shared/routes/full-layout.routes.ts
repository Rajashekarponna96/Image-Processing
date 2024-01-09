import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  
 
 
  {
    path: 'settings',
    loadChildren: () => import('../../settings/settings.module').then(m => m.SettingsModule)
  },
  
  
  {
    path: 'user-management',
    loadChildren: () => import('../../user-management/user-management.module').then(m => m.UserManagementModule)
  },

  {
    path: 'role',
    loadChildren: () => import('../../role/role.module').then(m => m.RoleModule)
  },

  {
    path: 'store',
    loadChildren: () => import('../../store/store.module').then(m => m.StoreModule)
  },

  {
    path: 'kiosk',
    loadChildren: () => import('../../kiosk/kiosk.module').then(m => m.KioskModule)
  },
  
  
  
];
