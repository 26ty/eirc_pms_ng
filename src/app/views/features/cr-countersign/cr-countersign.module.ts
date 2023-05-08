import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCountersignComponent } from './cr-countersign.component';
import { CrCountersignRoutingModule } from './cr-countersign-routing.module';
import { CrCountersignEditComponent } from './cr-countersign-edit/cr-countersign-edit.component';
//import { CrReturnEditComponent } from './cr-countersign-edit/cr-countersign-edit.component';

@NgModule({
  declarations: [
    CrCountersignComponent,
    CrCountersignEditComponent,
    //CrReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrCountersignRoutingModule,
    SharedModule
  ]
})
export class CrCountersignModule { }
