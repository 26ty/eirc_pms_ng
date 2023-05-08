
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrTaskReturnEditComponent } from './cr-task-return-edit.component';

const routes: Routes = [{ path: '', component: CrTaskReturnEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrTaskReturnEditRoutingModule { }

