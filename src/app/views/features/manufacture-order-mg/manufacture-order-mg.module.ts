import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManufactureOrderMgComponent } from './manufacture-order-mg.component';
import { ManufactureOrderMgRoutingModule } from './manufacture-order-mg-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManufactureOrderMgEditComponent } from './manufacture-order-mg-edit/manufacture-order-mg-edit.component';

@NgModule({
  declarations: [
    ManufactureOrderMgComponent,
    ManufactureOrderMgEditComponent
  ],
  imports: [
    CommonModule,
    ManufactureOrderMgRoutingModule,
    SharedModule
  ]
})
export class ManufactureOrderMgModule { }
