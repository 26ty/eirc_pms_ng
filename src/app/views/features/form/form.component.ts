import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.accountForm = this.fb.group({
      account: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.minLength(6)]],
      new_password: ['', [Validators.minLength(6)]],
      confirm_password: ['', [Validators.minLength(6)]],
      company_name: ['', [Validators.required]],
      company_number: ['', [Validators.required, Validators.minLength(5)]],
      tax_id_number: ['', [Validators.required, Validators.minLength(8)]],
    }
    );
  }

  ngOnInit(): void {
    this.settingData();
  }

  // 設定form
  settingData() {
    this.accountForm.setValue(
      {
        account: '帳號名稱',
        password: '',
        new_password: '',
        confirm_password: '',
        company_name: '名稱',
        company_number: 'AAA123456',
        tax_id_number: '12345678',
      }
    );
  }

  // 確認新密碼
  comparePassword() {
    let password = this.accountForm.get('new_password');
    let checkPassword = this.accountForm.get('confirm_password');
    if (password!.value !== checkPassword!.value) {
      checkPassword!.setErrors({ compare: true });
    }
  }

  // 恢復資料
  backData() {
    this.settingData();
  }

  // 送出
  submit(formValue: any) {
    this.comparePassword();
    // if (formValue.new_password !== formValue.confirm_password) {
    //   alert('請確認密碼');
    //   return;
    // }
    if (this.accountForm.valid) {
      //   this.updateMemberPassword(member);
    } else {
      this.markFormGroupTouched(this.accountForm);
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
