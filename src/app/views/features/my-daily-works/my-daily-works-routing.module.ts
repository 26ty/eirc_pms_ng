import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyDailyWorksComponent } from './my-daily-works.component';

const routes: Routes = [{ path: '', component:  MyDailyWorksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyDailyWorksRoutingModule { }
