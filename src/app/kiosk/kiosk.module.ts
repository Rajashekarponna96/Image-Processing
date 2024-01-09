import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KioskRoutingModule } from './kiosk-routing.module';
import { CreatekioskComponent } from './createkiosk/createkiosk.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CreatekioskComponent],
  imports: [
    CommonModule,
    KioskRoutingModule,
    NgbModule,
    FormsModule,
    NgSelectModule
  ]
})
export class KioskModule { }
