import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureOrderOpenRoutingModule } from './manufacture-order-open-routing.module';
import { SharedModule } from './../../../../shared/shared.module';


@NgModule({
  declarations: [

    //ManufactureOrderOpenComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManufactureOrderOpenRoutingModule
  ]
})
export class ManufactureOrderOpenModule { }
