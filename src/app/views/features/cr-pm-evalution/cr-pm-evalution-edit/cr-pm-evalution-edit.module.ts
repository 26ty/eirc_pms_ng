import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrPmEvalutionEditRoutingModule } from './cr-pm-evalution-edit-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CrPmEvalutionEditRoutingModule,
    SharedModule,
  ]
})
export class CrPmEvalutionEditModule { }
