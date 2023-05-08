//顯示專案內容
const projectManagerEditData_r = [
    {
        //project表
        "p_id": "550e8400-e29b-41d4-a716-446655440000",//PK
        "code": "p20211206",
        "type": "一般專案",
        "name": "專案名稱",
        "date_for_start": "2021-10-23",
        "date_for_end": "2021-10-29",
        "status": "建檔中",
        "date_for_pay": "2021-10-29",
        "date_for_delivery": "2021-10-29",
        "date_for_check": "2021-10-29",
        "inner_id": 82984859,
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "creater": "550e8400-e29b-41d4-a716-446655440000",//project.create=user.u_id
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//project.projectman_id=user.u_id
        "serviceman_id": "550e8400-e29b-41d4-a716-446655440000",//project.serviceman_id=user.u_id
        "salesman_id": "550e8400-e29b-41d4-a716-446655440000",//project.salesman_id=user.u_id
        "user_id": "550e8400-e29b-41d4-a716-446655440000",//project.user_id=user.u_id
        //customer表
        //依照個別customer表的c_id顯示該c_id的name
        "customer_id": "550e8400-e29b-41d4-a716-446655440000",//project.customer_id=user.u_id

        //test
    }
] 

//編輯專案
const projectManagerEditData_u = [
    {
        //project表
        "p_id": "550e8400-e29b-41d4-a716-446655440000",//PK
        "code": "p20211206",//必填
        "type": "一般專案",//必填
        "name": "專案名稱",//必填
        "date_for_start": "2021-10-23",//必填
        "date_for_end": "2021-10-29",//必填
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "serviceman_id": "550e8400-e29b-41d4-a716-446655440000",//project.serviceman_id=user.u_id 必填
        "salesman_id": "550e8400-e29b-41d4-a716-446655440000",//project.salesman_id=user.u_id 必填
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//project.projectman_id=user.u_id 必填
        //customer表
        //依照個別customer表的c_id顯示該c_id的name
        "customer_id": "550e8400-e29b-41d4-a716-446655440000",//project.customer_id=user.u_id
    }
] 

//啟動按鈕後要更改專案狀態
const projectManagerEditData_Status_u = [
    {
        "p_id" :"550e8400-e29b-41d4-a716-446655440000",//PK
        "status":"執行中"
    }
]

//任務新增
const taskData_c = [
    {
        //新增task表
        //依照個別task表的t_id顯示該t_id的name
        "documents_id":"450f9383-cbf8-411b-b574-0aa48008ab56",//來源單據編號
        "rank":1,
        "name" :"機台出機",
        "file":false,
        "remark":"備註事項",
        "landmark":false,
        "last_task":"550e8400-e29b-41d4-a716-446655440000",//判斷 task.last_task = task.t_id 顯示 task.name
        "date_for_estimated_start":"2021-10-23", 
        "date_for_actual_completion":"2021-10-23",
        "date_for_estimated_completion":"2021-10-23",
        "origin_id":"550e8400-e29b-41d4-a716-446655440000",//單據來源種類編號

        //判斷document_type表 判斷單據來源
        //"du_id":"550e8400-e29b-41d4-a716-446655440000",//PK document_type.du_id = task.origin_id 

        //新增task_user 判斷任務負責人user_id有哪些
        "task_id": "5b0e8580-f3f6-4301-8779-3dad42fbced0",//task_user.task_id = task.t_id
        "user_id": "550e8400-e29b-41d4-a716-446655440000",//任務負責人id

        //判斷account表 "顯示"該account_id的name
        //"account_id":"550e8400-e29b-41d4-a716-446655440000",//PK account.account_id = task_user.user_id
    }
]
//任務顯示
const taskData_r = [
    {
        //task表
        //依照個別task表的t_id顯示該t_id的name
        "t_id": "5b0e8580-f3f6-4301-8779-3dad42fbced0",//project.t_id = task.t_id PK
        "documents_id":"450f9383-cbf8-411b-b574-0aa48008ab56",
        "rank":1,
        "name" :"機台出機",
        "file":false,
        "remark":"備註事項",
        "landmark":false,
        "last_task":"550e8400-e29b-41d4-a716-446655440000",
        "date_for_estimated_start":"2021-10-23", 
        "date_for_actual_completion":"2021-10-23",
        "date_for_estimated_completion":"2021-10-23",
        "origin_id":"550e8400-e29b-41d4-a716-446655440000",

        //document_type表 判斷單據來源
        "du_id":"550e8400-e29b-41d4-a716-446655440000",//PK document_type.du_id = task.origin_id 

        //task_user 判斷任務負責人user_id有哪些
        "tu_id":"550e8400-e29b-41d4-a716-446655440000",//PK
        "task_id": "5b0e8580-f3f6-4301-8779-3dad42fbced0",//task_user.task_id = task.t_id
        "user_id": "550e8400-e29b-41d4-a716-446655440000",

        //account表 該account_id的name
        "account_id":"550e8400-e29b-41d4-a716-446655440000",//PK account.account_id = task_user.user_id
    }
]
//任務編輯
const taskData_u = [
    {
        //task_new表
        "t_id":"550e8400-e29b-41d4-a716-446655440000",//PK
        "rank":1,
        "name" :"機台出機",
        "file":false,
        "remark":"備註事項",
        "landmark":false,
        "last_task":"機台內部訂單",
        "date_for_estimated_start":"2021-10-23", 
        "date_for_actual_completion":"2021-10-23",
        "date_for_ estimated _completion":"2021-10-23",

        //task_user
        "tu_id":"550e8400-e29b-41d4-a716-446655440000",//PK
        //task表 也同時要新增一筆任務資料
        //依照個別task表的t_id顯示該t_id的name
        "task_id": "550e8400-e29b-41d4-a716-446655440000",//task_user.task_id = task.t_id
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "user_id": "550e8400-e29b-41d4-a716-446655440000",//task_new.user_id=user.u_id
        "labor_hour":10,
    }
]
//資源顯示
const sourceData_r = [
    {
        //task_new表
        "t_id":"550e8400-e29b-41d4-a716-446655440000",//PK

        //task_user
        "tu_id":"550e8400-e29b-41d4-a716-446655440000",//PK
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "user_id": "550e8400-e29b-41d4-a716-446655440000",//task_new.user_id=user.u_id
        "labor_hour":10,
    }
]
//工時顯示
const laborData_r = [
    {
        //task_new表
        "t_id":"550e8400-e29b-41d4-a716-446655440000",//PK

        //task_user
        "tu_id":"550e8400-e29b-41d4-a716-446655440000",//PK
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "user_id": "550e8400-e29b-41d4-a716-446655440000",//task_new.user_id=user.u_id
        "labor_hour":10,
    }
]
//附件顯式
const fileData_r = [
    {
        //file
        
        "name":"進度報表20211207"
    }
]
//會議新增
const meetingData_c = [
    {
        //Meeting表
        "name": "會議名稱",//原名稱為name
        "room": "會議地點",
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "creater": "550e8400-e29b-41d4-a716-446655440000",//meeting.create=user.u_id
        "start_date": "2020-05-22T20:13:14Z",//會議開始時間
        "end_date": "2020-05-22T20:13:14Z",//會議結束時間
        "attendees": "550e8400-e29b-41d4-a716-446655440000",//與會列表
        "meeting_create_time": "2020-05-22T20:13:14Z",//建立日期//原名稱為create_time
    }
]
//會議顯示
const meetingData_r = [
    {
        //Meeting表
        "name": "會議名稱",//原名稱為name
        "room": "會議地點",
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "creater": "550e8400-e29b-41d4-a716-446655440000",//meeting.create=user.u_id
        "start_date": "2020-05-22T20:13:14Z",//會議開始時間
        "end_date": "2020-05-22T20:13:14Z",//會議結束時間
        "attendees": "550e8400-e29b-41d4-a716-446655440000",//與會列表
        "meeting_create_time": "2020-05-22T20:13:14Z",//建立日期//原名稱為create_time
    }
]
//會議編輯
const meetingData_u = [
    {
        //Meeting表
        "name": "會議名稱",//原名稱為name
        "room": "會議地點",
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "creater": "550e8400-e29b-41d4-a716-446655440000",//meeting.create=user.u_id
        "start_date": "2020-05-22T20:13:14Z",//會議開始時間
        "end_date": "2020-05-22T20:13:14Z",//會議結束時間
        "attendees": "550e8400-e29b-41d4-a716-446655440000",//與會列表
        "meeting_create_time": "2020-05-22T20:13:14Z",//建立日期//原名稱為create_time
    }
]
