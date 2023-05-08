import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrSignManagerComponent } from './cr-sign-manager.component';
import { CrSignManagerRoutingModule } from './cr-sign-manager-routing.module';
import { CrSignManagerEditComponent } from './cr-sign-manager-edit/cr-sign-manager-edit.component';
//import { CrSignEditComponent } from './cr-sign-edit/cr-sign-edit.component';

@NgModule({
  declarations: [
    CrSignManagerComponent,
    CrSignManagerEditComponent,
    //CrSignEditComponent,
  ],
  imports: [
    CommonModule,
    CrSignManagerRoutingModule,
    SharedModule
  ]
})
export class CrSignManagerModule { }
