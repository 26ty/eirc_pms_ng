import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManufactureOrderMgComponent } from './manufacture-order-mg.component';


const routes: Routes = [{ path: '', component:  ManufactureOrderMgComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManufactureOrderMgRoutingModule { }
