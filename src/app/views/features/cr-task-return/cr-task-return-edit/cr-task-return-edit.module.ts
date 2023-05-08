import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrTaskReturnEditRoutingModule } from './cr-task-return-edit-routing.module';
import { WorkSubmitDialogComponent } from './work-submit-dialog/work-submit-dialog.component';


@NgModule({
  declarations: [
    WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrTaskReturnEditRoutingModule,
    SharedModule,

  ]
})
export class CrTaskReturnEditModule { }

