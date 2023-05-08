import { Component, OnInit, Inject } from '@angular/core';
import { HttpApiService } from './../../../../../api/http-api.service';
import { Filedata } from 'src/app/shared/models/model';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//swal
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent implements OnInit {

  fileToUpload: any;
  fileName: any = ''
  constructor(
    private HttpApiService: HttpApiService,
    @Inject(MAT_DIALOG_DATA) private fileDocumentData: any

  ) { }


  public filesdata: Filedata[] = []
  public alarm: string[] = []
  public fileBase64: string
  public fileBinary: string
  public fileExtension: string
  reader = new FileReader()

  userJson: any
  ngOnInit(): void {
    /*取得使用者資訊*/
    //console.log(window.localStorage.getItem(TOKEN_KEY))
    const tokenstring = window.localStorage.getItem(TOKEN_KEY)
    console.log("token", tokenstring)

    //console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)
    // console.log(this.filesdata)

    this.getUserUploadedFilesList()

    this.getAllFilesRequest()

    console.log(this.fileDocumentData)
  }

  //取得該單據 該使用者上傳之檔案
  //宣告檔案files的dataSource
  filesDataSource = new MatTableDataSource();
  filescol: string[] = ['file_name', 'file_extension', 'create_time', 'file_size'];
  FilesList: any
  filesTotal: any
  getUserUploadedFilesList() {
    this.HttpApiService.getDocumentsUserFilesList(this.fileDocumentData.documents_id, this.userJson.account_id).subscribe(
      res => {
        this.FilesList = res
        console.log("取得個人上傳附件res", this.FilesList.body.file)
        this.filesDataSource = this.FilesList.body.file;
        this.filesTotal = res.body.total;
      }
    )
  }

  //取得該單據檔案總覽
  //宣告檔案files的dataSource
  AllfilesDataSource = new MatTableDataSource();
  Allfilescol: string[] = ['file_name', 'file_extension', 'creater_name', 'create_time', 'file_size'];
  AllfileName: any = ''
  AllfilesTotal: any
  getAllFilesRequest(): void {
    this.HttpApiService.getDocumentsFilesList(this.fileDocumentData.documents_id).subscribe(
      res => {
        console.log("取得附件總覽res", res.body.file)
        this.AllfilesDataSource = res.body.file;
        this.AllfilesTotal = res.body.total;
      }
    )
  }

  //取得上傳檔案資料
  getfile: any
  getfiledata(event: any) {
    this.limit_size = false
    this.filesdata = []
    this.alarm = []
    this.filebytes = ''
    this.getfile = <HTMLInputElement>document.getElementById('file')
    for (var i = 0; i < this.getfile.files.length; i++) {
      this.transformFile(this.getfile.files[i])
      console.log(this.getfile.files[i])
      console.log(this.getfile.files[i].name)
      console.log(this.getfile.files[i].size)
    }
    console.log("this.getfile", this.getfile)
    console.log("this.getfile.name", this.getfile.name)
    console.log("this.fileBase64", this.fileBase64)
  }

  //轉碼
  filedata: any = {}
  filebytes: any
  transformFile(getfile: any) {
    let reader = new FileReader();
    reader.readAsDataURL(getfile);
    reader.onload = () => {
      this.fileBase64 = <string>reader.result
      //this.fileBinary = atob(this.fileBase64.substring(this.fileBase64.indexOf(',') + 1))
      console.log(this.fileBase64)
      console.log(this.fileBinary)

      this.fileExtension = getfile.name.slice((getfile.name.lastIndexOf(".") - 1 >>> 0) + 2);
      let base64test = this.fileBase64.split(',').pop();
      let filename = getfile.name.split('.').shift()
      this.filebytes = getfile.size
      this.bytechange(this.filebytes)
      // let filename = getfile.name.slice((getfile.name.lastIndexOf(".") - 1 >>> 0) + 2);
      console.log(filename)
      console.log(this.fileExtension)
      this.filedata['documents_id'] = this.fileDocumentData.documents_id
      this.filedata['file_name'] = filename
      this.filedata['file_extension'] = this.fileExtension
      this.filedata['base64'] = base64test
      this.filedata['creater'] = this.userJson.account_id
      this.filedata['size'] = this.filebytes
      console.log(this.filedata)
    }
  }
  limit_size = false

  //轉換檔案格式大小
  bytechange(bytes: any): void {
    if (bytes >= 1024 * 1024 * 8) {
      this.limit_size = true
    }
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    this.filebytes = (bytes / Math.pow(1024, i)).toFixed(2) + sizes[i]
    console.log(this.filebytes)
  }

  dialogLoading() {
    Swal.fire({
      title: '載入中...',
      html: '請稍等',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 4000,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  //上傳
  postimageRes: any
  public postfile() {
    //新增loading
    //loading
    this.dialogLoading()
    this.HttpApiService.postimage(this.filedata).subscribe(res => {
      console.log(res)
      this.postimageRes = res
      if (this.postimageRes.code != 200) {
        /*新增審核紀錄 */
        this.uploadTransactionRecordRequests(this.fileDocumentData.tu_id, '上傳失敗', '附件')
        this.uploadTransactionRecordRequests(this.fileDocumentData.documents_id, '上傳失敗', '附件')
        Swal.fire({
          title: `檔案上傳失敗`,
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload()
          }
        })
      } else {
        this.uploadTransactionRecordRequests(this.fileDocumentData.tu_id, '上傳', '附件')
        this.uploadTransactionRecordRequests(this.fileDocumentData.documents_id, '上傳', '附件')
        Swal.fire({
          title: `上傳成功！`,
          icon: 'success',
          confirmButtonText: '確認!',
          confirmButtonColor: '#64c270',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.getUserUploadedFilesList()
            this.getAllFilesRequest()
          }
        })
      }
    },
      (err: any) => {
        console.log('err:', err);
        this.uploadTransactionRecordRequests(this.fileDocumentData.tu_id, '上傳失敗', '附件')
        this.uploadTransactionRecordRequests(this.fileDocumentData.documents_id, '上傳失敗', '附件')
        Swal.fire({
          title: `檔案上傳失敗`,
          icon: 'error',
          confirmButtonText: '確認!',
          confirmButtonColor: '#FF5151',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload()
          }
        })
      })
  }


  fileDownload(href: any) {
    window.open(href, '_blank')

  }

  tr_remark: any
  //產生一筆新的transaction_record資料格式-------------------------------------------
  uploadTransactionRecordRequests(t_id: any, actor: any, content: any, remark?: any): void {
    let trManagerDatas: any = {};//接收資料
    trManagerDatas['document_id'] = t_id
    trManagerDatas['actor'] = actor
    trManagerDatas['content'] = content
    trManagerDatas['remark'] = remark
    trManagerDatas['creater'] = this.userJson.account_id
    console.log("trManagerDatas", trManagerDatas)
    this.HttpApiService.uploadTransactionRecordRequest_t(trManagerDatas)
      .subscribe(taskuserRequest => {
        console.log(taskuserRequest)
        console.log('成功紀錄')
      },
        (err: any) => {
          console.log('err:', err);
        }
      );
  }

  // handleFileInput(event: any) {
  //   this.fileToUpload = event.target.files[0];
  // }

  // Upload() {
  //   this.HttpApiService.upload(this.fileToUpload).subscribe(data => {
  //     // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // download() {
  //   var type = this.fileName.split('.')[1]
  //   this.HttpApiService.download(this.fileName).subscribe((res: any) => {
  //     var blob = new Blob([res], { type: 'application/' + type });
  //     let downloadURL = window.URL.createObjectURL(blob);
  //     let link = document.createElement('a');
  //     link.href = downloadURL;
  //     link.download = this.fileName; //瀏覽器下載時的檔案名稱
  //     link.click();
  //   }, error => {
  //     console.log(error);
  //   });
  // }

}
