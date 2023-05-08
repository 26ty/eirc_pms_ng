import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrSignDirectorComponent } from './cr-sign-director.component';
import { CrSignDirectorRoutingModule } from './cr-sign-director-routing.module';
import { CrSignDirectorEditComponent } from './cr-sign-director-edit/cr-sign-director-edit.component';

@NgModule({
  declarations: [
    CrSignDirectorComponent,
    CrSignDirectorEditComponent,
  ],
  imports: [
    CommonModule,
    CrSignDirectorRoutingModule,
    SharedModule
  ]
})
export class CrSignDirectorModule { }


