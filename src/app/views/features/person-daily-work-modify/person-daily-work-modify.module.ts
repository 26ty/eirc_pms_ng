import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonDailyWorkModifyRoutingModule } from './person-daily-work-modify-routing.module';
import { PersonDailyWorkModifyComponent } from './person-daily-work-modify.component';
import { SharedModule } from './../../../shared/shared.module';


@NgModule({
  declarations: [
    PersonDailyWorkModifyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PersonDailyWorkModifyRoutingModule
  ]
})
export class PersonDailyWorkModifyModule { }
