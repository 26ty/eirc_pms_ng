import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { TaskCheckComponent } from './task-check.component';
import { TaskCheckRoutingModule } from './task-check-routing.module';

@NgModule({
  declarations: [
    TaskCheckComponent,
  ],
  imports: [
    CommonModule,
    TaskCheckRoutingModule,
    SharedModule
  ]
})
export class TaskCheckModule { }
