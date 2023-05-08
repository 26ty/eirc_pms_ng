import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCloseComponent } from './cr-close.component';
import { CrCloseRoutingModule } from './cr-close-routing.module';
import { CrCloseEditComponent } from './cr-close-edit/cr-close-edit.component';

@NgModule({
  declarations: [
    CrCloseComponent,
    CrCloseEditComponent,
  ],
  imports: [
    CommonModule,
    CrCloseRoutingModule,
    SharedModule
  ]
})
export class CrCloseModule { }
