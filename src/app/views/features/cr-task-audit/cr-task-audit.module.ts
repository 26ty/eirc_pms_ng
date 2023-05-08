import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrTaskAuditComponent } from './cr-task-audit.component';
import { CrTaskAuditRoutingModule } from './cr-task-audit-routing.module';
import { CrTaskAuditEditComponent } from './cr-task-audit-edit/cr-task-audit-edit.component';
//import { CrTaskAuditEditComponent } from './cr-task-audit-edit/cr-task-audit-edit.component';

@NgModule({
  declarations: [
    CrTaskAuditComponent,
    CrTaskAuditEditComponent,
    //CrTaskReturnEditComponent,
    //CrTaskReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrTaskAuditRoutingModule,
    SharedModule
  ]
})
export class CrTaskAuditModule { }
