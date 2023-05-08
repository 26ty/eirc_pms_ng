
export interface TaskItem {
  code: string
  t_name: string
  icon?: string
  children?: TaskItem[]
}


export interface PurchaseOrder {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  create_date: string;
  type: string;
  create_user: string;
  task_id: string;
  title: string;
  bargaining: PurchaseRecord[];

}

export interface CreateReceipt {
  type: string;
  create_user: string;
  task_id: string;
  title: string;
  create_date: string,
  department: string;
  position: string;
  review_level: string;
  receipt_records: ReceiptRecord[];
  inventort_seizure: string;
  task_over: string;
  note: string;
  purchase_id: string;
}
export interface ReceiptList {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  type: string;
  create_user: string;
  task_id: string;
  title: string;
  create_date: string,
  department: string;
  position: string;
  review_level: string;
  receipt_records: ReceiptRecord[];
  inventort_seizure: string;
  task_over: string;
  note: string;
  purchase_id: string;
}

export interface ReceiptRecord {
  receipt_date: string;
  receipt_number: number;
}
export interface CreatePurchaseOrder {
  create_date: string;
  type: string;
  create_user: string;
  rqk_id: string;
  title: string;
  bargaining: PurchaseRecord[];

}


export interface PurchaseRecord {
  req_purchase_records: RequestPurchase[];
  is_includedtax: boolean;
  contract_supplier: string;
  payment_terms: string;
  order_date: string;
  order_price: number;
  order_title: number;
  order_qty: number;
  delivery_dates: string;
  other_conventions: string;
  department: string;
  position: string;
  review_level: number;
  note: string;
}

export interface ReqBuyTask {
  create_date: string;
  type: string;
  document_type: string;
  create_user: string;
  task_id: string;
  title: string;
  department: string;
  position: string;
  review_level: number;
  reqpurchases: RequestPurchase[];
}
export interface ReqPurchaseTask {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  create_date: string;
  type: string;
  document_type: string;
  create_user: string;
  task_id: string;
  title: string;
  department: string;
  position: string;
  review_level: number;
  reqpurchases: RequestPurchase[];
}


export interface Review {
  department: string;
  position: string;
  review_level: number;
}
export interface Reviewer {
  department: string;
  position: string;
  review_level: number;
  proxy_position: string;
  proxy_department: string;
  proxy_review_level: number;
  proxy_user: string;
  is_proxy: boolean;
  user_id: string;
  approver: boolean;
  result: string;
  review_date: string;
}

export interface ReviewID {
  ID: string;
}

export interface Tasklog {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  task_id: string;
  review_id: string;
  task_over: boolean;
  task_title: string;
  TaskReviewLog: Reviewer[];
}

export interface ReviewLog {
  ID: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  task_id: string;
  user_id: string;
  task_title: string;
  result: string;
}

export interface RequestPurchase {
  quantity: number;
  required_date: string;
  spec: string;
  name: string;
  contract_supplier: string;
  bargainings: BargainingRecord[];
}

export interface BargainingRecord {
  provider_name: string;
  provider_label: string;
  first_price: number;
  first_title: number;
  last_price: number;
  last_title: number;
  note: string;
}

export interface CustomerDemandReceipt {
  receipt_id: string;
  task_id: string;
  create_user: string;
  customer: string;
  title: string;
  create_date: string;
  estimate_over: string;
  task_over: string;
  task_manager: string;
  status: string;
  type: string;
  note: string;
}

export interface CustomerRequest {
  accept: string;//是否承接
  budget: string;//客戶預算
  c_id: number;//編號
  create_time: string;//建立時間
  creater: string;//建立人
  customer_id: string;//客戶
  date_for_devlop: string;//預計送審時間
  est_quantity: string;//三年預估數量
  eva_report: string;//不須提出技術可行性評估報告
  extend_rem: string;//衍生備註
  extend_type_id: string;//衍生機種
  project_code: string;//專案代號
  remarks: string;//備註內容
  salesman_id: string;//業務人員
  subject: string;//主旨
}


export interface recently10 {
  task_name: string;
  start_time: string;
  end_time: string;
  estimate_time: string;
  represent: string;
  note: string;
  start_date: string;
  end_date: string;
  attachment: string;
  record: string;
}

export interface formRecord {
  record_date: string;
  department: string;
  record_content: string;
}

export interface CrFollowItems {
  project_id: string;
  receive_date: string;
  business_represent: string;
  problem_describe: string;
  project_represent: string;
  process: string;
  man_hour_detail: string;
  attachment: string;
  form_record: string;
}


