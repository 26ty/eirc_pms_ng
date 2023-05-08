import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { PmTaskReturnComponent } from './pm-task-return.component';
import { PmTaskReturnRoutingModule } from './pm-task-return-routing.module';

@NgModule({
  declarations: [
    PmTaskReturnComponent,
    //PmTaskReturnEditComponent,
    //PmReturnEditComponent
  ],
  imports: [
    CommonModule,
    PmTaskReturnRoutingModule,
    SharedModule
  ]
})
export class PmTaskReturnModule { }
