import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Jobtitlement, EditJobtitlement } from './../../../admin/models/organization';
import { OrganizationService } from './../../../_services/organization.service';
import { AdminHttpApiService } from '../../admin-api/admin-http-api.service';
import { HttpApiService } from './../../../api/http-api.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-position-edit-dialog',
  templateUrl: './position-edit-dialog.component.html',
  styleUrls: ['./position-edit-dialog.component.scss']
})
export class PositionEditDialogComponent implements OnInit {

  editForm: FormGroup; //編輯task
  name: any;
  bonita_role_id: any;
  creater: any;

  constructor(
    private fb: FormBuilder,
    public adminHttpApiService: AdminHttpApiService,
    private route: ActivatedRoute,
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private jobtitledata: any
  ) {
    this.editForm = this.fb.group({
      name: new FormControl(),
      bonita_role_id: new FormControl(),
      creater: new FormControl()
    })
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    //console.log(this.userJson)
    console.log(this.jobtitledata.item)
    this.editForm = new FormGroup({
      name: new FormControl(),
      bonita_role_id: new FormControl(),
      creater: new FormControl()
    })
    this.name = this.jobtitledata.item.name
    this.bonita_role_id = this.jobtitledata.item.bonita_role_id
    console.log(this.name,this.bonita_role_id)
  }

  editJobtitlement() {
    let editJobtitlement: any = {}
    editJobtitlement['j_id'] = this.jobtitledata.item.j_id
    editJobtitlement['creater'] = this.jobtitledata.item.creater
    editJobtitlement['name'] = this.name
    if (this.bonita_role_id == true) {
      editJobtitlement['bonita_role_id'] = "1"
    }
    else {
      editJobtitlement['bonita_role_id'] = "2"
    }
    console.log(editJobtitlement)
    this.adminHttpApiService.updateJobTitle(this.jobtitledata.item.j_id, editJobtitlement).subscribe(
      res => {
        console.log("成功新增資料", res)
        //this.uploadTransactionRecordRequests()
        location.href = 'admin/position'
      }
    )
  }

}
