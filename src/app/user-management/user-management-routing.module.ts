import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddUserManagementComponent } from './add-user-management/add-user-management.component';
import { UserManagementForDashboardComponent } from './user-management-for-dashboard/user-management-for-dashboard.component';



const routes: Routes = [
  
  {
    path: '',
     component: UserManagementComponent,
    data: {
      title: 'User Management'
    },
    
  },
  {
    path: 'update-user',
     component: UpdateUserComponent,
    data: {
      title: 'update-user'
    },
    
  },
  {
    path: 'add-user-management',
     component: AddUserManagementComponent,
    data: {
      title: 'add-user-management'
    },
    
  },
  {
    path: 'user-management-for-dashboard',
     component: UserManagementForDashboardComponent,
    data: {
      title: 'user-management-for-dashboard'
    },
    
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

export const routedComponents = [UserManagementComponent];
