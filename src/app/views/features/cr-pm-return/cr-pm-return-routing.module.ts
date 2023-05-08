import { NgModule } from '@angular/core';
import { CrPmReturnComponent } from './cr-pm-return.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: CrPmReturnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrPmReturnRoutingModule { }
