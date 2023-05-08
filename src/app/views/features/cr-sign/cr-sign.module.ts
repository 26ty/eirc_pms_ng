
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrSignComponent } from './cr-sign.component';
import { CrSignRoutingModule } from './cr-sign-routing.module';
import { CrSignEditComponent } from './cr-sign-edit/cr-sign-edit.component';

@NgModule({
  declarations: [
    CrSignComponent,
    CrSignEditComponent,
  ],
  imports: [
    CommonModule,
    CrSignRoutingModule,
    SharedModule
  ]
})
export class CrSignModule { }
