import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrReturnComponent } from './cr-return.component';
import { CrReturnRoutingModule } from './cr-return-routing.module';
import { CrReturnEditComponent } from './cr-return-edit/cr-return-edit.component';

@NgModule({
  declarations: [
    CrReturnComponent,
    CrReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrReturnRoutingModule,
    SharedModule
  ]
})
export class CrReturnModule { }
