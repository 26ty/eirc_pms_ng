import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureOrderSaEditRoutingModule } from './manufacture-order-sa-edit-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    //ManufactureOrderMgEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderSaEditRoutingModule,
    SharedModule
  ]
})
export class ManufactureOrderSaEditModule { }
