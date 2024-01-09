import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ViewStatusComponent } from './view-status/view-status.component';

const routes: Routes = [
  {
    path: '',
     component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    
  },

  {
    path: 'view-status',
     component: ViewStatusComponent,
    data: {
      title: 'view-status'
    },
    
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
