import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTemplateEditComponent } from './project-template-edit.component';

const routes: Routes = [{ path:'',component:ProjectTemplateEditComponent}]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectTemplateEditRoutingsModule { }
