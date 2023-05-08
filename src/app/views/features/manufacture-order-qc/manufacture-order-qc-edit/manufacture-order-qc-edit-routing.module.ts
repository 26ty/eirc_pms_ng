import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderQcEditComponent } from './manufacture-order-qc-edit.component';

const routes: Routes = [{ path: '', component:  ManufactureOrderQcEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderQcEditRoutingModule { }
