import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input ,VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from "@angular/forms";
import { Subscription } from 'rxjs';

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

@Component({
  selector: 'app-file-update-dialog',
  templateUrl: './file-update-dialog.component.html',
  styleUrls: ['./file-update-dialog.component.scss']
})
export class FileUpdateDialogComponent implements OnInit {

  @Input()
  requiredFileType!:string;

  fileUpdateForm: FormGroup;

  fileItem:any;
  filename:any;
  @Input() title!: string;

  //fileToUpload: File = null;

  fileName = '';
  uploadProgress!:number;
  uploadSub!: Subscription;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.fileUpdateForm = this.fb.group({
      creat_at: ['', [Validators.required]],
      select: [, [Validators.required, Validators.minLength(6)]],
      min_length: ['', [Validators.required, Validators.minLength(6)]],
    }
    );
  }

  ngOnInit(): void {
  }

  // 送出
  submit(formValue: any) {
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.fileUpdateForm.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.fileUpdateForm);
    }
  }

  // 將formgroup改為觸碰狀態
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
  // reset() {
  //   //幫輸入欄位增加統一的類別或name後再reset會比較好
  // }
  // file = document.getElementById("file");
  // filename = document.getElementById("filename"); 

  //上傳檔案
  fileUpdate($event:any){
    const file = $event.target.files[0];
    
    if(!file){
      return;
    }
  }

  fileToUpload: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
  }




}

