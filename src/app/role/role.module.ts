import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { CreateroleComponent } from './createrole/createrole.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CreateroleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    NgbModule,FormsModule,
    NgSelectModule
    
  ]
})
export class RoleModule { }
