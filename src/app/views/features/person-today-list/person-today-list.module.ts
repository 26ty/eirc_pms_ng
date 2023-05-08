import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonTodayListRoutingModule } from './person-today-list-routing.module';
import { PersonTodayListComponent } from './person-today-list.component';
import { SharedModule } from './../../../shared/shared.module';

@NgModule({
  declarations: [
    PersonTodayListComponent
  ],
  imports: [
    CommonModule,
    PersonTodayListRoutingModule,
    SharedModule
  ]
})
export class PersonTodayListModule { }
