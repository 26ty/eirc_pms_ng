import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDateListComponent } from './project-date-list.component';

const routes: Routes = [{ path: '', component:  ProjectDateListComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDateListRoutingModule { }
