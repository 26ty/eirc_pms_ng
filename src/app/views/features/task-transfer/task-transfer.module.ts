import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { TaskTransferRoutingModule } from './task-transfer-routing.module';
import { TaskTransferComponent } from './task-transfer.component';

@NgModule({
  declarations: [
    TaskTransferComponent,
  ],
  imports: [
    CommonModule,
    TaskTransferRoutingModule,
    SharedModule
  ]
})
export class TaskTransferModule { }