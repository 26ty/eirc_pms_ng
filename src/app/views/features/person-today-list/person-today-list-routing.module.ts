import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PersonTodayListComponent } from './person-today-list.component';

const routes: Routes = [{ path: '', component:  PersonTodayListComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonTodayListRoutingModule { }
