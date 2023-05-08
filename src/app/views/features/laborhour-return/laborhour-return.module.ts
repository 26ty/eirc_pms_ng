import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../shared/shared.module';
import { LaborhourReturnComponent } from './laborhour-return.component';
import { LaborhourReturnRoutingModule } from './laborhour-return-routing.module';
import { LaborhourReturnEditComponent } from './laborhour-return-edit/laborhour-return-edit.component';
@NgModule({
  declarations: [
    LaborhourReturnComponent,
    //LaborhourReturnEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaborhourReturnRoutingModule
  ]
})
export class LaborhourReturnModule { }
