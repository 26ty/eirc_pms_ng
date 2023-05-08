import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalContactListEditComponent } from './internal-contact-list-edit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: InternalContactListEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalContactListEditRoutingModule { }
