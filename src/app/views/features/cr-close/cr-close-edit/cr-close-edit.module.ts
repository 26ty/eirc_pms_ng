import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrCloseEditRoutingModule } from './cr-close-edit-routing.module';

@NgModule({
  declarations: [
    //WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrCloseEditRoutingModule,
    SharedModule
  ]
})
export class CrCloseEditModule { }

