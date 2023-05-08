import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirusCodeListComponent } from './virus-code-list.component';
import { VirusCodeListRoutingModule } from './virus-code-list-routing.module';
import { SharedModule } from './../../../shared/shared.module';


@NgModule({
  declarations: [
    VirusCodeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VirusCodeListRoutingModule
  ]
})
export class VirusCodeListModule { }
