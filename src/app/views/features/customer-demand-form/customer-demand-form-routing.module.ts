import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDemandFormComponent } from './customer-demand-form.component';

const routes: Routes = [{ path: '', component: CustomerDemandFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerDemandFormRoutingModule { }

