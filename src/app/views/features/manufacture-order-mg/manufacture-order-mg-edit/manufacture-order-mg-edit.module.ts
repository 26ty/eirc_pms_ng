import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufactureOrderMgEditComponent } from './manufacture-order-mg-edit.component';
import { ManufactureOrderMgEditRoutingModule } from './manufacture-order-mg-edit-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    //ManufactureOrderMgEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderMgEditRoutingModule,
    SharedModule
  ]
})
export class ManufactureOrderMgEditModule { }
