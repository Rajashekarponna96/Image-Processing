import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatekioskComponent } from './createkiosk/createkiosk.component';

const routes: Routes = [
  {
    path: 'createkiosk',
     component: CreatekioskComponent,
    data: {
      title: 'Kiosk Management'
    },
    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KioskRoutingModule { }
