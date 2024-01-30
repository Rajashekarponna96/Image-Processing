import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadmaizeComponent } from './uploadmaize.component';

const routes: Routes = [
  {
    path: '',
     component: UploadmaizeComponent,
    data: {
      title: 'Upload Maize'
    },
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadmaizeRoutingModule { }
