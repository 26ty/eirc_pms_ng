import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduceSalesMeetingComponent } from './produce-sales-meeting.component';

const routes: Routes = [{ path: '', component: ProduceSalesMeetingComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduceSalesMeetingRoutingModule { }
