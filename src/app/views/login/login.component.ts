import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from './../../_services/auth.service';
import { TokenStoreService } from './../../_services/token-store.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpApiService } from './../../api/http-api.service';
//待補
import { MatsnackbarEventService } from './../../api/matsnackbar-event.service';
//待補
import { PasswordAlertComponent } from './password-alert/password-alert.component';
import Swal from 'sweetalert2'
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

const coco = 'dMoQX72CpWxh1';
// const org_id = 'itax';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  account_ex: any = [{ key: 'james', values: 'james' },
  { key: 'isabelle_wu', values: 'isabelle_wu' },
  { key: 'ruby.Fan', values: 'ruby.Fan' },
  { key: 'jun_kao', values: 'jun_kao' },
  { key: 'choc', values: 'choc' },
  { key: 'tytseng', values: 'tytseng' },
  { key: 'vinson_hsu', values: 'vinson_hsu' },
  { key: 'm1475369', values: 'm1475369' },
  { key: 'kitty', values: 'kitty' }]

  loginForm: FormGroup;
  loading = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string | null = '';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  accountForm: FormGroup
  // accountForm = this.formBuilder.group({
  //   username: ['', Validators.compose([Validators.required])],
  //   // account: ['', [Validators.required, Validators.minLength(6)]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  // });
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStore: TokenStoreService,
    private router: Router,
    private _sankBar: MatSnackBar,
    private HttpApiService: HttpApiService,
    private matsnackbarEventServ: MatsnackbarEventService,
    public dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      company_id: ['', [Validators.required]],
      account: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      //org_id: ['', [Validators.required]],
    });
  }

  company_id: any = '2ba0bfac-dd9b-442b-9d7f-30fe8fb3d642'
  account: any
  account_id: any
  password: any = '1234' //default
  ngOnInit(): void {
    //this.HttpApiService.signOut();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.accountForm = new FormGroup({
    //   username : new FormControl(),
    //   password : new FormControl()
    // })
  }

  //輸入帳密錯誤提示視窗
  opErrLogin() {
    // this._sankBar.open("輸入帳號密碼錯誤，請重新輸入!", "確認", {
    //   duration: 5000,
    //   horizontalPosition: this.horizontalPosition,
    //   verticalPosition: this.verticalPosition
    // })
    Swal.fire({
      icon: 'error',
      title: '輸入帳號密碼錯誤，請重新輸入!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //輸入帳密錯誤提示視窗
  opLogin() {
    // this._sankBar.open("登入成功!","確認",{
    //   duration: 3000,
    //   horizontalPosition:this.horizontalPosition,
    //   verticalPosition:this.verticalPosition
    // })
    Swal.fire({
      icon: 'success',
      title: '登入成功!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  userDatas: any;
  userDatasList: any[] = []
  session_userDatas: any = {};
  login(company_id: string, account: string, password: string, coco?: any) {

    this.HttpApiService.getAccountRequest().subscribe(
      userRes => {
        this.userDatas = userRes.body.accounts
        console.log("userDatas",this.userDatas)
        for (let i in this.userDatas) {
          if (account == this.userDatas[i].account) {
            this.userDatasList.push({
              "account_id": this.userDatas[i].account_id,
              "company_id": this.userDatas[i].company_id,
              "account": this.userDatas[i].account,
              "name": this.userDatas[i].name,
              "role_id": this.userDatas[i].role_id,
              "bonita_user_id": this.userDatas[i].bonita_user_id
            })
          }
        }
        //console.log("抓取個人資料userDatasList",this.userDatasList)

        for (let j in this.userDatasList) {

          this.session_userDatas['company_id'] = this.userDatasList[j].company_id
          this.session_userDatas['account_id'] = this.userDatasList[j].account_id
          this.session_userDatas['account'] = this.userDatasList[j].account
          this.session_userDatas['bonita_user_id'] = this.userDatasList[j].bonita_user_id
        }
        //console.log("session_userDatas",this.session_userDatas)

        this.HttpApiService.auth(company_id, account, password, coco).subscribe(
          res => {
            console.log("auth res.body",res.body);
            console.log("auth res.code",res.code);
            if (res.code != 200) {

              this.account = ''
              this.password = ''
              this.matsnackbarEventServ.openErrorAlert(res.code,1)
              //this.opErrLogin()
              
              return;
            } else {
              this.HttpApiService.saveToken(res.body.access_token);//存入token
              this.HttpApiService.saveRefreshToken(res.body.refresh_token);//存入token
              this.HttpApiService.saveUser(this.session_userDatas);//存入user

              // console.log("access_token",res.body.access_token);
              // console.log("refresh_token",res.body.refresh_token);

              //this.matsnackbarEventServ.openSnackBar('成功登入');
              this.opLogin()
              this.router.navigateByUrl(`/main`);
            }

          },
          err => {
            console.log(err.ok);
            this.loading = false;
            this.matsnackbarEventServ.openErrorAlert(err.ok, 1);
          }
        );
      },
      err => {
        console.log(err);
        if(err.ok ==false){
          // this.matsnackbarEventServ.openSnackBar('發生未知錯誤，請與伺服器人員聯絡!', '確認');
          this.matsnackbarEventServ.openDisconnectionAlert(err.ok);
        }
      }

    )

    this.loading = true;



  }

  submit() {
    // if (!this.CaptchaResponse) {
    //   return alert('è«‹é©—è­‰æˆ‘ä¸æ˜¯æ©Ÿå™¨äºº!');
    // }
    if (this.loginForm.valid) {

      const { company_id, account, password } = this.loginForm.value;
      this.login(company_id, account, password, coco);
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(PasswordAlertComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // å°‡formgroupæ”¹ç‚ºè§¸ç¢°ç‹€æ…‹
  private markFormGroupTouched(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  // username:any = ''
  // password:any = ''
  // login(): void{
  //   console.log(this.username,this.password)
  //   this.HttpApiService.bonita_login(this.username,this.password).subscribe(res =>{
  //     console.log("登入bonita成功",res)
  //     },
  //     (err: any) => {
  //       console.log(this.username,this.password)
  //       console.log('err:', err);
  //     }
  //   )
  // }


  // onSubmit(): void {
  //   const { username, password } = this.accountForm.value;

  //   if (username == 'admin' && password == 'admin') {
  //     this.router.navigateByUrl('admin');
  //     this._sankBar.open('登入成功', ``, {
  //       duration: 1000,
  //       horizontalPosition: this.horizontalPosition,
  //       verticalPosition: this.verticalPosition
  //     });
  //   }

  //     this.authService.login(username, password).subscribe(
  //       data => {
  //         this.tokenStore.saveToken(data.token);
  //         this.tokenStore.saveUser(data.user);
  //         this.tokenStore.saveRole(data.role);

  //         this.isLoginFailed = false;

  //         this.role = this.tokenStore.getUser().role;
  //         if (this.role == "admin") {
  //           this.isLoggedIn = true;
  //           console.log(this.isLoggedIn);
  //           this.router.navigateByUrl('admin');
  //           this._sankBar.open('登入成功', ``, {
  //             duration: 1000,
  //             horizontalPosition: this.horizontalPosition,
  //             verticalPosition: this.verticalPosition
  //           });

  //         } else {
  //           console.log(this.authService.isLoggedIn);
  //           this.isLoggedIn = true;
  //           this.router.navigateByUrl('/inbox');
  //           this._sankBar.open('登入成功', ``, {
  //             duration: 1000,
  //             horizontalPosition: this.horizontalPosition,
  //             verticalPosition: this.verticalPosition
  //           });

  //         }
  //       },
  //       error => {
  //         this.errorMessage = error.message;
  //         this.isLoginFailed = true;
  //         this._sankBar.open('登入失敗', `${error.message}`, {
  //           duration: 1000,
  //           horizontalPosition: this.horizontalPosition,
  //           verticalPosition: this.verticalPosition
  //         });
  //       }

  //     )



  // }
}
