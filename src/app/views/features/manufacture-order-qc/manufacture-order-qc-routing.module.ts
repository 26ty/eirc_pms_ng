import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderQcComponent } from './manufacture-order-qc.component';


const routes: Routes = [{ path: '', component:  ManufactureOrderQcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderQcRoutingModule { }
