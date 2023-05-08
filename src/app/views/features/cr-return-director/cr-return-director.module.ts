import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrReturnDirectorComponent } from './cr-return-director.component';
import { CrReturnDirectorRoutingModule } from './cr-return-director-routing.module';
import { CrReturnDirectorEditComponent } from './cr-return-director-edit/cr-return-director-edit.component';
//import { CrReturnEditComponent } from './cr-return-edit/cr-return-edit.component';

@NgModule({
  declarations: [
    CrReturnDirectorComponent,
    CrReturnDirectorEditComponent,
    //CrReturnEditComponent,
  ],
  imports: [
    CommonModule,
    CrReturnDirectorRoutingModule,
    SharedModule
  ]
})
export class CrReturnDirectorModule { }
