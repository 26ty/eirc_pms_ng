import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrFollowWorkComponent } from './cr-follow-work.component';

const routes: Routes = [{ path: '', component: CrFollowWorkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrFollowWorkRoutingModule { }

