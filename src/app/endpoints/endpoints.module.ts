import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule } from '@angular/forms';
import { EndpointsRoutingModule } from './endpoints-routing.module';
import { EndpointsComponent } from './endpoints.component';
import { UpdateEndpointsComponent } from './update-endpoints/update-endpoints.component';
import { AddEndPointComponent } from './add-end-point/add-end-point.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [EndpointsComponent, UpdateEndpointsComponent, AddEndPointComponent],
  imports: [
    CommonModule,
    EndpointsRoutingModule,
    NgbModule,
    FormsModule,
    Ng2SmartTableModule,
    NgxSpinnerModule
  ]
})
export class EndpointsModule { }
