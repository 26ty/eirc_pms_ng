import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCloseTopComponent } from './cr-close-top.component';
import { CrCloseTopRoutingModule } from './cr-close-top-routing.module';
import { CrCloseTopEditComponent } from './cr-close-top-edit/cr-close-top-edit.component';

@NgModule({
  declarations: [
    CrCloseTopComponent,
    CrCloseTopEditComponent,
  ],
  imports: [
    CommonModule,
    CrCloseTopRoutingModule,
    SharedModule
  ]
})
export class CrCloseTopModule { }
