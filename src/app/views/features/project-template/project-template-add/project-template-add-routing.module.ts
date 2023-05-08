import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProjectTemplateAddComponent } from './project-template-add.component';

const routes: Routes = [{ path:'',component:ProjectTemplateAddComponent}]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProjectTemplateAddRoutingModule { }
