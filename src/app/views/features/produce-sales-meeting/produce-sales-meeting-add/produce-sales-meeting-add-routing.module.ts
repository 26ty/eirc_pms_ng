import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProduceSalesMeetingAddComponent } from './produce-sales-meeting-add.component';

const routes: Routes = [{ path: '', component: ProduceSalesMeetingAddComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProduceSalesMeetingAddRoutingModule { }
