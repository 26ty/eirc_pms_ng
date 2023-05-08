import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrReturnTopEditComponent } from './cr-return-top-edit.component';

const routes: Routes = [{ path: '', component: CrReturnTopEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrReturnTopEditRoutingModule { }
