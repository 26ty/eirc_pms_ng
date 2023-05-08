import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrCloseDirectorEditRoutingModule } from './cr-close-director-edit-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CrCloseDirectorEditRoutingModule,
    SharedModule,
  ]
})
export class CrCloseDirectorEditModule { }
