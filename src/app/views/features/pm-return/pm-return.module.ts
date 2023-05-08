import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { PmReturnComponent } from './pm-return.component';
import { PmReturnRoutingModule } from './pm-return-routing.module';
import { PmReturnEditComponent } from './pm-return-edit/pm-return-edit.component';

@NgModule({
  declarations: [
    PmReturnComponent,
    PmReturnEditComponent
  ],
  imports: [
    CommonModule,
    PmReturnRoutingModule,
    SharedModule
  ]
})
export class PmReturnModule { }
