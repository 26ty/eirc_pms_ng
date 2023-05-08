import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrSignDirectorEditComponent } from './cr-sign-director-edit.component';

const routes: Routes = [{ path: '', component: CrSignDirectorEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrSignDirectorEditRoutingModule { }
