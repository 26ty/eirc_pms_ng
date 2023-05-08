import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderSaEditComponent } from './manufacture-order-sa-edit.component';



const routes: Routes = [{ path: '', component:  ManufactureOrderSaEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderSaEditRoutingModule { }
