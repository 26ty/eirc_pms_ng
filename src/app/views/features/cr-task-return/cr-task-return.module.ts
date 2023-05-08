import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrTaskReturnComponent } from './cr-task-return.component';
import { CrTaskReturnRoutingModule } from './cr-task-return-routing.module';
import { CrTaskReturnEditComponent } from './cr-task-return-edit/cr-task-return-edit.component';

@NgModule({
  declarations: [
    CrTaskReturnComponent,
    CrTaskReturnEditComponent,
    //CrTaskReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrTaskReturnRoutingModule,
    SharedModule
  ]
})
export class CrTaskReturnModule { }
