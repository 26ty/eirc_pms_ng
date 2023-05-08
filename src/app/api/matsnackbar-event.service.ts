import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MatsnackbarEventService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // 位置設定
  position = {
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  };

  constructor(private _snackBar: MatSnackBar) { }
  
  openSnackBar(message: string, action?: string) {
    if (!action) {
      this._snackBar.open(message, '', this.position);
    }
    this._snackBar.open(message, action, this.position);
  }

  //當伺服器斷線時的回應
  openDisconnectionAlert(status:any){
    switch(status) {
      case false:
        this.openSnackBar('網路不佳！伺服器暫時無法存取，請與維護人員聯繫！', '確認');
    }
  }

  openErrorAlert(num: number, isLogin?: number) {
    if (isLogin) {
      switch (num) {
        case 400:
          Swal.fire({
            icon: 'error',
            title: '帳號密碼錯誤，請重新再試!',
            showConfirmButton: false,
            timer: 1500
          })
          break;

        case 401:
          Swal.fire({
            icon: 'error',
            title: '帳號密碼錯誤，請重新再試!',
            showConfirmButton: false,
            timer: 1500
          })
          break;

        case 403:
          Swal.fire({
            icon: 'error',
            title: '您無權限取得資料，請與貴司網管確認!',
            showConfirmButton: false,
            timer: 1500
          })
          break;

        case 415:
          Swal.fire({
            icon: 'error',
            title: '帳號密碼錯誤或未填寫，請重新再試!',
            showConfirmButton: false,
            timer: 1500
          })
          break;

        case 504:
          Swal.fire({
            icon: 'error',
            title: '伺服器無法訪問，請重新再試!',
            showConfirmButton: false,
            timer: 1500
          })
          break;

        case 500:
          Swal.fire({
            icon: 'error',
            title: '帳號密碼錯誤，請重新輸入!',
            showConfirmButton: false,
            timer: 1500
          })
          break;

        default:
          Swal.fire({
            icon: 'error',
            title: '伺服器無回應，請與維護人員聯繫!',
            showConfirmButton: false,
            timer: 1500
          })
          break;
      }
      return;
    }

    switch (num) {
      case 401:
        this.openSnackBar('伺服器過時請重新登入', '確認');

        break;
      case 504:
        this.openSnackBar('伺服器無法訪問', '確認');
        break;

      case 500:
        this.openSnackBar('網路不佳！資料暫時無法存取，請重新再試!', '確認');
        break;

      default:
        this.openSnackBar('伺服器無回應，請與維護人員聯繫', '確認');

        break;
    }
  }
  
}
