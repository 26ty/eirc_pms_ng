import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  selector: 'app-add2-dialog',
  templateUrl: './add2-dialog.component.html',
  styleUrls: ['./add2-dialog.component.scss']
})
export class Add2DialogComponent implements OnInit {

  add2Form: FormGroup;

  @Input() title!: string;

  constructor(
    private fb: FormBuilder,
  ) {
    this.add2Form = this.fb.group({
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
    if (this.add2Form.valid) {
      //   this.updateMemberPassword(member);

    } else {
      this.markFormGroupTouched(this.add2Form);
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
}
