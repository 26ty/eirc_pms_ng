
import { HttpApiService } from './api/http-api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import { MY_DATE_FORMATS } from './views/features/project-manager/project-manager-edit/project-manager-edit.component';
//import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './views/error/error.component';
import { LoginComponent } from './views/login/login.component';
import { ProjectManagerRoutingModule } from './views/features/project-manager/project-manager-routing.module';
import { ProjectManagerModule } from './views/features/project-manager/project-manager.module';
import { ProjectManagerEditRoutingModule } from './views/features/project-manager/project-manager-edit/project-manager-edit-routing.module';
import { ProjectManagerEditModule } from './views/features/project-manager/project-manager-edit/project-manager-edit.module';
//import { ProduceSalesMeetingComponent } from './views/features/produce-sales-meeting/produce-sales-meeting.component';
import { ProduceSalesMeetingRoutingModule } from './views/features/produce-sales-meeting/produce-sales-meeting-routing.module';
import { ProduceSalesMeetingModule } from './views/features/produce-sales-meeting/produce-sales-meeting.module';
import { ProduceSalesMeetingEditRoutingModule } from './views/features/produce-sales-meeting/produce-sales-meeting-edit/produce-sales-meeting-edit-routing.module';
import { ProduceSalesMeetingEditModule } from './views/features/produce-sales-meeting/produce-sales-meeting-edit/produce-sales-meeting-edit.module';
import { ManufactureOrderOpenModule } from './views/features/project-manager/manufacture-order-open/manufacture-order-open.module';
import { ManufactureOrderOpenRoutingModule } from './views/features/project-manager/manufacture-order-open/manufacture-order-open-routing.module';
import { ProjectPlanListComponent } from './views/features/project-plan-list/project-plan-list.component';
import { ProjectPlanListModule } from './views/features/project-plan-list/project-plan-list.module';
import { ProjectPlanListRoutingModule } from './views/features/project-plan-list/project-plan-list-routing.module';
import { ProjectTemplateComponent } from './views/features/project-template/project-template.component';
import { ProjectTemplateModule } from './views/features/project-template/project-template.module';
import { ProjectTemplateRoutingModule } from './views/features/project-template/project-template-routing.module';
import { ProjectAuditFormComponent } from './views/features/project-audit-form/project-audit-form.component';
import { ProjectAuditFormModule } from './views/features/project-audit-form/project-audit-form.module';
import { ProjectAuditFormRoutingModule } from './views/features/project-audit-form/project-audit-form-routing.module';
import { ProjectTaskTemplateComponent } from './views/features/project-task-template/project-task-template.component';
import { ProjectTaskTemplateModule } from './views/features/project-task-template/project-task-template.module';
import { ProjectTaskTemplateRoutingModule } from './views/features/project-task-template/project-task-template-routing.module';
import { ProjectRecordBookComponent } from './views/features/project-record-book/project-record-book.component';
import { ProjectRecordBookRoutingModule } from './views/features/project-record-book/project-record-book-routing.module';
import { ProjectRecordBookModule } from './views/features/project-record-book/project-record-book.module';
import { WorktimeDialogComponent } from './views/features/worktime-dialog/worktime-dialog.component';
import { ProjectTemplateEditModule } from './views/features/project-template/project-template-edit/project-template-edit.module';
import { ProjectTemplateEditRoutingsModule } from './views/features/project-template/project-template-edit/project-template-edit-routings.module';
import { ProjectTaskTemplateEditModule } from './views/features/project-task-template/project-task-template-edit/project-task-template-edit.module';
import { ProjectTaskTemplateEditRoutingModule } from './views/features/project-task-template/project-task-template-edit/project-task-template-edit-routing.module';
import { ProjectTemplateAddRoutingModule } from './views/features/project-template/project-template-add/project-template-add-routing.module';
import { ProjectTemplateAddModule } from './views/features/project-template/project-template-add/project-template-add.module';
import { ProjectTaskTemplateAddRoutingModule } from './views/features/project-task-template/project-task-template-add/project-task-template-add-routing.module';
import { ProjectTaskTemplateAddModule } from './views/features/project-task-template/project-task-template-add/project-task-template-add.module';
import { PersonDailyWorkModifyComponent } from './views/features/person-daily-work-modify/person-daily-work-modify.component';
import { VirusCodeListComponent } from './views/features/virus-code-list/virus-code-list.component';
import { VirusCodeListRoutingModule } from './views/features/virus-code-list/virus-code-list-routing.module';
import { VirusCodeListModule } from './views/features/virus-code-list/virus-code-list.module';
import { FixtureScheduleQueryComponent } from './views/features/fixture-schedule-query/fixture-schedule-query.component';
import { FixtureScheduleQueryRoutingModule } from './views/features/fixture-schedule-query/fixture-schedule-query-routing.module';
import { FixtureScheduleQueryModule } from './views/features/fixture-schedule-query/fixture-schedule-query.module';
import { PersonDailyWorkModifyModule } from './views/features/person-daily-work-modify/person-daily-work-modify.module';
import { PersonDailyWorkModifyRoutingModule } from './views/features/person-daily-work-modify/person-daily-work-modify-routing.module';
import { ProjectDateListComponent } from './views/features/project-date-list/project-date-list.component';
import { PersonTodayListComponent } from './views/features/person-today-list/person-today-list.component';
import { ProjectDateListRoutingModule } from './views/features/project-date-list/project-date-list-routing.module';
import { ProjectDateListModule } from './views/features/project-date-list/project-date-list.module';
import { PersonTodayListModule } from './views/features/person-today-list/person-today-list.module';
import { PersonTodayListRoutingModule } from './views/features/person-today-list/person-today-list-routing.module';
import { MyDailyWorksComponent } from './views/features/my-daily-works/my-daily-works.component';
import { MyDailyWorksRoutingModule } from './views/features/my-daily-works/my-daily-works-routing.module';
import { MyDailyWorksModule } from './views/features/my-daily-works/my-daily-works.module';

//import { HelloComponent } from './views/features/produce-sales-meeting/produce-add-appendix-dialog/hello.component';
//import { ProduceAddAppendixDialogModule } from './views/features/produce-sales-meeting/produce-add-appendix-dialog/produce-add-appendix-dialog.module';
import { InternalContactListComponent } from './views/sales/internal-contact-list/internal-contact-list.component';
import { InternalContactListModule } from './views/sales/internal-contact-list/internal-contact-list.module';
import { InternalContactListRoutingModule } from './views/sales/internal-contact-list/internal-contact-list-routing.module';
import { InternalContactListAddModule } from './views/sales/internal-contact-list/internal-contact-list-add/internal-contact-list-add.module';
import { InternalContactListAddRoutingModule } from './views/sales/internal-contact-list/internal-contact-list-add/internal-contact-list-add-routing.module';
import { InternalContactListEditModule } from './views/sales/internal-contact-list/internal-contact-list-edit/internal-contact-list-edit.module';
import { InternalContactListEditRoutingModule } from './views/sales/internal-contact-list/internal-contact-list-edit/internal-contact-list-edit-routing.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { TaskReturnComponent } from './views/features/task-return/task-return.component';
import { TaskReturnRoutingModule } from './views/features/task-return/task-return-routing.module';
import { TaskReturnModule } from './views/features/task-return/task-return.module';
import { PmReturnComponent } from './views/features/pm-return/pm-return.component';
import { PmReturnModule } from './views/features/pm-return/pm-return.module';
import { PmReturnRoutingModule } from './views/features/pm-return/pm-return-routing.module';
import { PmReturnEditRoutingModule } from './views/features/pm-return/pm-return-edit/pm-return-edit-routing.module';
import { PmReturnEditModule } from './views/features/pm-return/pm-return-edit/pm-return-edit.module';
import { PrintComponentComponent } from './views/features/print-component/print-component.component';
import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { MenuItem } from 'primeng/api';

//chart
import { ChartsModule } from 'ng2-charts';
import { GiftApplicationListComponent } from './views/sales/gift-application-list/gift-application-list.component';
import { GiftApplicationListRoutingModule } from './views/sales/gift-application-list/gift-application-list-routing.module';
import { GiftApplicationListModule } from './views/sales/gift-application-list/gift-application-list.module';
import { CrPmReturnComponent } from './views/features/cr-pm-return/cr-pm-return.component';
import { CrPmReturnRoutingModule } from './views/features/cr-pm-return/cr-pm-return-routing.module';
import { CrPmReturnModule } from './views/features/cr-pm-return/cr-pm-return.module';
import { CrPmReturnEditRoutingModule } from './views/features/cr-pm-return/cr-pm-return-edit/cr-pm-return-edit-routing.module';
import { CrPmReturnEditModule } from './views/features/cr-pm-return/cr-pm-return-edit/cr-pm-return-edit.module';
import { TaskReturnEditRoutingModule } from './views/features/task-return/task-return-edit/task-return-edit-routing.module';
import { TaskReturnEditModule } from './views/features/task-return/task-return-edit/task-return-edit.module';
import { PasswordAlertComponent } from './views/login/password-alert/password-alert.component';
import { PmTaskReturnComponent } from './views/features/pm-task-return/pm-task-return.component';
//import { PmTaskReturnModule } from './views/features/pm-task-return/pm-task-return.module';
import { PmTaskReturnRoutingModule } from './views/features/pm-task-return/pm-task-return-routing.module';
import { PmTaskReturnEditRoutingModule } from './views/features/pm-task-return/pm-task-return-edit/pm-task-return-edit-routing.module';
import { PmTaskReturnEditModule } from './views/features/pm-task-return/pm-task-return-edit/pm-task-return-edit.module';

import { MatBadgeModule } from '@angular/material/badge';
import { TaskCheckEditRoutingModule } from './views/features/task-check/task-check-edit/task-check-edit-routing.module';
import { TaskCheckEditModule } from './views/features/task-check/task-check-edit/task-check-edit.module';
import { CrCountersignEditRoutingModule } from './views/features/cr-countersign/cr-countersign-edit/cr-countersign-edit-routing.module';
import { CrCountersignEditModule } from './views/features/cr-countersign/cr-countersign-edit/cr-countersign-edit.module';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CrReturnTopRoutingModule } from './views/features/cr-return-top/cr-return-top-routing.module';
import { CrReturnTopModule } from './views/features/cr-return-top/cr-return-top.module';
import { CrCountersignDirectorEditRoutingModule } from './views/features/cr-countersign-director/cr-countersign-director-edit/cr-countersign-director-edit-routing.module';
import { CrCountersignDirectorEditModule } from './views/features/cr-countersign-director/cr-countersign-director-edit/cr-countersign-director-edit.module';
import { CrReturnDirectorEditRoutingModule } from './views/features/cr-return-director/cr-return-director-edit/cr-return-director-edit-routing.module';
import { CrReturnDirectorEditModule } from './views/features/cr-return-director/cr-return-director-edit/cr-return-director-edit.module';
import { CrReturnTopEditRoutingModule } from './views/features/cr-return-top/cr-return-top-edit/cr-return-top-edit-routing.module';
import { CrReturnTopEditModule } from './views/features/cr-return-top/cr-return-top-edit/cr-return-top-edit.module';
import { ProjectInfomanufactureOrderauditRoutingModule } from './views/features/project-infomanufacture-orderaudit/project-infomanufacture-orderaudit-routing.module';
import { ProjectInfomanufactureOrderauditModule } from './views/features/project-infomanufacture-orderaudit/project-infomanufacture-orderaudit.module';
import { ProjectInfomanufactureOrderauditEditRoutingModule } from './views/features/project-infomanufacture-orderaudit/project-infomanufacture-orderaudit-edit/project-infomanufacture-orderaudit-edit-routing.module';
import { ProjectInfomanufactureOrderauditEditModule } from './views/features/project-infomanufacture-orderaudit/project-infomanufacture-orderaudit-edit/project-infomanufacture-orderaudit-edit.module';
import { ManufactureOrderQcComponent } from './views/features/manufacture-order-qc/manufacture-order-qc.component';
import { ManufactureOrderMgComponent } from './views/features/manufacture-order-mg/manufacture-order-mg.component';
import { ManufactureOrderSaComponent } from './views/features/manufacture-order-sa/manufacture-order-sa.component';
import { ManufactureOrderReComponent } from './views/features/manufacture-order-re/manufacture-order-re.component';
import { ManufactureOrderQcModule } from './views/features/manufacture-order-qc/manufacture-order-qc.module';
import { ManufactureOrderQcRoutingModule } from './views/features/manufacture-order-qc/manufacture-order-qc-routing.module';
import { ManufactureOrderMgModule } from './views/features/manufacture-order-mg/manufacture-order-mg.module';
import { ManufactureOrderMgRoutingModule } from './views/features/manufacture-order-mg/manufacture-order-mg-routing.module';
import { ManufactureOrderSaModule } from './views/features/manufacture-order-sa/manufacture-order-sa.module';
import { ManufactureOrderSaRoutingModule } from './views/features/manufacture-order-sa/manufacture-order-sa-routing.module';
import { ManufactureOrderReModule } from './views/features/manufacture-order-re/manufacture-order-re.module';
import { ManufactureOrderReRoutingModule } from './views/features/manufacture-order-re/manufacture-order-re-routing.module';
import { ManufactureOrderReEditRoutingModule } from './views/features/manufacture-order-re/manufacture-order-re-edit/manufacture-order-re-edit-routing.module';
import { ManufactureOrderReEditModule } from './views/features/manufacture-order-re/manufacture-order-re-edit/manufacture-order-re-edit.module';
import { ManufactureOrderSaEditModule } from './views/features/manufacture-order-sa/manufacture-order-sa-edit/manufacture-order-sa-edit.module';
import { ManufactureOrderSaEditRoutingModule } from './views/features/manufacture-order-sa/manufacture-order-sa-edit/manufacture-order-sa-edit-routing.module';
import { ManufactureOrderMgEditRoutingModule } from './views/features/manufacture-order-mg/manufacture-order-mg-edit/manufacture-order-mg-edit-routing.module';
import { ManufactureOrderMgEditModule } from './views/features/manufacture-order-mg/manufacture-order-mg-edit/manufacture-order-mg-edit.module';
import { ManufactureOrderQcEditModule } from './views/features/manufacture-order-qc/manufacture-order-qc-edit/manufacture-order-qc-edit.module';
import { ManufactureOrderQcEditRoutingModule } from './views/features/manufacture-order-qc/manufacture-order-qc-edit/manufacture-order-qc-edit-routing.module';

//primeng模組
import { PrimengModule } from './shared/primeng/primeng.module';
import { LaborhourDirectAuditComponent } from './views/features/laborhour-direct-audit/laborhour-direct-audit.component';
import { LaborhourDirectAuditRoutingModule } from './views/features/laborhour-direct-audit/laborhour-direct-audit-routing.module';
import { LaborhourDirectAuditModule } from './views/features/laborhour-direct-audit/laborhour-direct-audit.module';
import { LaborhourDirectAuditEditModule } from './views/features/laborhour-direct-audit/laborhour-direct-audit-edit/laborhour-direct-audit-edit.module';
import { LaborhourDirectAuditEditRoutingModule } from './views/features/laborhour-direct-audit/laborhour-direct-audit-edit/laborhour-direct-audit-edit-routing.module';
import { LaborhourReturnComponent } from './views/features/laborhour-return/laborhour-return.component';
import { LaborhourReturnModule } from './views/features/laborhour-return/laborhour-return.module';
import { LaborhourReturnRoutingModule } from './views/features/laborhour-return/laborhour-return-routing.module';
import { LaborhourReturnEditModule } from './views/features/laborhour-return/laborhour-return-edit/laborhour-return-edit.module';
import { LaborhourReturnEditRoutingModule } from './views/features/laborhour-return/laborhour-return-edit/laborhour-return-edit-routing.module';

//NGX
import { NgxGanttModule } from '@worktile/gantt';
import { GanttDialogModule } from './views/features/project-manager/project-manager-edit/gantt-dialog/gantt-dialog.module';
import { ToDoListComponent } from './views/features/to-do-list/to-do-list.component';
import { ToDoListRoutingModule } from './views/features/to-do-list/to-do-list-routing.module';
import { ToDoListModule } from './views/features/to-do-list/to-do-list.module';
const MaModule = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatCardModule,
  MatFormFieldModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatPaginatorModule,
  MatDialogModule,
  MatGridListModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatExpansionModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatRippleModule,
  MatTreeModule,
  CdkTreeModule,
  AccordionModule,
  MatBadgeModule
  //HttpClientInMemoryWebApiModule
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    WorktimeDialogComponent,
    PrintComponentComponent,
    PasswordAlertComponent,
    //ToDoListComponent,
    // LaborhourReturnComponent,
    // LaborhourDirectAuditComponent,
    // ManufactureOrderQcComponent,
    // ManufactureOrderMgComponent,
    // ManufactureOrderSaComponent,
    // ManufactureOrderReComponent,
    //PmTaskReturnComponent,
    //CrPmReturnComponent,
    //GiftApplicationListComponent,
    //PmReturnComponent,
    //TaskReturnComponent,
    //FixtureScheduleQueryComponent,
    //PersonDailyWorkModifyComponent,
    //VirusCodeListComponent,
    //InternalContactListComponent,
    //MyDailyWorksComponent,
    //ProjectDateListComponent,
    //PersonTodayListComponent,
    //PersonDailyWorkModifyComponent,
    //ProjectRecordBookComponent,
    //ProjectTemplateComponent,
    //ProjectTaskTemplateComponent,
    //ProjectAuditFormComponent,
    //ProjectPlanListComponent,
    //ProduceSalesMeetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ProjectManagerRoutingModule,
    ProjectManagerModule,
    ProjectManagerEditRoutingModule,
    ProjectManagerEditModule,
    ProduceSalesMeetingRoutingModule,
    ProduceSalesMeetingModule,
    ProduceSalesMeetingEditRoutingModule,
    ProduceSalesMeetingEditModule,
    ManufactureOrderOpenModule,
    ManufactureOrderOpenRoutingModule,
    MaModule,
    ProjectPlanListModule,
    ProjectPlanListRoutingModule,
    ProjectTemplateModule,
    ProjectTemplateRoutingModule,
    ProjectAuditFormModule,
    ProjectAuditFormRoutingModule,
    ProjectRecordBookRoutingModule,
    ProjectRecordBookModule,
    ProjectTaskTemplateEditModule,
    ProjectTaskTemplateEditRoutingModule,
    ProjectTemplateAddRoutingModule,
    ProjectTemplateAddModule,
    ProjectTaskTemplateAddRoutingModule,
    ProjectTaskTemplateAddModule,
    VirusCodeListRoutingModule,
    VirusCodeListModule,
    FixtureScheduleQueryRoutingModule,
    FixtureScheduleQueryModule,
    PersonDailyWorkModifyModule,
    PersonDailyWorkModifyRoutingModule,
    ProjectDateListRoutingModule,
    ProjectDateListModule,
    PersonTodayListModule,
    PersonTodayListRoutingModule,
    MyDailyWorksRoutingModule,
    MyDailyWorksModule,
    InternalContactListModule,
    InternalContactListRoutingModule,
    InternalContactListAddModule,
    InternalContactListAddRoutingModule,
    InternalContactListEditModule,
    InternalContactListEditRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    TaskReturnRoutingModule,
    TaskReturnModule,
    PmReturnModule,
    PmReturnRoutingModule,
    PmReturnEditRoutingModule,
    PmReturnEditModule,
    ChartsModule,
    GiftApplicationListRoutingModule,
    GiftApplicationListModule,
    TaskReturnEditRoutingModule,
    TaskReturnEditModule,
    PmTaskReturnRoutingModule,
    PmTaskReturnEditRoutingModule,
    PmTaskReturnEditModule,
    TaskCheckEditRoutingModule,
    TaskCheckEditModule,
    CrCountersignEditRoutingModule,
    CrCountersignEditModule,
    CrReturnTopRoutingModule,
    CrReturnTopModule,
    CrCountersignDirectorEditRoutingModule,
    CrCountersignDirectorEditModule,
    CrReturnDirectorEditRoutingModule,
    CrReturnDirectorEditModule,
    CrReturnTopEditRoutingModule,
    CrReturnTopEditModule,
    ProjectInfomanufactureOrderauditRoutingModule,
    ProjectInfomanufactureOrderauditModule,
    ProjectInfomanufactureOrderauditEditRoutingModule,
    ProjectInfomanufactureOrderauditEditModule,
    ManufactureOrderQcModule,
    ManufactureOrderQcRoutingModule,
    ManufactureOrderMgModule,
    ManufactureOrderMgRoutingModule,
    ManufactureOrderSaModule,
    ManufactureOrderSaRoutingModule,
    ManufactureOrderReModule,
    ManufactureOrderReRoutingModule,
    ManufactureOrderReEditRoutingModule,
    ManufactureOrderReEditModule,
    ManufactureOrderSaEditModule,
    ManufactureOrderSaEditRoutingModule,
    ManufactureOrderMgEditRoutingModule,
    ManufactureOrderMgEditModule,
    ManufactureOrderQcEditModule,
    ManufactureOrderQcEditRoutingModule,
    //CrPmReturnRoutingModule,
    //CrPmReturnModule//圖表套件
    // ProjectTemplateEditModule,
    // ProjectTemplateEditRoutingsModule,
    //AngularFireStorageModule
    PrimengModule,
    LaborhourDirectAuditRoutingModule,
    LaborhourDirectAuditModule,
    LaborhourDirectAuditEditModule,
    LaborhourDirectAuditEditRoutingModule,
    LaborhourReturnModule,
    LaborhourReturnRoutingModule,
    LaborhourReturnEditModule,
    LaborhourReturnEditRoutingModule,
    NgxGanttModule,
    GanttDialogModule,
    ToDoListRoutingModule,
    ToDoListModule,
  ],
  providers: [
    DatePipe,
    MatDatepickerModule,
    MatNativeDateModule,

    // {
    //   provide: HTTP_INTERCEPTORS, useClass: HttpApiService, multi: true 
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }