//新建客需單
const projectRequestData_c = [
    {
        //CustomerDemand表
        "code": "CR-20211053",//客需單號*
        "create_time": "2020-05-22T20:13:14Z",//建立日期
        "subject": "需求說明",
        //適用製程說明(缺失欄位)
        "remarks": "其他",
        "budget": "客戶預算",
        //客戶預估時程(客戶提出日+預計完成日)
        "date_for_recive": "2020-05-22T20:13:14Z",//客戶提出日
        "date_for_expected": "2020-05-22T20:13:14Z",//預計完成日
        "extend_type_id": "衍生機種(選擇舊機型則為必填)",
        "extend_rem": "衍生備註(選擇舊機型則為必填)",
        "date_for_devlop": "2020-05-22T20:13:14Z",//預計送審時間
        "est_quantity": 100,//三年預估數量
        "accept": false,//是否承接
        "eva_report": false,//不須提出技術可行性評估報告
        "creater": "550e8400-e29b-41d4-a716-446655440000",//建立人
        "status": "填寫中",//狀態

        //User表
        "name": "客戶聯絡人",
        "tel": "0912345678",//電話
        "email": "hta@gmail.com.tw",//電子郵件

        //Customer表
        "customer_name": "中文名稱",//原名稱為name
    }
]

//顯示客需單所需資料
const projectRequestData_r = [
    {
        //CustomerDemand表
        "c_id": "550e8400-e29b-41d4-a716-446655440000",//編號
        "code": "CR-20211053",//客需單號
        "create_time": "2020-05-22T20:13:14Z",//建立日期
        "subject": "需求說明",
        //適用製程說明(缺失欄位)
        "remarks": "其他",
        "budget": "客戶預算",
        //客戶預估時程(客戶提出日+預計完成日)
        "date_for_recive": "2020-05-22T20:13:14Z",//客戶提出日
        "date_for_expected": "2020-05-22T20:13:14Z",//預計完成日
        "extend_type_id": "衍生機種(選擇舊機型則為必填)",
        "extend_rem": "衍生備註(選擇舊機型則為必填)",
        "date_for_devlop": "2020-05-22T20:13:14Z",//預計送審時間
        "est_quantity": "100",//三年預估數量
        "accept": false,//是否承接
        "eva_report": false,//不須提出技術可行性評估報告
        "creater": "550e8400-e29b-41d4-a716-446655440000",//建立人
        "status": "填寫中",//狀態
        "files_id": null,//附件

        //User表
        "name": "客戶聯絡人",
        "tel": "0912345678",//電話
        "email": "hta@gmail.com.tw",//電子郵件

        //Customer表
        "customer_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓Customer表的c_id然後顯示Customer表的zname

        //Task表 
        "task_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓Task表的t_id然後顯示Task表的detail

        //Countersign表
        "countersign_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓Countersign表的c_id然後顯示Countersign表的

        //Meeting表
        "meeting_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓Meeting表的m_id然後顯示Meeting表的
    }
]

//更新客需單
const projectRequestData_u = [
    {
        //CustomerDemand表 
        "c_id": "550e8400-e29b-41d4-a716-446655440000",//編號
        "code": "CR-20211053",//客需單號
        "create_time": "2020-05-22T20:13:14Z",//建立日期
        "subject": "需求說明",
        //適用製程說明(缺失欄位)
        "remarks": "其他",
        "budget": "客戶預算",
        //客戶預估時程(客戶提出日+預計完成日)
        "date_for_recive": "2020-05-22T20:13:14Z",//客戶提出日
        "date_for_expected": "2020-05-22T20:13:14Z",//預計完成日
        "extend_type_id": "衍生機種(選擇舊機型則為必填)",
        "extend_rem": "衍生備註(選擇舊機型則為必填)",
        "date_for_devlop": "2020-05-22T20:13:14Z",//預計送審時間
        "est_quantity": "100",//三年預估數量
        "accept": false,//是否承接
        "eva_report": false,//不須提出技術可行性評估報告
        "creater": "550e8400-e29b-41d4-a716-446655440000",//建立人
        "status": "填寫中",//狀態
        "files_id": null,//附件

        //User表 
        "name": "客戶聯絡人",
        "tel": "0912345678",//電話
        "email": "hta@gmail.com.tw",//電子郵件

        //Customer表
        "customer_id": "550e8400-e29b-41d4-a716-446655440000",
    }
]

//刪除客需單
const projectRequestData_d = [
    {
        //CustomerDemand表 
        "c_id": "550e8400-e29b-41d4-a716-446655440000",//編號(資料庫自動生成的)
    }
]


