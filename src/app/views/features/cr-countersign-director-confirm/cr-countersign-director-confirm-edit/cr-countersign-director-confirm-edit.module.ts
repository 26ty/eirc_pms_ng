import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrCountersignDirectorConfirmEditRoutingModule } from './cr-countersign-director-confirm-edit-routing.module';
import { WorkSubmitDialogComponent } from '../../cr-countersign-director-confirm/cr-countersign-director-confirm-edit/work-submit-dialog/work-submit-dialog.component';


@NgModule({
  declarations: [
    WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrCountersignDirectorConfirmEditRoutingModule,
    SharedModule,
  ]
})
export class CrCountersignDirectorConfirmEditModule { }
