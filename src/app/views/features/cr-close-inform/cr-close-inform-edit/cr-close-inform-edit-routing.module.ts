import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrCloseInformEditComponent } from './cr-close-inform-edit.component';

const routes: Routes = [{ path: '', component: CrCloseInformEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrCloseInformEditRoutingModule { }
