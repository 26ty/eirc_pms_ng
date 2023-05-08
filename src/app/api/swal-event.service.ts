import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpApiService } from './http-api.service';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SwalEventService {

  constructor(private HttpApiService: HttpApiService) { }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)
  }

  //新增人員錯誤
  adduserError() {
    Swal.fire({
      icon: 'error',
      title: '該員工不存在',
      text: '請確認填寫內容',
      confirmButtonText: '確認!',
      confirmButtonColor: '#FF5151',
    })
  }

  simpleAlert(header: any, content: any, icon: any) {
    Swal.fire(
      header,
      content,
      icon
    )
  }

  //延遲
  loadingAlertNoback(html: any, timer: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
  }

  //b2-edit 延遲
  loadingAlertbackproject(html: any, timer: any, id: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    //window.location.assign(`main/projectinfo/project-manager-edit/${id}`);
    this.backproject(html, timer, id)
  }

  backproject(html: any, timer: any, id: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    window.location.assign(`main/projectinfo/project-manager-edit/${id}`);
  }

  //CR-edit 延遲
  loadingAlertbackCR(html: any, timer: any, id: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    //window.location.assign(`main/projectinfo/project-manager-edit/${id}`);
    this.backCR(html, timer, id)
  }

  backCR(html: any, timer: any, id: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    window.location.assign(`main/project-A/project-request-edit/${id}`);
  }

  //CR-edit 延遲
  loadingAlertbackCRcountersign(html: any, timer: any, id: any, task_id: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    //window.location.assign(`main/projectinfo/project-manager-edit/${id}`);
    this.backCRcountersign(html, timer, id, task_id)
  }

  backCRcountersign(html: any, timer: any, id: any, task_id: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    window.location.assign(`main/cr-countersign-director-edit/${id}/${task_id}`);
  }

  //延遲 回上一頁
  loadingAlert(html: any, timer: any) {
    Swal.fire({
      title: '載入中...',
      html: html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: timer,
      didOpen: () => {
        Swal.showLoading()

      }
    })
    window.history.back();
  }

  // ckeckContentAlert(title:string,icons:string,text:string,cancelButtonText:string){
  //   Swal.fire({
  //     title: title,
  //     icon: icons,
  //     text: '請確認專案任務資料完整性.',
  //     cancelButtonText: '確認!',
  //     confirmButtonColor: '#3085d6'
  //   })
  // }

  test() {
    Swal.fire({
      title: '已啟動!',
      icon: 'success',
      text: '此專案及任務已發配各階負責人.',
      cancelButtonText: '確認!',
      confirmButtonColor: '#3085d6'
    })
  }

  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(document_id: any, actor: any, content: any, creater: any, remark?: any): void {
    let trDatas: any = {};//接收資料
    trDatas['document_id'] = document_id
    trDatas['actor'] = actor
    trDatas['content'] = content
    trDatas['creater'] = creater
    trDatas['remark'] = remark
    console.log("trManagerDatas", trDatas)
    this.HttpApiService.uploadTransactionRecordRequest_t(trDatas)
      .subscribe(res => {
        console.log(res)
        console.log('成功新增紀錄')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }
}

