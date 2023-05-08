import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCountersignDirectorComponent } from './cr-countersign-director.component';
import { CrCountersignDirectorRoutingModule } from './cr-countersign-director-routing.module';
import { CrCountersignDirectorEditComponent } from './cr-countersign-director-edit/cr-countersign-director-edit.component';

@NgModule({
  declarations: [
    CrCountersignDirectorComponent,
    CrCountersignDirectorEditComponent,
    //CrReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrCountersignDirectorRoutingModule,
    SharedModule
  ]
})
export class CrCountersignDirectorModule { }

