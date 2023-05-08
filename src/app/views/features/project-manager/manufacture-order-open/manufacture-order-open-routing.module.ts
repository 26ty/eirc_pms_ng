import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManufactureOrderOpenComponent } from './manufacture-order-open.component';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [{ path:'',component: ManufactureOrderOpenComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ManufactureOrderOpenRoutingModule { }
