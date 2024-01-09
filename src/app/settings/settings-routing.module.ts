import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'ChangePassword'
        }
      },
      
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'my-profile',
        component: MyProfileComponent,
        data: {
          title: 'My Profile'
        }
      },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
