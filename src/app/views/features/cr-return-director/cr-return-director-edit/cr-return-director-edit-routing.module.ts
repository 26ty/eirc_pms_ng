import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrReturnDirectorEditComponent } from './cr-return-director-edit.component';

const routes: Routes = [{ path: '', component: CrReturnDirectorEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrReturnDirectorEditRoutingModule { }
