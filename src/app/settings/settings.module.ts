import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { MyProfileComponent } from './my-profile/my-profile.component';


@NgModule({
  declarations: [ChangePasswordComponent, MyProfileComponent],
  imports: [
    CommonModule,FormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
