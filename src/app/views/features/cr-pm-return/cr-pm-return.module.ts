import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrPmReturnComponent } from './cr-pm-return.component';
import { CrPmReturnRoutingModule } from './cr-pm-return-routing.module';
import { SharedModule } from './../../../shared/shared.module';
import { CrPmReturnEditComponent } from './cr-pm-return-edit/cr-pm-return-edit.component';

@NgModule({
  declarations: [
    CrPmReturnComponent,
    CrPmReturnEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CrPmReturnRoutingModule,
  ]
})
export class CrPmReturnModule { }
