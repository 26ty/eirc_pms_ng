import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnySoaRecord } from 'dns';
import { Observable } from 'rxjs';
import { HttpApiService } from './../../../../api/http-api.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export const MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Option {
  label: string;
  value: any;
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;

  control: FormControl = new FormControl('', [Validators.required])
  filter: FormControl = new FormControl('');
  filtedOptions: Observable<Array<Option>>;

  options: Array<Option> = [
    { label: 'CR-2021007', value: '林' },
    { label: 'SR3100-0001', value: '黃' },
    { label: 'CR-20190046', value: '王' },
    { label: 'CR-20200008', value: '陳' },
    { label: 'DS3070-0028', value: '范' },
    { label: 'BP5100-0016', value: '何' },
  ];

  constructor(
    private httpApiService: HttpApiService,
  ) {
    this.addForm = new FormGroup({
      origin_id: new FormControl(),
      project_id: new FormControl(),
    })
  }

  userJson: any

  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)

    this.addForm = new FormGroup({
      origin_id: new FormControl(),
      project_id: new FormControl(),
    })


  }

  origin_id = ''
  workType_option: any[] = [{
    key: "專案單號",
    value: "A",
  }, {
    key: "客需單單號",
    value: "B",
  }
    , {
    // key: "治具需求單號",
    key: "治具需求單號(需要外串CRM資料庫)",
    value: "C",
  }];

  getOptionStyle(opt: Option, filted: Array<Option>): { [key: string]: any } {
    const style: { [key: string]: any } = {};

    style.display = filted.indexOf(opt) < 0 ? 'none' : '';

    return style;
  }

  //取得CR單號
  codeList: any[] = [];
  request: any
  getAllCR(): void {
    this.httpApiService.getCustomerRequest_n(1, 1).subscribe(crRequest => {
      this.request = crRequest.body.customer_demand
      console.log('crRequest', crRequest)

      for (let i in this.request) {
        this.codeList.push({ "id": crRequest.body.customer_demand[i].cd_id, "name": crRequest.body.customer_demand[i].code })

      }
      console.log('this.crList', this.codeList)
    })
  }

  //取得project單號
  getAllProject(): void {
    this.httpApiService.getProjectListRequest_t(1, 1).subscribe(projectRequest => {
      this.request = projectRequest.body.project
      console.log('projectRequest', projectRequest)

      for (let i in this.request) {
        this.codeList.push({ "id": projectRequest.body.project[i].p_id, "name": projectRequest.body.project[i].code })

      }
      console.log('this.projectList', this.codeList)
    })
  }

  //下拉選單更改
  selectedValue(): void {
    console.log('下拉選單更改')
    if (this.origin_id == "A") {
      this.reset()
      this.codeList = []
      //取得all project單號
      this.getAllProject()
    } else if (this.origin_id == "B") {
      this.reset()
      this.codeList = []
      //取得all CR單號
      this.getAllCR()
    } else if (this.origin_id == "C") {
      this.reset()
      this.codeList = []
    }

  }

  Datas: any;
  //搜尋客需單
  Info: any[] = [];
  serchInfo(): void {
    if (this.origin_id == "A") {
      this.httpApiService.getOneProjectListRequest(this.project_id)
        .subscribe(prjectRequest => {
          this.Datas = prjectRequest;
          this.Info = []
          this.Info.push({ "customer_id": this.Datas.body.customer_id, "customer_name": this.Datas.body.customer_name, "date_for_estimated_start": this.Datas.body.date_for_start, "date_for_estimated_end": this.Datas.body.date_for_end })

        })
    } else if (this.origin_id == "B") {
      this.httpApiService.getOneCustomerRequest(this.project_id)
        .subscribe(crRequest => {
          this.Datas = crRequest;
          this.Info = []
          this.Info.push({ "customer_id": this.Datas.body.customer_id, "customer_name": this.Datas.body.customer_name, "date_for_estimated_start": this.Datas.body.date_for_estimated_start, "date_for_estimated_end": this.Datas.body.date_for_estimated_end })

        })
    } else if (this.origin_id == "C") {

    }

  }


  addProjectManufacture(): void {
    location.href = '/main/project-C/project-info-manufacture-order-list-add';
  }

  //雙向綁定

  m_id = ''
  customer_id = ''
  order_name = ''
  amount = 0
  shipment_location = ''
  date_for_open = ''
  date_for_close = ''
  date_for_estimated_shipment = ''
  sales_assistant_id = ''
  recipient_id = ''
  contact_person = ''
  remark = ''
  create_time = ''
  project_id = ''
  project_name = ''
  copy = ''
  status = ''
  creater = ''
  salesman_id = ''

  empt: any
  //更新製令資料---------------------------------------
  uploadProjectInfoManufacture(): void {

    // 填入project_name
    for (let i in this.codeList) {
      if (this.codeList[i].id == this.project_id) {
        this.project_name = this.codeList[i].name
        console.log(this.project_name)
      }
    }

    let projectInfoManufactureData: any = {};//接收資料的陣列

    projectInfoManufactureData['project_id'] = this.project_id;
    projectInfoManufactureData['order_name'] = "";

    projectInfoManufactureData['date_for_open'] = this.Info[0].date_for_estimated_start;
    projectInfoManufactureData['date_for_close'] = this.Info[0].date_for_estimated_end;
    projectInfoManufactureData['status'] = '編輯中';

    //必填UUID
    // projectInfoManufactureData['nature'] = "0caaf460-ee49-44c7-80e6-62faf0e8488e";
    projectInfoManufactureData['customer_id'] = this.Info[0].customer_id;
    projectInfoManufactureData['sales_assistant_id'] = "00000000-0000-0000-0000-000000000000";
    projectInfoManufactureData['recipient_id'] = "00000000-0000-0000-0000-000000000000";
    projectInfoManufactureData['salesman_id'] = "00000000-0000-0000-0000-000000000000";
    projectInfoManufactureData['copy_file'] = "00000000-0000-0000-0000-000000000000";
    projectInfoManufactureData['creater'] = this.userJson.account_id;
    projectInfoManufactureData['other_document_id'] = "00000000-0000-0000-0000-000000000000";

    console.log(projectInfoManufactureData);


    this.httpApiService.uploadProjectInfoManufacture(projectInfoManufactureData).
      subscribe(MO => {
        console.log(MO)
        this.uploadTransactionRecordRequests(MO.body)

      }
      );


  }

  //產生一筆新的transaction_record 紀錄資料格式-------------------------------------------
  uploadTransactionRecordRequests(id: AnySoaRecord): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = id
    trManagerDatas['actor'] = '創建'
    trManagerDatas['content'] = '製令'
    trManagerDatas['creater'] = this.userJson.account_id

    console.log(trManagerDatas)

    this.httpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功')
        location.href = '/main/project-C/project-info-manufacture-order-list-edit/' + id;
      }
      );
  }

  reset(): void {
    this.Info = []
  }



}


