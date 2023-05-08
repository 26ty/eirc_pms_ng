import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { CrSignEditRoutingModule } from './cr-sign-edit-routing.module';
//import { WorkSubmitDialogComponent } from '../../cr-sign-director/cr-sign-director-edit/work-submit-dialog/work-submit-dialog.component';

@NgModule({
  declarations: [
    //WorkSubmitDialogComponent
  ],
  imports: [
    CommonModule,
    CrSignEditRoutingModule,
    SharedModule
  ]
})
export class CrSignEditModule { }

