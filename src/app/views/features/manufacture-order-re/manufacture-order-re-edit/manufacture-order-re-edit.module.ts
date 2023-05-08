import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufactureOrderReEditRoutingModule } from './manufacture-order-re-edit-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    //ManufactureOrderMgEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderReEditRoutingModule,
    SharedModule
  ]
})
export class ManufactureOrderReEditModule { }
