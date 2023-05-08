import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TooltipModule} from 'primeng/tooltip';
//NGX
import { NgxGanttModule } from '@worktile/gantt';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxGanttModule,
    TooltipModule
  ]
})
export class GanttDialogModule { }
