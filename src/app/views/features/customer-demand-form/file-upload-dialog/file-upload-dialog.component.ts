import { Component, OnInit } from '@angular/core';
import { HttpApiService } from './../../../../api/http-api.service';
@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrls: ['./file-upload-dialog.component.scss']
})
export class FileUploadDialogComponent implements OnInit {

  fileToUpload: any;
  fileName: any = ''
  constructor(private HttpApiService: HttpApiService,) { }

  ngOnInit(): void {
  }
  handleFileInput(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  //上傳
  Upload() {
    this.HttpApiService.upload(this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log(error);
    });
  }

  //下載
  download() {
    var type = this.fileName.split('.')[1]
    this.HttpApiService.download(this.fileName).subscribe((res: any) => {
      var blob = new Blob([res], { type: 'application/' + type });
      let downloadURL = window.URL.createObjectURL(blob);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = this.fileName; //瀏覽器下載時的檔案名稱
      link.click();
    }, error => {
      console.log(error);
    });
  }

}