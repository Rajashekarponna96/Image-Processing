import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ViewStatusComponent } from './view-status/view-status.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DashboardComponent, ViewStatusComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxSpinnerModule
  ]
})
export class DashboardModule { }
