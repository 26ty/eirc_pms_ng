//顯示專案列表
const produceSalesMeetingEditData_r = [
    {
        //project表
        "p_id": "550e8400-e29b-41d4-a716-446655440000",
        "code": "p238t201",//必填     
        "customer_id": "550e8400-e29b-41d4-a716-446655440000",//必填
        "date_for_start": "2021-10-23",//必填
        "date_for_end": "2021-10-29",//必填     
        "status": "執行中",
        //依照個別user表的u_id顯示該u_id的name
        "creater": "550e8400-e29b-41d4-a716-446655440000",//project.create=user.u_id
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//project.projectman_id=user.u_id
        "serviceman_id": "550e8400-e29b-41d4-a716-446655440000",//project.serviceman_id=user.u_id
        "salesman_id": "550e8400-e29b-41d4-a716-446655440000",//project.salesman_id=user.u_id

        "customer_code": "CR-20210007", //待新增（客需單號）必填
        "machine_finished_number": "59312328",//待新增（機台總成品號）必填
        "jig_quantity": "10",//待新增（治具數量）必填
        "machine_english": "computer",//待新增（機台英文名稱）
        "machine_quantity": "10",//待新增（機台數量）
        "external_order": "test",//待新增（外部訂單）
        "internal_order": "test",//待新增（內部訂單）
        "summary_description": "test",//待新增（摘要說明）

        //task表
        "t_id": "550e8400-e29b-41d4-a716-446655440000",
        "documents_id": "550e8400-e29b-41d4-a716-446655440000",
        "t_name": "機台產銷會議",
        "rank": "3",
        "file": "true",//必填
        "remark": "test",
        "origin_id": "1e6913f5-55be-413a-94a5-68f8cc67d5b2",
        "date_for_estimated_start": "2021-10-29",//必填
        "date_for_actual_completion": "2021-10-29",//必填
        "date_for_ estimated _completion": "2021-10-29",//必填  
    }
]

const plug_in = [
    {
        "pi_id": "20196bfd-b4b5-4854-89f1-fed1304aaf44",
        "project_id": "12dcd64b-daaf-4359-90b2-683df7b4dc15",
        "content": "test",
        "create_time": "2022-01-05T05:03:08.95808Z"
    }
]

const machine_combined = [
    {
        "mc_id": "5c75e8c2-72e4-40be-a9e6-fcc57d40a0f4",
        "project_id": "12dcd64b-daaf-4359-90b2-683df7b4dc15",
        "mc_code": "C213",
        "mc_number": 13,
        "mc_finished": "testtest",
        "last_mc": "32bb6df4-9c69-45b0-9e38-7892492546a5",
        "create_time": "2022-01-05T05:02:43.794251Z"
    }
]

const antivirus_software = [
    {
        "as_id": "4bb659c3-d75a-4b26-9aac-4727ce53ce73",
        "project_id": "05878a9d-0a2b-4e96-9d63-fb12f07d3b76",
        "as_name": "微軟",
        "software_number": "XD-daodqwq",
        "machine_number": "test",
        "create_time": "2022-01-05T03:05:06.534908Z"
    }
]


//顯示專案列表
const ProduceSalesMeetingEditData_u = [
    {
        //project表
        "code": "p20211206",
        "name": "專案名稱",
        "date_for_start": "2021-10-23",
        "date_for_end": "2021-10-29",
        "status": "執行中",
        //user表
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        "serviceman_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        //customer表
        "customer_id": "550e8400-e29b-41d4-a716-446655440000"//要去抓customer表的c_id然後顯示customer表的name
    }
]

//建立專案
const ProduceSalesMeetingData_c = [
    {
        //project表
        "code": "p20211206",
        "type": "一般專案",
        "name": "專案名稱",
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        "date_for_start": "2021-10-23",
        "date_for_end": "2021-10-29",
        "creater": "陳念歆",//抓目前登入的人員
        "status": "建檔中",//新增專案時就預設建檔中
        "task_id": 1,//同時新增task表t_id

        //task表 也同時要新增一筆任務資料
        "detail": {}
    }
]

export interface TreeNode {
    data?: any;
    children?: TreeNode[];
    leaf?: boolean;
    expanded?: boolean;
}

export const testjson = [
    {
        data:
        [
            {
                data:{
                    name:"Documents",
                    size:"75kb",
                    type:"Folder"
                },
                children:[
                    {
                        data:{
                            name:"Work",
                            size:"55kb",
                            type:"Folder"
                        },
                        children:[
                            {
                                data:{
                                    name:"Expenses.doc",
                                    size:"30kb",
                                    type:"Document"
                                }
                            },
                            {
                                data:{
                                    name:"Resume.doc",
                                    size:"25kb",
                                    type:"Resume"
                                }
                            }
                        ]
                    },
                    {
                        data:{
                            name:"Home",
                            size:"20kb",
                            type:"Folder"
                        },
                        children:[
                            {
                                data:{
                                    name:"Invoices",
                                    size:"20kb",
                                    type:"Text"
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
]