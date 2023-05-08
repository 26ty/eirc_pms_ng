import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDailyWorkModifyComponent } from './person-daily-work-modify.component';

const routes: Routes = [{ path: '', component: PersonDailyWorkModifyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonDailyWorkModifyRoutingModule { }
