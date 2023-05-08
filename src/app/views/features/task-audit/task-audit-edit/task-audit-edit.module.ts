import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';

import { TaskAuditEditRoutingModule } from './task-audit-edit-routing.module';

@NgModule({
  declarations: [
    //TaskAuditEditComponent,
  ],
  imports: [
    CommonModule,
    TaskAuditEditRoutingModule,
    SharedModule
  ]
})
export class TaskAuditEditModule {

}

