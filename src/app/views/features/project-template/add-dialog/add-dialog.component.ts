import { HttpApiService } from './../../../../api/http-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  addForm: FormGroup;
  @Input() title!: string;
  myControl = new FormControl();

  pt_id: any;
  pt_code: any;
  pt_name: any;
  pt_remark: any;
  creater: any = '8a0d5500-c725-4fbf-a961-e429e76b8d85'

  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
  ) {
    this.addForm = this.fb.group({
      pt_code: new FormControl(),
      pt_name: new FormControl(),
      pt_remark: new FormControl()
    });
  }
  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY) //取得session values(使用者資訊)
    this.userJson = JSON.parse(String(userstring)) //取得session將其轉為Json格式
    console.log(this.userJson)
    this.addForm = this.fb.group({
      pt_code: new FormControl(),
      pt_name: new FormControl(),
      pt_remark: new FormControl()
    })
  }

  project_type_id = 'ef242726-7b97-4943-9318-5eb27c1bb8b5'
  addProjectTemplateDatas(): void {
    let projectTemplateDatas: any = {}
    projectTemplateDatas['code'] = this.pt_code;
    projectTemplateDatas['p_name'] = this.pt_name;
    //projectTemplateDatas['remark'] = this.pt_remark;
    projectTemplateDatas['creater'] = this.userJson.account_id
    projectTemplateDatas['status'] = "建檔中"
    projectTemplateDatas['type'] = "專案範本"

    projectTemplateDatas["customer_id"] = "00000000-0000-0000-0000-000000000000" //此階段還未新增
    projectTemplateDatas["salesman_id"] = "00000000-0000-0000-0000-000000000000"
    projectTemplateDatas["serviceman_id"] = "00000000-0000-0000-0000-000000000000"
    projectTemplateDatas['projectman_id'] = "00000000-0000-0000-0000-000000000000"


    projectTemplateDatas["origin_id"] = this.project_type_id

    this.HttpApiService.uploadProjectRequest_t(projectTemplateDatas).subscribe(
      ptRequest => {
        console.log("新增成功", ptRequest)
        this.pt_id = ptRequest
        location.href = '/main/projectinfo/project-template-edit/' + this.pt_id.body
      }
    )
  }
  reset() {
    //幫輸入欄位增加統一的類別或name後再reset會比較好
    this.pt_code = ''
    this.pt_name = ''
    this.pt_remark = ''
  }
}
