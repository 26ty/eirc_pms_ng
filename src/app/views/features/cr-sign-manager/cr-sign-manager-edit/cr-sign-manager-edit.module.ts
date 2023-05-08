import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrSignManagerEditRoutingModule } from './cr-sign-manager-edit-routing.module';

@NgModule({
  declarations: [
    //WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrSignManagerEditRoutingModule,
    SharedModule
  ]
})
export class CrSignManagerEditModule { }

