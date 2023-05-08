import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCloseDirectorComponent } from './cr-close-director.component';
import { CrCloseDirectorRoutingModule } from './cr-close-director-routing.module';
import { CrCloseDirectorEditComponent } from './cr-close-director-edit/cr-close-director-edit.component';

@NgModule({
  declarations: [
    CrCloseDirectorComponent,
    CrCloseDirectorEditComponent,
  ],
  imports: [
    CommonModule,
    CrCloseDirectorRoutingModule,
    SharedModule
  ]
})
export class CrCloseDirectorModule { }
