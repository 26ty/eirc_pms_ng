import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDemandFormRoutingModule } from './customer-demand-form-routing.module';
import { CustomerDemandFormComponent } from './customer-demand-form.component';
import { SharedModule } from './../../../shared/shared.module';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { DoingDialogComponent } from './doing-dialog/doing-dialog.component'
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component'

@NgModule({
  declarations: [
    CustomerDemandFormComponent,
    DetailDialogComponent,
    DoingDialogComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule, //sidenav
    CustomerDemandFormRoutingModule,
  ]
})
export class CustomerDemandFormModule { }

