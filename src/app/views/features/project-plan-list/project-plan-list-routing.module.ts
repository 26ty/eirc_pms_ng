import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectPlanListComponent } from './project-plan-list.component'


const routes : Routes = [{ path: '', component: ProjectPlanListComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectPlanListRoutingModule { }
