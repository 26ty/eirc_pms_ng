
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { PmAuditEditRoutingModule } from './pm-audit-edit-routing.module';

@NgModule({
  declarations: [
    //PmReturnEditComponent

    //ReturnRecordDialogComponent
  ],
  imports: [
    CommonModule,
    PmAuditEditRoutingModule,
    SharedModule
  ]
})
export class PmAuditEditModule { }
