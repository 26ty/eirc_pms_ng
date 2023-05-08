import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';

import { CrCloseInformComponent } from './cr-close-inform.component';
import { CrCloseInformRoutingModule } from './cr-close-inform-routing.module';
import { CrCloseInformEditComponent } from './cr-close-inform-edit/cr-close-inform-edit.component';

@NgModule({
  declarations: [
    CrCloseInformComponent,
    CrCloseInformEditComponent,
  ],
  imports: [
    CommonModule,
    CrCloseInformRoutingModule,
    SharedModule
  ]
})
export class CrCloseInformModule { }
