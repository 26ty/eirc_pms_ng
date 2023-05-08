//顯示專案列表
const projectManagerData_r = [
    {
        //project表
        "p_id": "550e8400-e29b-41d4-a716-446655440000",
        "code": "p20211206",
        "name": "專案名稱",
        "date_for_start": "2021-10-23",
        "date_for_end": "2021-10-29",
        "status": "執行中",
        //user表
        //依照個別user表的u_id顯示該u_id的name
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//project.projectman_id=user.u_id
        "serviceman_id": "550e8400-e29b-41d4-a716-446655440000",//project.serviceman_id=user.u_id
        //customer表
        //依照個別customer表的c_id顯示該c_id的name
        "customer_id": "550e8400-e29b-41d4-a716-446655440000"//project.customer_id=customer.c_id
    }
]

//建立專案
const projectManagerData_c = [
    {
        //project表
        "code": "p20211206",
        "type": "一般專案",
        "name": "專案名稱",
        "date_for_start": "2021-10-23",
        "date_for_end": "2021-10-29",
        "status": "建檔中",//新增專案時就預設建檔中
        //user表
        //依照個別user表的u_id顯示該u_id的name
        //"customer_id":"550e8400-e29b-41d4-a716-446655440000",
        // "customer_id":"550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        // "salesman_id":"550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        // "serviceman_id":"550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        "projectman_id": "550e8400-e29b-41d4-a716-446655440000",//要去抓user表的u_id然後顯示user表的name
        // "creater": "550e8400-e29b-41d4-a716-446655440000",//project.create=user.u_id
    }
]