import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrCloseTopEditRoutingModule } from './cr-close-top-edit-routing.module';

@NgModule({
  declarations: [
    //WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrCloseTopEditRoutingModule,
    SharedModule
  ]
})
export class CrCloseTopEditModule { }

