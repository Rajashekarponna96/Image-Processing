import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EndpointsComponent } from './endpoints.component';
import { UpdateEndpointsComponent } from './update-endpoints/update-endpoints.component';
import { AddEndPointComponent } from './add-end-point/add-end-point.component';

const routes: Routes = [

  {
    path: '',
     component: EndpointsComponent,
    data: {
      title: 'End Points'
    },
    
  },
  {
    path: 'update-endpoints',
     component: UpdateEndpointsComponent,
    data: {
      title: 'update-endpoints'
    },
    
  },
  {
    path: 'add-end-points',
     component: AddEndPointComponent,
    data: {
      title: 'add-end-points'
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EndpointsRoutingModule { }
