import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternalContactListAddComponent } from './internal-contact-list-add.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: InternalContactListAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternalContactListAddRoutingModule { }
