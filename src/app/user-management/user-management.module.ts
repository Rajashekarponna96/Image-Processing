import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import{UserManagementComponent} from'./user-management.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AddUserManagementComponent } from './add-user-management/add-user-management.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [UserManagementComponent, UpdateUserComponent, AddUserManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NgbModule,
    Ng2SmartTableModule,
    FormsModule,
    NgxSpinnerModule

  ],
  
})
export class UserManagementModule { }
