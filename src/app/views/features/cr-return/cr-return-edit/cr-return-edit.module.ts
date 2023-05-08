import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrReturnEditRoutingModule } from './cr-return-edit-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CrReturnEditRoutingModule,
    SharedModule,
  ]
})
export class CrReturnEditModule { }
