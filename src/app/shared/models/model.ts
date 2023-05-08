/*---------------------------------email------------------------------------*/
export interface EmailRequest {
  host: String
  port: String
  name: String
  username: String
  password: String
  to: String
  subject: String
  body: String
}
/*---------------------------------project------------------------------------*/
export interface Filedata {
  fileName: string
  fileBinary: string
  fileBase64: string
  documents_id: string
  file_name: string
  file_extension: string
  base64: string
  creater: string
}
/*---------------------------------project------------------------------------*/
export interface ProjectManagerRequest {

  p_id?: string;//編號
  code: string;//專案代號
  type?: string;//專案類型
  name: string;//專案名稱
  customer_name: string;//客戶
  date_for_start: string;//專案開始日
  date_for_end: string;//專案結束日
  salesman_name?: string;//業務人員
  serviceman_name: string;//客服人員
  projectman_name: string;//專案負責人
  project_member?: string;//專案參與人員
  status: string;//專案狀態
  meeting_id?: string;//會議紀錄
  file?: string;//附件
  task_id?: string;//任務紀錄
  manufactrue_order_list?: string;//製令清單
  create_time?: string;//建立日期
  date_for_pay: string;
  date_for_check: string;
  date_for_delivery: string;
  inner_id: string;

  //date_for_expected:string;//出機日?
  //date_for_done:string;//實際完成日
}
/*---------------------------------task------------------------------------*/
export interface TaskRequest {
  t_id: string;
  type: string;
  name: string;
  description: string;
  principal: string;
  before_id: string;
  time_for_start: string;
  time_for_done: string;
  include_weekend: string;
  labor_hour: string;
  finish: string;
  creater: string;
  create_time: string;
}
/*---------------------------------testtask------------------------------------*/
export interface TestTaskRequest {
  t_id: number;
  detail: object;
}

/*---------------------------------meeting------------------------------------*/
export interface MeetingRequest {
  m_id: String;
  name: string;
  room: string;
  start_date: string;
  end_date: string;
  chairman: String;
  attendees: string;
  create_time: string;
}
/*---------------------------------files------------------------------------*/
export interface FilesRequest {
  f_id: string;
  name: string;
  path: string;
  create_time: string;
}
/*---------------------------------interview------------------------------------*/
export interface InterviewRequest {
  i_id: string;
  time: string;
  type: string;
  content: string;
  cus_demand_id: string;
  creater: string;
  create_time: string;
}
/*---------------------------------machinecombined------------------------------------*/
export interface MachineCombined {
  mc_id: string;
  project_id: string;
  cm_code: string;
  cm_number: string;
  cm_finished: string;
  last_cm: string;
  create_time: string;
}
/*---------------------------------plugin------------------------------------*/
export interface PlugIn {
  pi_id: string;
  project_id: string;
  content: string;
  create_time: string;
}
/*---------------------------------antivirussoftware------------------------------------*/
export interface AntivirusSoftware {
  as_id: string;
  project_id: string;
  as_name: string;
  software_number: string;
  machine_number: string;
  create_time: string;
}
/*---------------------------------LaborHour------------------------------------*/
export interface LaborHourRequest {
  h_id: string;
  name: string;
  type: string;
  content: string;
  nature: string;
  date_for_labor: string;
  time_start: number;
  time_end: number;
  hour: number;
  create_time: string;
}

export interface AddProjectManagerRequest {
  p_code: string;//專案代號
  p_name: string;//專案名稱
  p_type?: string;//允許空值
  projectman_id: string;//專案負責人
  date_for_expected: string;//出機日?
  date_for_start: string;//專案時程
  date_for_end: string;
}

export interface Model {
  creat_at: string
  select: number
  min_length: string
}

export interface ProjectManagerElement {
  //專案代號
  project_code: string;
  //專案名稱
  project_name: string;
  //客戶
  customer_name: string;
  //專案負責人
  project_principal: string;
  //客服負責人
  serviceman_id: string;
  //出機日
  ship_date: Date;
  //實際完成日
  act_complete_date: Date;
  //狀態
  status: string;
  //專案時程
  project_schedule: Date;
  //編輯管理
  action_edit: string;
  //製令管理
  action_manufacture_order_open: string;
  //檢視紐
  action_detail: string;
}

export interface CaseElement {
  //任務名稱
  task_name: string;
  //開始時間-結束時間(工時)
  labor_start_done: string;
  //負責人員
  task_principal: string;
  //實際開始-結束
  act_start_done: string;
  //附件
  file: string;
  //備註說明
  description: string;
  //工時管理
  labor_hour: string;

  //編輯管理
  action_edit: string;
  //編輯管理
  action_detail: string;
  //工時明細管理
  labor_hour_detail: string;
  //附件管理
  action_file: string;

  //預計工時
  pre_labor_hour: string;
  //實際工時
  act_labor_hour: string;

  //資源管理
  action_source: string;
  //百分比
  percentage: string;
}


export interface ProjectTemplateElement {
  template_code: string;
  template_name: string;
  aciton_edit: string;
}

export interface projectElement {
  //專案代號
  task_code: string;
  //專案名字
  task_name: string;
  //開始與結束日
  labor_hour: string;
  //回復日期
  re_data: string;
  //完成日期
  com_date: string;
  //備註說明
  description: string;
}

export interface CustomerRequest {
  accept: string;//是否承接
  budget: string;//客戶預算
  c_id: number;//編號
  create_time: string;//建立時間
  creater: string;//建立人
  customer_name: string;//客戶
  date_for_devlop: string;//預計送審時間
  est_quantity: string;//三年預估數量
  eva_report: string;//不須提出技術可行性評估報告
  extend_rem: string;//衍生備註
  extend_type_id: string;//衍生機種
  project_code: string;//專案代號
  remarks: string;//備註內容
  salesman_name: string;//業務人員
  subject: string;//主旨
}


export interface ManufactureOrder {
  m_id: string;
  customer_id: string;
  order_name: string;
  amount: string;
  shipment_location: string;
  open_date: string;
  close_date: string;
  except_shipment_day: string;
  sales_assistant: string;
  recipient: string;
  contact_person: string;
  remarks: string;
  create_time: string;
  project_id: string;
  copy: string;
  status: string;
  creater: string;
}

export interface ProjectTemplate {
  pt_id: string;
  pt_code: string;
  pt_name: string;
  pt_remark: string;
  creater: string;
}

export interface Product {
  id?: string;
  code?: string;
  name: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}