import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { TaskReturnRoutingModule } from './task-return-routing.module';
import { TaskReturnComponent } from './task-return.component';
import { LaborhourSubmitDialogComponent } from './laborhour-submit-dialog/laborhour-submit-dialog.component'
@NgModule({
  declarations: [
    TaskReturnComponent,
    LaborhourSubmitDialogComponent,
    //TaskReturnEditComponent
  ],
  imports: [
    CommonModule,
    TaskReturnRoutingModule,
    SharedModule
  ]
})
export class TaskReturnModule { }
