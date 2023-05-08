
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCountersignDirectorConfirmComponent } from './cr-countersign-director-confirm.component';
import { CrCountersignDirectorConfirmRoutingModule } from './cr-countersign-director-confirm-routing.module';
import { CrCountersignDirectorConfirmEditComponent } from './cr-countersign-director-confirm-edit/cr-countersign-director-confirm-edit.component';

@NgModule({
  declarations: [
    CrCountersignDirectorConfirmComponent,
    CrCountersignDirectorConfirmEditComponent,
  ],
  imports: [
    CommonModule,
    CrCountersignDirectorConfirmRoutingModule,
    SharedModule
  ]
})
export class CrCountersignDirectorConfirmModule { }

