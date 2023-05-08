import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { TaskCheckEditRoutingModule } from './task-check-edit-routing.module';
import { TaskCheckEditComponent } from './task-check-edit.component';

@NgModule({
  declarations: [
    TaskCheckEditComponent,
  ],
  imports: [
    CommonModule,
    TaskCheckEditRoutingModule,
    SharedModule
  ]
})
export class TaskCheckEditModule { }

