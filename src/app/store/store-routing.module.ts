import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignstoreComponent } from './assignstore/assignstore.component';
import { CreatestoreComponent } from './createstore/createstore.component';

const routes: Routes = [
  {
    path: 'createstore',
     component: CreatestoreComponent,
    data: {
      title: 'Store Management'
    },
    
  },
  {
    path: 'assignstore',
     component: AssignstoreComponent,
    data: {
      title: 'Assign Store'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
