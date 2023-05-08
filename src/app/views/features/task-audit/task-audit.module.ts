import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { TaskAuditComponent } from './task-audit.component';
import { TaskAuditRoutingModule } from './task-audit-routing.module';
import { TaskAuditEditComponent } from './task-audit-edit/task-audit-edit.component';

@NgModule({
  declarations: [
    TaskAuditComponent,
    TaskAuditEditComponent,
    //TaskAuditEditComponent
  ],
  imports: [
    CommonModule,
    TaskAuditRoutingModule,
    SharedModule
  ]
})
export class TaskAuditModule { }

