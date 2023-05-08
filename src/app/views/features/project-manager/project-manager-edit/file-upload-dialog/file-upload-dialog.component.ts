import { Component, OnInit,Inject } from '@angular/core';
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

  filescol: string[] = ['file_name', 'file_extension', 'creater_name', 'create_time'];
  //宣告檔案files的dataSource
  filesDataSource = new MatTableDataSource();
  public filesdata: Filedata[] = []
  public alarm: string[] = []
  public fileBase64:string
  public fileBinary:string
  public fileExtension:string
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

    console.log(this.fileDocumentData)
  }

  FilesList:any
  filesTotal:any
  getUserUploadedFilesList(){
    this.HttpApiService.getDocumentsUserFilesList(this.fileDocumentData.documents_id,this.userJson.account_id).subscribe(
      res => {
        this.FilesList = res
        console.log(this.FilesList.body.file)
        this.filesDataSource = this.FilesList.body.file;
        this.filesTotal = res.body.total;
      }
    )
  }

  getfile:any
  getfiledata(event:any) {
    this.filesdata=[]
    this.alarm = []
    this.getfile = <HTMLInputElement>document.getElementById('file')
    for(var i = 0;i < this.getfile.files.length ; i++){
      this.transformFile(this.getfile.files[i])
      console.log(this.getfile.files[i])
      console.log(this.getfile.files[i].name)
    }
    console.log("this.getfile",this.getfile)
    console.log("this.getfile.name",this.getfile.name)
    console.log("this.fileBase64",this.fileBase64)
  }

  filedata:any={}
  transformFile(getfile:any){
    let reader = new FileReader();
    reader.readAsDataURL(getfile);
    reader.onload = () => {
      this.fileBase64 = <string>reader.result
      //this.fileBinary = atob(this.fileBase64.substring(this.fileBase64.indexOf(',') + 1))
      console.log(this.fileBase64)
      console.log(this.fileBinary)
      // let data ={
      //   fileName:getfile.name,
      //   fileBinary:this.fileBinary,
      //   fileBase64:this.fileBase64
      // }
      this.fileExtension = getfile.name.slice((getfile.name.lastIndexOf(".") - 1 >>> 0) + 2);
      let base64test = this.fileBase64.split(',').pop();
      let filename = getfile.name.split('.').shift()
      // let filename = getfile.name.slice((getfile.name.lastIndexOf(".") - 1 >>> 0) + 2);
      console.log(filename)
      console.log(this.fileExtension)
      this.filedata['documents_id']=this.fileDocumentData.documents_id
      this.filedata['file_name']= filename
      this.filedata['file_extension']=this.fileExtension
      this.filedata['base64']=base64test
      this.filedata['creater']=this.userJson.account_id
      console.log(this.filedata)
    }
  }

  postimageRes:any
  public postfile(){
    this.HttpApiService.postimage(this.filedata).subscribe(res=>{
      console.log(res)
      this.postimageRes = res
      if(this.postimageRes.code != 200){
        Swal.fire(
          {
            title: `檔案上傳失敗`,
            icon: 'error',
            confirmButtonText: '確認!',
            confirmButtonColor: '#FF5151',
            reverseButtons: true
          }
        )
      }else{
        Swal.fire({
          title: `上傳成功！`,
          icon: 'success',
          confirmButtonText: '確認!',
          confirmButtonColor: '#64c270',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.getUserUploadedFilesList()
          }
        })
      }
    })
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
