import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrSignDirectorEditRoutingModule } from './cr-sign-director-edit-routing.module';

@NgModule({
  declarations: [
    //WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrSignDirectorEditRoutingModule,
    SharedModule
  ]
})
export class CrSignDirectorEditModule { }

