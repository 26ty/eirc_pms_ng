import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IconService } from './shared/services/icon.service';
import { HttpApiService } from './api/http-api.service';
const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentApplicationVersion = environment.appVersion;

  constructor(
    private iconService: IconService,
    private HttpApiService: HttpApiService
  ) {}

  userJson: any
  userToken:any
  ngOnInit() {
    /*取得使用者資訊*/
    //console.log(window.localStorage.getItem(TOKEN_KEY))
    //console.log(window.localStorage.getItem(USER_KEY))
    const tokenstring = window.localStorage.getItem(TOKEN_KEY)
    this.userToken = tokenstring
    console.log("token",tokenstring)

    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    //console.log("userJson", this.userJson)

    //驗證使用者有無token
    //this.HttpApiService.verifyToken(this.userToken)
    // this.HttpApiService.onTokenExpired(REFRESH_TOKEN_KEY)
  }
}
