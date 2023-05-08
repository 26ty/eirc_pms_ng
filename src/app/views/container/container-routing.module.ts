import { PersonDailyWorkModifyModule } from './../features/person-daily-work-modify/person-daily-work-modify.module';
//import { ManufactureOderOpenModule } from './../features/project-manager/manufacture-order-open/manufacture-oder-open.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../shared/guard/auth.guard';
import { ContainerComponent } from './container.component';

const routes: Routes = [
  //main後面若為空直接導向dashboard
  { path: '', redirectTo: '/main/dashboard', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ContainerComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../features/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: '首頁' }
      },
      {
        path: 'table',
        loadChildren: () => import('../features/table/table.module').then(m => m.TableModule),
        data: { breadcrumb: '表格範本' }
      },
      {
        path: 'form',
        loadChildren: () => import('../features/form/form.module').then(m => m.FormModule),
        data: { breadcrumb: 'form範本' }
      },
      {
        path: '',
        children: [
          {
            path: 'internal-contact-list',
            loadChildren: () => import('../sales/internal-contact-list/internal-contact-list.module').then(m => m.InternalContactListModule),
            data: { breadcrumb: '專案管理作業' }
          },
          {
            path: 'internal-contact-list-add',
            loadChildren: () => import('../sales/internal-contact-list/internal-contact-list-add/internal-contact-list-add.module').then(m => m.InternalContactListAddModule),
            data: { breadcrumb: '專案管理作業' }
          },
          {
            path: 'internal-contact-list-edit',
            loadChildren: () => import('../sales/internal-contact-list/internal-contact-list-edit/internal-contact-list-edit.module').then(m => m.InternalContactListEditModule),
            data: { breadcrumb: '專案管理作業' }
          },
          {
            path: 'gift-application-list',
            loadChildren: () => import('../sales/gift-application-list/gift-application-list.module').then(m => m.GiftApplicationListModule),
            data: { breadcrumb: '專案管理作業' }
          }
        ]
      },
      {
        path: 'project-A',
        data: { breadcrumb: '客需單管理' },
        children: [
          {
            path: 'project-request',
            loadChildren: () => import('../features/customer-demand-form/customer-demand-form.module').then(m => m.CustomerDemandFormModule),
            data: { breadcrumb: '客需單申請作業' },
          },
          {
            path: 'project-request-task-schedule-query',
            loadChildren: () => import('../features/cr-follow-work/cr-follow-work.module').then(m => m.CrFollowWorkModule),
            data: { breadcrumb: '客需單事項追蹤作業' },
          },
          {
            path: 'project-request-add',
            loadChildren: () => import('../features/customer-demand-form/add/add.module').then(m => m.AddModule)
          },
          {
            path: 'project-request-edit/:c_id',
            loadChildren: () => import('../features/customer-demand-form/project-request-edit/project-request-edit.module').then(m => m.ProjectRequestEditModule),
            data: { breadcrumb: '客需單申請作業/編輯作業' }
          },
        ]
      },
      {
        path: 'projectinfo',
        data: { breadcrumb: '專案計劃管理' },
        children: [
          {
            path: 'project-manager',
            loadChildren: () => import('../features/project-manager/project-manager.module').then(m => m.ProjectManagerModule),
            data: { breadcrumb: '專案管理作業' }
          },
          {
            path: 'project-manager-edit/:p_id',
            loadChildren: () => import('../features/project-manager/project-manager-edit/project-manager-edit.module').then(m => m.ProjectManagerEditModule),
            data: { breadcrumb: '專案管理/編輯作業' }
          },
          {
            path: 'produce-sales-meeting',
            loadChildren: () => import('../features/produce-sales-meeting/produce-sales-meeting.module').then(m => m.ProduceSalesMeetingModule),
            data: { breadcrumb: '專案產銷會議' }
          },
          {
            path: 'produce-sales-meeting-add',
            loadChildren: () => import('../features/produce-sales-meeting/produce-sales-meeting-add/produce-sales-meeting-add.module').then(m => m.ProduceSalesMeetingAddModule)
          },
          {
            path: 'produce-sales-meeting-edit/:p_id',
            loadChildren: () => import('../features/produce-sales-meeting/produce-sales-meeting-edit/produce-sales-meeting-edit.module').then(m => m.ProduceSalesMeetingEditModule),
            data: { breadcrumb: '專案產銷/編輯作業' }
          },
          {
            path: 'manufacture-order-open',
            loadChildren: () => import('../features/project-manager/manufacture-order-open/manufacture-order-open.module').then(m => m.ManufactureOrderOpenModule),
            data: { breadcrumb: '製令開啟通知' }
          },
          {
            path: 'project-plan-list',
            loadChildren: () => import('../features/project-plan-list/project-plan-list.module').then(m => m.ProjectPlanListModule),
            data: { breadcrumb: '專案計劃瀏覽' }
          },
          {
            path: 'project-template',
            loadChildren: () => import('../features/project-template/project-template.module').then(m => m.ProjectTemplateModule),
            data: { breadcrumb: '專案範本管理' }
          },
          {
            path: 'project-template-edit/:pt_id',
            loadChildren: () => import('../features/project-template/project-template-edit/project-template-edit.module').then(m => m.ProjectTemplateEditModule),
            data: { breadcrumb: '專案範本/編輯作業' }
          },
          {
            path: 'project-template-add',
            loadChildren: () => import('../features/project-template/project-template-add/project-template-add.module').then(m => m.ProjectTemplateAddModule),
            data: { breadcrumb: '專案範本/建立作業' }
          },
          {
            path: 'project-audit-form',
            loadChildren: () => import('../features/project-audit-form/project-audit-form.module').then(m => m.ProjectAuditFormModule),
            data: { breadcrumb: '專案授權書' }
          },
          {
            path: 'project-task-template',
            loadChildren: () => import('../features/project-task-template/project-task-template.module').then(m => m.ProjectTaskTemplateModule),
            data: { breadcrumb: '任務延伸範本管理' }
          },
          {
            path: 'project-task-template-edit',
            loadChildren: () => import('../features/project-task-template/project-task-template-edit/project-task-template-edit.module').then(m => m.ProjectTaskTemplateEditModule),
            data: { breadcrumb: '任務延伸範本/編輯作業' }
          },
          {
            path: 'project-task-template-add',
            loadChildren: () => import('../features/project-task-template/project-task-template-add/project-task-template-add.module').then(m => m.ProjectTaskTemplateAddModule),
            data: { breadcrumb: '任務延伸範本/建立作業' }
          },
          {
            path: 'cr-follow-work',
            loadChildren: () => import('../features/cr-follow-work/cr-follow-work.module').then(m => m.CrFollowWorkModule)
          },
          {
            path: 'project-record-book',
            loadChildren: () => import('../features/project-record-book/project-record-book.module').then(m => m.ProjectRecordBookModule),
            data: { breadcrumb: '專案紀錄簿' }
          }
        ]
      },
      {
        path: 'project-C',
        data: { breadcrumb: '製造資訊管理' },
        children: [
          {
            path: 'project-info-manufacture-order-list',
            loadChildren: () => import('../features/project-info-manufacture-order-list/project-info-manufacture-order-list.module').then(m => m.ProjectInfoManufactureOrderListModule),
            data: { breadcrumb: '製令開啟通知作業' }
          },
          {
            path: 'project-info-manufacture-order-query',
            loadChildren: () => import('../features/project-info-manufacture-order-query/project-info-manufacture-order-query.module').then(m => m.ProjectInfoManufactureOrderQueryModule),
            data: { breadcrumb: '製造命令資料查詢' }
          },
          {
            path: 'project-info-manufacture-order-list-add',
            loadChildren: () => import('../features/project-info-manufacture-order-list/project-info-manufacture-order-list-add/project-info-manufacture-order-list-add.module').then(m => m.ProjectInfoManufactureOrderListAddModule),
            data: { breadcrumb: '製令開啟通知作業/新增' }
          },
          {
            path: 'project-info-manufacture-order-list-add/:p_id',
            loadChildren: () => import('../features/project-info-manufacture-order-list/project-info-manufacture-order-list-add/project-info-manufacture-order-list-add.module').then(m => m.ProjectInfoManufactureOrderListAddModule),
            data: { breadcrumb: '製令開啟通知作業/新增' }
          },
          {
            path: 'project-info-manufacture-order-list-edit/:m_id',
            loadChildren: () => import('../features/project-info-manufacture-order-list/project-info-manufacture-order-list-edit/project-info-manufacture-order-list-edit.module').then(m => m.ProjectInfoManufactureOrderListEditModule),
            data: { breadcrumb: '製令開啟通知作業/編輯作業' }
          },
        ]
      },
      {
        path: 'card', loadChildren: () => import('../features/card/card.module').then(m => m.CardModule)
      },
      {
        path: 'virus-code-list', loadChildren: () => import('../features/virus-code-list/virus-code-list.module').then(m => m.VirusCodeListModule)
      },
      {
        path: 'project-info-task-all-query', loadChildren: () => import('../features/project-info-task-all-query/project-info-task-all-query.module').then(m => m.ProjectInfoTaskAllQueryModule)
      },
      {
        path: 'fixture-schedule-query', loadChildren: () => import('../features/fixture-schedule-query/fixture-schedule-query.module').then(m => m.FixtureScheduleQueryModule)
      },
      {
        path: 'customer-demand-form', loadChildren: () => import('../features/customer-demand-form/customer-demand-form.module').then(m => m.CustomerDemandFormModule)
      },
      {
        path: 'person-daily-work-modify', loadChildren: () => import('../features/person-daily-work-modify/person-daily-work-modify.module').then(m => m.PersonDailyWorkModifyModule)
      },
      {
        path: 'project-meeting-calendar', loadChildren: () => import('../features/project-meeting-calendar/project-meeting-calendar.module').then(m => m.ProjectMeetingCalendarModule)
      },
      {
        path: 'project-date-list', loadChildren: () => import('../features/project-date-list/project-date-list.module').then(m => m.ProjectDateListModule)
      },
      {
        path: 'person-today-list', loadChildren: () => import('../features/person-today-list/person-today-list.module').then(m => m.PersonTodayListModule)
      },
      {
        path: 'my-daily-works', loadChildren: () => import('../features/my-daily-works/my-daily-works.module').then(m => m.MyDailyWorksModule)
      },
      {
        path: 'task-transfer', loadChildren: () => import('../features/task-transfer/task-transfer.module').then(m => m.TaskTransferModule)
      },
      {
        path: 'task-return',
        loadChildren: () => import('../features/task-return/task-return.module').then(m => m.TaskReturnModule),
        data: { breadcrumb: '專案任務工作' }
      },
      {
        path: 'task-return-edit/:documents_id/:t_id/:tu_id/:bonita_task_id',
        loadChildren: () => import('../features/task-return/task-return-edit/task-return-edit.module').then(m => m.TaskReturnEditModule),
        data: { breadcrumb: '專案任務工作回報' }
      },
      {
        path: 'laborhour-return',
        loadChildren: () => import('../features/laborhour-return/laborhour-return.module').then(m => m.LaborhourReturnModule),
        data: { breadcrumb: '已提報工時異動' }
      },
      {
        path: 'laborhour-return-edit/:bonita_case_id',
        loadChildren: () => import('../features/laborhour-return/laborhour-return-edit/laborhour-return-edit.module').then(m => m.LaborhourReturnEditModule),
        data: { breadcrumb: '已提報工時異動編輯' }
      },
      {
        path: 'laborhour-direct-audit',
        loadChildren: () => import('../features/laborhour-direct-audit/laborhour-direct-audit.module').then(m => m.LaborhourDirectAuditModule),
        data: { breadcrumb: '工時異動審核' }
      },
      {
        path: 'laborhour-direct-audit-edit/:hm_id/:bonita_task_id',
        loadChildren: () => import('../features/laborhour-direct-audit/laborhour-direct-audit-edit/laborhour-direct-audit-edit.module').then(m => m.LaborhourDirectAuditEditModule),
        data: { breadcrumb: '工時異動審核編輯' }
      },
      {
        path: 'pm-return',
        loadChildren: () => import('../features/pm-return/pm-return.module').then(m => m.PmReturnModule),
        data: { breadcrumb: 'PM任務工作回報' }
      },
      {
        path: 'pm-task-return',
        loadChildren: () => import('../features/pm-task-return/pm-task-return.module').then(m => m.PmTaskReturnModule),
        data: { breadcrumb: 'PM會簽任務回報' }
      },
      {
        path: 'pm-task-return-edit/:documents_id/:t_id/:tu_id/:bonita_task_id',
        loadChildren: () => import('../features/pm-task-return/pm-task-return-edit/pm-task-return-edit.module').then(m => m.PmTaskReturnEditModule),
        data: { breadcrumb: 'PM任務工作回報' }
      },
      {
        path: 'pm-audit',
        loadChildren: () => import('../features/pm-audit/pm-audit.module').then(m => m.PmAuditModule),
        data: { breadcrumb: '待專案PM完工審核' }
      },
      {
        path: 'pm-audit-edit/:p_id/:bonita_task_id',
        loadChildren: () => import('../features/pm-audit/pm-audit-edit/pm-audit-edit.module').then(m => m.PmAuditEditModule),
        data: { breadcrumb: '待專案PM完工審核' }
      },
      {
        path: 'task-check',
        loadChildren: () => import('../features/task-check/task-check.module').then(m => m.TaskCheckModule),
        data: { breadcrumb: '專案任務會簽' }
      },
      {
        path: 'task-check-edit/:documents_id/:t_id/:tu_id/:bonita_task_id',
        loadChildren: () => import('../features/task-check/task-check-edit/task-check-edit.module').then(m => m.TaskCheckEditModule),
        data: { breadcrumb: '專案任務會簽' }
      },
      {
        path: 'task-audit-edit/:documents_id/:t_id/:tu_id/:bonita_task_id',
        loadChildren: () => import('../features/task-audit/task-audit-edit/task-audit-edit.module').then(m => m.TaskAuditEditModule),
        data: { breadcrumb: '待專案PM完工審核(修改)' }
      },
      {
        path: 'task-audit',
        loadChildren: () => import('../features/task-audit/task-audit.module').then(m => m.TaskAuditModule),
        data: { breadcrumb: '專案任務完工審核' }
      },
      {
        path: 'cr-pm-return',
        loadChildren: () => import('../features/cr-pm-return/cr-pm-return.module').then(m => m.CrPmReturnModule),
        data: { breadcrumb: '客戶需求單作業(PM)' }
      },
      {
        path: 'cr-pm-return-edit/:c_id',
        loadChildren: () => import('../features/cr-pm-return/cr-pm-return-edit/cr-pm-return-edit.module').then(m => m.CrPmReturnEditModule),
        data: { breadcrumb: 'PM任務工作回報' }
      },
      {
        path: 'pm-return-edit/:p_id/:bonita_task_id',
        loadChildren: () => import('../features/pm-return/pm-return-edit/pm-return-edit.module').then(m => m.PmReturnEditModule),
        data: { breadcrumb: 'PM任務工作回報' }
      },
      {
        path: 'to-do-list',
        loadChildren: () => import('../features/to-do-list/to-do-list.module').then(m => m.ToDoListModule),
        data: { breadcrumb: '個人待辦事項' }
      },
      {
        path: 'cr-return',
        loadChildren: () => import('../features/cr-return/cr-return.module').then(m => m.CrReturnModule),
        data: { breadcrumb: '客需單待審核A1' }
      },
      {
        path: 'cr-return-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-return/cr-return-edit/cr-return-edit.module').then(m => m.CrReturnEditModule),
        data: { breadcrumb: '客需單待審核A1' }
      },
      {
        path: 'cr-return-director',
        loadChildren: () => import('../features/cr-return-director/cr-return-director.module').then(m => m.CrReturnDirectorModule),
        data: { breadcrumb: '客需單待審核A2' }
      },
      {
        path: 'cr-return-director-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-return-director/cr-return-director-edit/cr-return-director-edit.module').then(m => m.CrReturnDirectorEditModule),
        data: { breadcrumb: '客需單待審核A2' }
      },
      {
        path: 'cr-return-top',
        loadChildren: () => import('../features/cr-return-top/cr-return-top.module').then(m => m.CrReturnTopModule),
        data: { breadcrumb: '客需單待審核A3' }
      },
      {
        path: 'cr-return-top-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-return-top/cr-return-top-edit/cr-return-top-edit.module').then(m => m.CrReturnTopEditModule),
        data: { breadcrumb: '客需單待審核A3' }
      },
      {
        path: 'cr-countersign-director',
        loadChildren: () => import('../features/cr-countersign-director/cr-countersign-director.module').then(m => m.CrCountersignDirectorModule),
        data: { breadcrumb: '客需單待審核C' }
      },
      {
        path: 'cr-countersign-director-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-countersign-director/cr-countersign-director-edit/cr-countersign-director-edit.module').then(m => m.CrCountersignDirectorEditModule),
        data: { breadcrumb: '客需單待審核C' }
      },
      {
        path: 'cr-countersign',
        loadChildren: () => import('../features/cr-countersign/cr-countersign.module').then(m => m.CrCountersignModule),
        data: { breadcrumb: '客需單待審核D' }
      },
      {
        path: 'cr-countersign-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-countersign/cr-countersign-edit/cr-countersign-edit.module').then(m => m.CrCountersignEditModule),
        data: { breadcrumb: '客需單待審核D' }
      },
      {
        path: 'cr-countersign-director-confirm',
        loadChildren: () => import('../features/cr-countersign-director-confirm/cr-countersign-director-confirm.module').then(m => m.CrCountersignDirectorConfirmModule),
        data: { breadcrumb: '客需單待審核E' }
      },
      {
        path: 'cr-countersign-director-confirm-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-countersign-director-confirm/cr-countersign-director-confirm-edit/cr-countersign-director-confirm-edit.module').then(m => m.CrCountersignDirectorConfirmEditModule),
        data: { breadcrumb: '客需單待審核E' }
      },
      {
        path: 'cr-pm-evalution',
        loadChildren: () => import('../features/cr-pm-evalution/cr-pm-evalution.module').then(m => m.CrPmEvalutionModule),
        data: { breadcrumb: '客需單待審核F' }
      },
      {
        path: 'cr-pm-evalution-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-pm-evalution/cr-pm-evalution-edit/cr-pm-evalution-edit.module').then(m => m.CrPmEvalutionEditModule),
        data: { breadcrumb: '客需單待審核F' }
      },
      {
        path: 'cr-sign',
        loadChildren: () => import('../features/cr-sign/cr-sign.module').then(m => m.CrSignModule),
        data: { breadcrumb: '客需單待審核G' }
      },
      {
        path: 'cr-sign-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-sign/cr-sign-edit/cr-sign-edit.module').then(m => m.CrSignEditModule),
        data: { breadcrumb: '客需單待審核G' }
      },
      {
        path: 'cr-sign-manager',
        loadChildren: () => import('../features/cr-sign-manager/cr-sign-manager.module').then(m => m.CrSignManagerModule),
        data: { breadcrumb: '客需單待審核H' }
      },
      {
        path: 'cr-sign-manager-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-sign-manager/cr-sign-manager-edit/cr-sign-manager-edit.module').then(m => m.CrSignManagerEditModule),
        data: { breadcrumb: '客需單待審核H' }
      },
      {
        path: 'cr-sign-director',
        loadChildren: () => import('../features/cr-sign-director/cr-sign-director.module').then(m => m.CrSignDirectorModule),
        data: { breadcrumb: '客需單待審核I' }
      },
      {
        path: 'cr-sign-director-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-sign-director/cr-sign-director-edit/cr-sign-director-edit.module').then(m => m.CrSignDirectorEditModule),
        data: { breadcrumb: '客需單待審核I' }
      },
      {
        path: 'cr-close',
        loadChildren: () => import('../features/cr-close/cr-close.module').then(m => m.CrCloseModule),
        data: { breadcrumb: '客需單待審核J' }
      },
      {
        path: 'cr-close-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-close/cr-close-edit/cr-close-edit.module').then(m => m.CrCloseEditModule),
        data: { breadcrumb: '客需單待審核J' }
      },
      {
        path: 'cr-close-director',
        loadChildren: () => import('../features/cr-close-director/cr-close-director.module').then(m => m.CrCloseDirectorModule),
        data: { breadcrumb: '客需單待審核K' }
      },
      {
        path: 'cr-close-director-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-close-director/cr-close-director-edit/cr-close-director-edit.module').then(m => m.CrCloseDirectorEditModule),
        data: { breadcrumb: '客需單待審核K' }
      },
      {
        path: 'cr-close-top',
        loadChildren: () => import('../features/cr-close-top/cr-close-top.module').then(m => m.CrCloseTopModule),
        data: { breadcrumb: '客需單待審核L' }
      },
      {
        path: 'cr-close-top-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-close-top/cr-close-top-edit/cr-close-top-edit.module').then(m => m.CrCloseTopEditModule),
        data: { breadcrumb: '客需單待審核L' }
      },
      {
        path: 'cr-close-inform',
        loadChildren: () => import('../features/cr-close-inform/cr-close-inform.module').then(m => m.CrCloseInformModule),
        data: { breadcrumb: '待回報客需單制令處理M' }
      },
      {
        path: 'cr-close-inform-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-close-inform/cr-close-inform-edit/cr-close-inform-edit.module').then(m => m.CrCloseInformEditModule),
        data: { breadcrumb: '待回報客需單制令處理M' }
      },
      {
        path: 'cr-close-manufacture',
        loadChildren: () => import('../features/cr-close-manufacture/cr-close-manufacture.module').then(m => m.CrCloseManufactureModule),
        data: { breadcrumb: '客需單待結案製令M' }
      },
      {
        path: 'cr-close-manufacture-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-close-manufacture/cr-close-manufacture-edit/cr-close-manufacture-edit.module').then(m => m.CrCloseManufactureEditModule),
        data: { breadcrumb: '客需單待結案製令M' }
      },
      {
        path: 'cr-close-prodution',
        loadChildren: () => import('../features/cr-close-prodution/cr-close-prodution.module').then(m => m.CrCloseProdutionModule),
        data: { breadcrumb: '客需單待結案製令M' }
      },
      {
        path: 'cr-close-prodution-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-close-prodution/cr-close-prodution-edit/cr-close-prodution-edit.module').then(m => m.CrCloseProdutionEditModule),
        data: { breadcrumb: '客需單待結案製令M' }
      },
      {
        path: 'cr-task-return',
        loadChildren: () => import('../features/cr-task-return/cr-task-return.module').then(m => m.CrTaskReturnModule),
        data: { breadcrumb: '待回報客需單任務' }
      },
      {
        path: 'cr-task-return-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-task-return/cr-task-return-edit/cr-task-return-edit.module').then(m => m.CrTaskReturnEditModule),
        data: { breadcrumb: '待回報客需單任務' }
      },
      {
        path: 'cr-task-audit',
        loadChildren: () => import('../features/cr-task-audit/cr-task-audit.module').then(m => m.CrTaskAuditModule),
        data: { breadcrumb: '待回報客需單任務' }
      },
      {
        path: 'cr-task-audit-edit/:cd_id/:bonita_task_id',
        loadChildren: () => import('../features/cr-task-audit/cr-task-audit-edit/cr-task-audit-edit.module').then(m => m.CrTaskAuditEditModule),
        data: { breadcrumb: '待回報客需單任務' }
      },
      {
        path: 'manufacture-order-qc',
        loadChildren: () => import('../features/manufacture-order-qc/manufacture-order-qc.module').then(m => m.ManufactureOrderQcModule),
        data: { breadcrumb: '製令開啟通知作業生管製造' }
      },
      {
        path: 'manufacture-order-qc-edit/:m_id/:bonita_task_id',
        loadChildren: () => import('../features/manufacture-order-qc/manufacture-order-qc-edit/manufacture-order-qc-edit.module').then(m => m.ManufactureOrderQcEditModule),
        data: { breadcrumb: '製令開啟通知作業生館製造編輯' }
      },
      {
        path: 'manufacture-order-mg',
        loadChildren: () => import('../features/manufacture-order-mg/manufacture-order-mg.module').then(m => m.ManufactureOrderMgModule),
        data: { breadcrumb: '製令開啟通知作業(核准) | 總經理' }
      },
      {
        path: 'manufacture-order-mg-edit/:m_id/:bonita_task_id',
        loadChildren: () => import('../features/manufacture-order-mg/manufacture-order-mg-edit/manufacture-order-mg-edit.module').then(m => m.ManufactureOrderMgEditModule),
        data: { breadcrumb: '製令開啟通知作業(核准) | 總經理 編輯' }
      },
      {
        path: 'manufacture-order-re',
        loadChildren: () => import('../features/manufacture-order-re/manufacture-order-re.module').then(m => m.ManufactureOrderReModule),
        data: { breadcrumb: '製令開啟通知作業 | 收文者' }
      },
      {
        path: 'manufacture-order-re-edit/:m_id/:bonita_task_id',
        loadChildren: () => import('../features/manufacture-order-re/manufacture-order-re-edit/manufacture-order-re-edit.module').then(m => m.ManufactureOrderReEditModule),
        data: { breadcrumb: '製令開啟通知作業(核准) | 收文者 編輯' }
      },
      {
        path: 'manufacture-order-sa',
        loadChildren: () => import('../features/manufacture-order-sa/manufacture-order-sa.module').then(m => m.ManufactureOrderSaModule),
        data: { breadcrumb: '製令開啟通知作業| 業務' }
      },
      {
        path: 'manufacture-order-sa-edit/:m_id/:bonita_task_id',
        loadChildren: () => import('../features/manufacture-order-sa/manufacture-order-sa-edit/manufacture-order-sa-edit.module').then(m => m.ManufactureOrderSaEditModule),
        data: { breadcrumb: '製令開啟通知作業| 業務編輯' }
      },
      {
        path: 'project-C',
        data: { breadcrumb: '製造資訊管理' },
        children: [
          {
            path: 'project-info-manufacture-order-list',
            loadChildren: () => import('../features/project-info-manufacture-order-list/project-info-manufacture-order-list.module').then(m => m.ProjectInfoManufactureOrderListModule),
            data: { breadcrumb: '製令開啟通知作業' }
          },
          {
            path: 'project-info-manufacture-order-query',
            loadChildren: () => import('../features/project-info-manufacture-order-query/project-info-manufacture-order-query.module').then(m => m.ProjectInfoManufactureOrderQueryModule),
            data: { breadcrumb: '製造命令資料查詢' }
          },
          {
            path: 'project-info-manufacture-order-list-edit',
            loadChildren: () => import('../features/project-info-manufacture-order-list/project-info-manufacture-order-list-edit/project-info-manufacture-order-list-edit.module').then(m => m.ProjectInfoManufactureOrderListEditModule),
            data: { breadcrumb: '製令開啟通知作業/編輯作業' }
          },
          {
            path: 'project-infomanufacture-orderaudit',
            loadChildren: () => import('../features/project-infomanufacture-orderaudit/project-infomanufacture-orderaudit.module').then(m => m.ProjectInfomanufactureOrderauditModule),
            data: { breadcrumb: '製令開啟通知作業' }
          },
          {
            path: 'project-infomanufacture-orderaudit-edit/:m_id/:bonita_task_id',
            loadChildren: () => import('../features/project-infomanufacture-orderaudit/project-infomanufacture-orderaudit-edit/project-infomanufacture-orderaudit-edit.module').then(m => m.ProjectInfomanufactureOrderauditEditModule),
            data: { breadcrumb: '製令開啟通知作業/編輯作業' }
          },
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
