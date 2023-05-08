import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleBarComponent } from './page-content/title-bar/title-bar.component';
import { MaterialModule } from '../shared/material/material.module';
import { DialogOutletComponent } from './page-content/dialog/dialog-outlet/dialog-outlet.component';



@NgModule({
  declarations: [
    TitleBarComponent,
    DialogOutletComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    TitleBarComponent,
    DialogOutletComponent
  ]
})
export class ComponentsModule { }
