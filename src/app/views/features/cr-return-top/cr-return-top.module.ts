import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrReturnTopComponent } from './cr-return-top.component';
import { CrReturnTopRoutingModule } from './cr-return-top-routing.module';
import { CrReturnTopEditComponent } from './cr-return-top-edit/cr-return-top-edit.component';
//import { CrReturnEditComponent } from './cr-return-edit/cr-return-edit.component';

@NgModule({
  declarations: [
    CrReturnTopComponent,
    CrReturnTopEditComponent,
    //CrReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrReturnTopRoutingModule,
    SharedModule
  ]
})
export class CrReturnTopModule { }
