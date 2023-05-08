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
//職稱 Jobtitle
export interface Jobtitle {
    //編號
    j_id: string;
    //名稱
    name: string;
    //負責人
    bonita_role_id: string;
}