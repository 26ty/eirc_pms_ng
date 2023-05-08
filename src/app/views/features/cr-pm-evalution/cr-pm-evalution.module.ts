import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrPmEvalutionComponent } from './cr-pm-evalution.component';
import { CrPmEvalutionRoutingModule } from './cr-pm-evalution-routing.module';
import { CrPmEvalutionEditComponent } from './cr-pm-evalution-edit/cr-pm-evalution-edit.component';

@NgModule({
  declarations: [
    CrPmEvalutionComponent,
    CrPmEvalutionEditComponent,
  ],
  imports: [
    CommonModule,
    CrPmEvalutionRoutingModule,
    SharedModule
  ]
})
export class CrPmEvalutionModule { }

