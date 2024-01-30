import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadmaizeRoutingModule } from './uploadmaize-routing.module';
import { UploadmaizeComponent } from './uploadmaize.component';

@NgModule({
  declarations: [UploadmaizeComponent],
  imports: [
    CommonModule,
    UploadmaizeRoutingModule
  ]
})
export class UploadmaizeModule { }
