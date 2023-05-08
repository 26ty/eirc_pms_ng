import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { LaborhourReturnEditComponent } from './laborhour-return-edit.component';
import { LaborhourReturnEditRoutingModule } from './laborhour-return-edit-routing.module';

@NgModule({
  declarations: [
    LaborhourReturnEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LaborhourReturnEditRoutingModule
  ]
})
export class LaborhourReturnEditModule { }
