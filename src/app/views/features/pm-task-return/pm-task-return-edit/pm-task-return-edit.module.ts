import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { PmTaskReturnEditRoutingModule } from './pm-task-return-edit-routing.module';
import { PmTaskReturnEditComponent } from './pm-task-return-edit.component';

@NgModule({
  declarations: [
    PmTaskReturnEditComponent,
  ],
  imports: [
    CommonModule,
    PmTaskReturnEditRoutingModule,
    SharedModule
  ]
})
export class PmTaskReturnEditModule { }
