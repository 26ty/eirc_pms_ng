//account_id
export interface AccountId {
    account_id: string;
}


//治具需求單 JigDemand
export interface JigDemand {
    //編號
    j_id: string;
    //待審日期開始
    start_audit_date: Date;
    //待審日期結束
    end_audit_date: Date;
    //分類
    kind: string;
    //類別
    type: string;
    //是否急件
    urgent: boolean;
    //標題
    title: string;
    //治具數量
    quantity: number;
    //客戶通知日
    date_for_notify: Date;
    //客圖/資訊
    information: Date;
    //預計出貨日
    except_shipment_day: Date;
    //PO Date
    po_date: Date;
    //訂單號碼
    order_name: string;
    //專案編號
    project_id: string;
    //項目
    item: string;
    //規格
    standard: string;
    //摘要說明
    summary: string;
    //備註
    remark: string;
    //聯絡人
    liaison: string;
    //聯絡人電話
    liaison_phone: string;
    //任務紀錄
    task_id: string;
    //會簽紀錄
    countersign_id: string;
    //會議紀錄
    meeting_id: string;
    //客戶需求日
    date_for_demand: Date;
    //待覆日期
    date_for_respond: Date;
    //最晚待覆日期
    date_for_respond_of_limit: Date;
    //客戶編號
    customer_id: string;
    //建立人
    creater: string;
    //操作時間
    create_time: Date;
}

//名片 BusinessCard
export interface BusinessCard {
    //編號
    b_id: string;
    //名字
    name: string;
    //客戶編號(公司)
    customer_id: string;
    //名片年度
    card_year: number;
    //廠別
    territory: string;
    //負責機型
    machine_type: string;
    //單位
    department: string;
    //職稱
    role: string;
    //電話
    phone: string;
    //電話
    tel: string;
    //分機
    ext: string;
    //Mail
    mail: string;
    //上次拜訪時間
    last_visit: Date;
    //備註
    remark: string;
    //建立人
    creater: string;
    //操作時間
    create_time: string;
}

//贈品申請 ApplyGift
export interface ApplyGift {
    //編號
    a_id: string;
    //申請人
    user_id: string;
    //經辦
    attention_id: string;
    //需求者
    who_need: string;
    //專案代號
    project_id: string;
    //客戶別
    customer_type: string;
    //贈送說明
    explain: string;
    //贈送原因
    reason: string;
    //保固
    warranty: string;
    //請購品號
    machine_id: string;
    //建立人
    creater: string;
    //操作時間
    create_time: Date;
}

//報價 Quotation
export interface Quotation {
    //編號
    o_id: string;
    //對象
    to_id: string;
    //幣別
    current: string;
    //經辦人
    attn_id: string;
    //電話1
    tel1: string;
    //電話2
    tel2: string;
    //傳真
    fax: string;
    //日期
    date: string;
    //備註
    remark: string;
    //品名報價
    machine_id: string;
    //建立人
    creater: string;
    //操作時間
    create_time: Date;
}

//客戶需求單 CustomerDemand
export interface CustomerDemand {
    //編號
    c_id: string;
    //客戶
    customer_id: string;
    //主旨
    subject: string;
    //任務紀錄
    task_id: string;
    //客戶預算
    budget: number;
    //備註內容
    remarks: string;
    //是否承接
    accept: boolean;
    //衍生機種
    extend_type_id: string;
    //衍生備註
    extend_rem: string;
    //預計送審時間
    date_for_devlop: Date;
    //三年預估數量
    est_quantity: number;
    //不須提出技術可行性評估報告
    eva_report: boolean;
    //會簽紀錄
    countersign_id: string;
    //會議紀錄
    meeting_id: string;
    //客戶提出日
    date_for_recive: Date;
    //預計完成日
    date_for_expected: Date;
    //實際完成日
    date_for_done: Date;
    //專案代號
    project_code: string;
    //業務人員
    salesman_id: string;
    //附件
    files_id: string;
    //建立人
    creater: string;
    //建立日期
    create_time: Date;
    //客需單號
    code: string;
    //狀態
    status: string;
}

//客戶 Customer
export interface Customer {
    //編號
    c_id: string;
    //客戶簡稱
    short_name: string;
    //英文名稱
    eng_name: string;
    //中文名稱
    name: string;
    //郵遞區號
    zip_code: string;
    //通訊地址
    address: string;
    //電話
    tel: string;
    //傳真
    fax: string;
    //電子信箱
    email: string;
    //地圖
    map: string;
    //建立人
    creater: string;
    //聯絡人
    liaison: string;
    //聯絡人手機
    liaison_phone: string;
    //統編
    tax_id_number: string;
    //部屬機台
    Machine_id: string;
    //備註
    remark: string;
    //建立日期
    create_time: Date;
}

//任務 Task
export interface Task {
    //編號
    t_id: string;
    //來源單據編號
    documents_id: string;
    //任務名稱
    t_name: string;
    //備註
    remark: string;
    //流水號
    rank: number;
    //前一任務
    last_task: string;
    //預計起始日
    date_for_estimated_start: string;
    //實際完成日
    date_for_actual_completion: string;
    //預計完成日
    date_for_estimated_completion: string;
    //建立日期
    create_time: Date;
    //天數
    default_date: any;
    default_labor_hour: any;
    landmark: boolean;
}

//機器類型 MachineType
export interface MachineType {
    //編號
    m_id: string;
    //類型代號
    code: string;
    //類型名稱
    name: string;
    //類型說明
    description: string;
    //建立日期
    create_time: Date;
}

//簽核 Countersign
export interface Countersign {
    //編號
    c_id: string;
    //部門
    dep_id: string;
    //簽核狀態
    status: number;
    //簽核回覆
    feedback: string;
    //建立日期
    create_time: Date;
}

//部門 Department
export interface Department {
    //編號
    d_id: string;
    //名稱
    name: string;
    //英文名稱
    eng_name: string;
    //負責人
    manager: string;
    //部門電話
    Tel: string;
    //傳真號碼
    fax: string;
    //部門介紹
    Indroduction: string;
}

//會議 Meeting
export interface Meeting {
    //編號
    m_id: string;
    //會議名稱
    name: string;
    //會議地點
    room: string;
    //會議開始時間
    start_date: string;
    //會議結束時間
    end_date: string;
    //發起人
    chairman: string;
    //與會列表
    attendees: string;
    //建立日期
    create_time: Date;
}

//會議提醒時段 NoticeTime
export interface NoticeTime {
    //編號
    n_id: string;
    //會議編號
    meet_id: string;
    //提醒時間
    meet_time: Date;
}


//會議列表 Meeting
export interface Meeting {
    m_id: string;
    project_id: string;
    name: string;
    room: string;
    time_for_start: string;
    time_for_end: string;
    date_for_start: Date;
    create_time: Date;
}
//與會列表 Attendee
export interface Attendee {
    //編號
    a_id: string;
    //參與者編號
    user_id: string;
    meet_id: string;
    chairman: string;
}


//訪問紀錄 Interview
export interface Interview {
    //編號
    i_id: string;
    //訪問時間
    time: Date;
    //訪問方式
    type: string;
    //訪問內容
    content: string;
    //客需單編號
    cus_demand_id: string;
    //建立人
    creater: string;
    //建立日期
    create_time: Date;
}

//員工 User
export interface 員工User {
    //編號
    u_id: string;
    //員工證號碼
    worker_id: string;
    //姓名
    name: string;
    //英文姓名
    eng_name: string;
    //性別
    gender: string;
    //帳號
    account: string;
    //密碼
    password: string;
    //密碼提示
    password_hint: string;
    //大頭貼
    photo: string;
    //特殊權限
    auth_id: string;
    //所屬部門
    dep: string;
    //電話
    phone: string;
    //電子郵件
    email: string;
    //暱稱
    nickname: string;
    //生日
    bithday: Date;
    //分機
    ext: string;
    //通訊短縮碼
    shortened_code: string;
    //打卡代號
    clock_in_id: Date;
}

//權限 Auth
export interface Auth {
    //編號
    a_id: string;
    //權限名稱
    name: string;
    //授權網站路徑
    path: string;
    //授權檔案編號
    file: number;
    //建立日期
    create_time: Date;
}

//檔案 Files
export interface Files {
    //編號
    f_id: string;
    //檔案名稱
    name: string;
    //檔案路徑
    path: string;
    //建立日期
    create_time: Date;
}

//專案 Project
export interface Project {
    //編號
    p_id: string;
    //專案代號
    code: string;
    //專案類型
    type: string;
    //專案名稱
    name: string;
    //客戶
    customer_id: string;
    //專案開始日
    date_for_start: Date;
    //專案結束日
    date_for_end: Date;
    //業務人員
    salesman_id: string;
    //客服人員
    serviceman_id: string;
    //專案管理人員
    projectman_id: string;
    //專案參與人員
    workerset_id: string;
    //會議紀錄
    meeting_id: string;
    //附件
    files_id: string;
    //任務紀錄
    task_id: string;
    //製令清單
    manufactureorder_id: string;
    //專案狀態
    status: string;
    //建立人
    creater: string;
    //建立日期
    create_time: Date;
    //收款日
    date_for_pay: Date;
    //出機日
    date_for_delivery: Date;
    //驗收日
    date_for_check: Date;
    //內部單號
    inner_id: number;
}

//工作項目 WorkItem
export interface WorkItem {
    //編號
    w_id: string;
    //工作項目名稱
    name: string;
    //工作類型
    type: string;
    //是否必填
    required: boolean;
    //是否提供規格與數量
    provide_amount: boolean;
    //建立日期
    create_time: Date;
}

//專案參與人員 WorkerSet
export interface WorkerSet {
    //編號
    w_id: string;
    //工作類型
    work_item: string;
    //負責人
    user_id: string;
    //預計完成日
    date_for_expected: Date;
    //實際完成日
    date_for_done: Date;
    //規格與數量
    amount: string;
    //備註
    remarks: string;
    //建立日期
    create_time: Date;
}

//製造命令 ManufactureOrder
export interface ManufactureOrder {
    //編號
    m_id: string;
    //專案代號
    project_id: string;
    //客戶
    customer_id: string;
    //主件品號
    order_name: string;
    //需求數量
    amount: string;
    //出貨地點
    shipment_location: string;
    //製令開啟期限
    open_date: Date;
    //製令關閉期限
    close_date: Date;
    //預計出貨日期
    except_shipment_day: Date;
    //業務助理
    sales_assistant: string;
    //收文者
    recipient: string;
    //業務負責人
    contact_person: string;
    //副本
    copy_file: string;
    //備註
    remarks: string;
    //製令狀態
    status: string;
    //建立人
    creater: string;
    //建立日期
    create_time: Date;
}

//操作紀錄 Log (紀錄由觸發器新增)
export interface Log {
    //編號
    l_id: number;
    //操作類型
    type: string;
    //操作資料表
    tableName: string;
    //操作指令
    sql_code: string;
    //原始內容
    content: object;
    //操作人
    user: string;
    //操作時間
    create_time: Date;
}

//客戶廠別配置 MachineWorkPlace
export interface MachineWorkPlace {
    ///編號
    m_id: string;
    //是否啟用
    enable: boolean;
    //廠別
    place: string;
    //機型
    machine_type_id: string;
    //HTA P/N
    pn_code: string;
    //HTA S/N
    sn_code: string;
    //客戶編號
    customer_id: string;
    //專案代號
    project_code: string;
    //備註
    remark: string;
    //建立人
    creater: string;
    //操作時間
    create_time: Date;
}

//工時紀錄 laborhoursubmit
export interface laborhoursubmit {
    //編號 
    h_id: string;
    //工時類別 
    type: string;
    //項目名稱
    name: string;
    //項目內容
    content: string;
    //工作性質
    nature: string;
    //日期
    date_for_labor: string;
    //起始時間 
    time_start: number;
    //結束時間 
    time_end: number;
    //工作時數
    hour: number;
    //操作時間 
    create_time: Date;
}
