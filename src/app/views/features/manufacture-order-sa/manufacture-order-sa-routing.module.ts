import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderSaComponent } from './manufacture-order-sa.component';


const routes: Routes = [{ path: '', component:  ManufactureOrderSaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManufactureOrderSaRoutingModule { }
