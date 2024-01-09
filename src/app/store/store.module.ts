import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreRoutingModule } from './store-routing.module';
import { CreatestoreComponent } from './createstore/createstore.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AssignstoreComponent } from './assignstore/assignstore.component';

@NgModule({
  declarations: [CreatestoreComponent, AssignstoreComponent],
  imports: [
    CommonModule,
    StoreRoutingModule,
    NgbModule,FormsModule,
    NgSelectModule
  ]
})
export class StoreModule { }
