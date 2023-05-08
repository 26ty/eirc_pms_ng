import { ProjectAuditFormComponent } from './project-audit-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ProjectAuditFormComponent }];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProjectAuditFormRoutingModule { }
