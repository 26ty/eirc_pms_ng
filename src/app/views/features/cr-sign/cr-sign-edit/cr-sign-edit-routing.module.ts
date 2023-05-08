import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CrSignEditComponent } from './cr-sign-edit.component';

const routes: Routes = [{ path: '', component: CrSignEditComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrSignEditRoutingModule { }
