import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCloseTopEditComponent } from './cr-close-top-edit.component';

const routes: Routes = [{ path: '', component: CrCloseTopEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCloseTopEditRoutingModule { }
