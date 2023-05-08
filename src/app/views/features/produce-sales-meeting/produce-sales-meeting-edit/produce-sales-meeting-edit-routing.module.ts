import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduceSalesMeetingEditComponent } from './produce-sales-meeting-edit.component';

const routes: Routes = [{ path: '', component: ProduceSalesMeetingEditComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProduceSalesMeetingEditRoutingModule { }
