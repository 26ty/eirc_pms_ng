import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrTaskAuditEditRoutingModule } from './cr-task-audit-edit-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrTaskAuditEditRoutingModule,
    SharedModule
  ]
})
export class CrTaskAuditEditModule { }

