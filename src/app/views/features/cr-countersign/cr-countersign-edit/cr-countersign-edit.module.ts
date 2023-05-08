import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrCountersignEditRoutingModule } from './cr-countersign-edit-routing.module';
import { WorkSubmitDialogComponent } from '../../cr-countersign/cr-countersign-edit/work-submit-dialog/work-submit-dialog.component';

@NgModule({
  declarations: [
    WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrCountersignEditRoutingModule,
    SharedModule
  ]
})
export class CrCountersignEditModule { }
