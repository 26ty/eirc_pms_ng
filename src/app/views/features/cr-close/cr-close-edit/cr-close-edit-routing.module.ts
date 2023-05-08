import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCloseEditComponent } from './cr-close-edit.component';

const routes: Routes = [{ path: '', component: CrCloseEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCloseEditRoutingModule { }
