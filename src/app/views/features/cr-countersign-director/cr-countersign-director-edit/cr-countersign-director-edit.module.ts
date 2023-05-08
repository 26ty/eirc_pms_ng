import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrCountersignDirectorEditRoutingModule } from './cr-countersign-director-edit-routing.module';
import { WorkSubmitDialogComponent } from '../../cr-countersign-director/cr-countersign-director-edit/work-submit-dialog/work-submit-dialog.component';

@NgModule({
  declarations: [
    WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrCountersignDirectorEditRoutingModule,
    SharedModule,
  ]
})
export class CrCountersignDirectorEditModule { }
