import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './../../../shared/services/company.service';
import { SidenavService } from './../../../shared/services/sidenav.service';
import { AuthService } from './../../../_services/auth.service';
import { TokenStoreService } from './../../../_services/token-store.service';
import { HttpApiService } from './../../../api/http-api.service';
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;

  @ViewChild('btn') btn!: ElementRef;
  @ViewChild('icon') icon: any;

  companys: string[] = ['全部', 'A', 'B', 'C', 'D', 'E'];
  selectedCompany!: string;
  menuOpenStatus!: boolean;

  //檢查路由
  forCheckIsSetting: string[] = [
    'sap-byd-account',
    'company-info',
    'account',
  ];

  constructor(
    private HttpApiService: HttpApiService,
    private sidenav: SidenavService,
    private companyServ: CompanyService,
    private tokenStore: TokenStoreService,
    private authService: AuthService,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.btn.nativeElement && e.target !== this.icon._elementRef.nativeElement) {
        this.menuOpenStatus = false;
      }
    });
    this.router.events.subscribe(
      i => {
        this.changeCompanyToAllWhenUrl(this.forCheckIsSetting);
      }
    );
  }

  userJson: any
  ngOnInit(): void {
    this.selectedCompany = this.companys[0];
    //console.log(window.localStorage.getItem(TOKEN_KEY))
    //console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    //console.log(this.userJson)
    /*
    userJson={
      account: "isabelle_wu"
      account_id: "d65f3750-07cc-4f46-a62c-b2eb374ed8be"
      company_id: "2ba0bfac-dd9b-442b-9d7f-30fe8fb3d642"
    }
    */
    // this.HttpApiService.getToken()
    // this.HttpApiService.getUser()
    //取得使用者資訊
    if(this.userJson != null){
      this.getUserData()
    }
    //取得所有使用者 帳號和部門資訊列表 並篩選出該登入者的顯示
    this.getAllUserList()

    //取得個人已提報異動工時列表
    this.getByUserIdList(this.userJson.account_id)
  }

  usersData: any
  userAccountId: any

  userNameData: any
  userAccountData: any
  userBonitIdData: any
  getUserData(): void {
    this.userAccountId = this.userJson['account_id']
    //console.log(this.userJson['bonita_user_id'])
    //console.log(this.userAccountId)
    this.HttpApiService.getAccountOneRequest_t(this.userAccountId).subscribe(
      userRes => {
        console.log(userRes)
        this.userNameData = userRes.body.name
        this.userAccountData = userRes.body.account
        this.userBonitIdData = userRes.body.bonita_user_id
        this.userAccountId = userRes.body.account_id
        //console.log(this.userNameData)
        //console.log(this.userBonitIdData)
      }
    )
  }
  
  AllUserListData:any
  UserDepartmentData:any
  getAllUserList():void{
    this.HttpApiService.getAccountList().subscribe(
      res=>{
        console.log(res.body.accounts)
        this.AllUserListData= res.body.accounts
        console.log(this.userAccountId)
        for(let i in this.AllUserListData){
          // console.log(this.AllUserListData[i].account_id)
          if(this.userAccountId == this.AllUserListData[i].account_id){
            this.UserDepartmentData = this.AllUserListData[i].dep_name
          }
        }
        console.log(this.UserDepartmentData)
      }
    )
  }
  opensubmenu() {
    if (this.checkUrl(this.forCheckIsSetting)) {
      return;
    }
    this.menuOpenStatus = !this.menuOpenStatus;
  }

  checkUrl(urls: string[]) {
    if (!urls) {
      return;
    }
    return urls.some(i => this.router.url.includes(i));
  }
  logout(): void {
    Swal.fire({
      title: '您是否確定要登出?',
      //text: "送出後即不可返回!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '確認!',
      cancelButtonText: '取消!',
      confirmButtonColor: '#64c270',
      cancelButtonColor: '#FF5151',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.tokenStore.signOut();
        this.authService.logout();
        this.router.navigate(['login']);

        Swal.fire(
          {
            icon: 'success',
            title: '登出成功!',
            showConfirmButton: false,
            timer: 1500
          }
        )

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire(
          {
            icon: 'error',
            title: '取消登出!',
            showConfirmButton: false,
            timer: 1500
          }
        )
      }
    })

  }

  //個人已提報異動工時
  userLaborHourModifyData: any
  userLaborHourModifyTotal: any
  getByUserIdList(userId: any) {
    this.HttpApiService.getByUserIdListRequest(userId).subscribe(res => {
      // console.log("labor_hour_modify res", res.body.labor_hour_modify)
      this.userLaborHourModifyData = res.body.labor_hour_modify
      // console.log("個人已提報異動工時", this.userLaborHourModifyData)
      this.userLaborHourModifyTotal = res.body.labor_hour_modify.length
      // console.log("個人已提報異動工時筆數", this.userLaborHourModifyTotal)
    })
  }

  changeCompanyToAllWhenUrl(urls: string[]) {
    if (this.checkUrl(urls)) {
      this.selectCompany('全部');
    }
  }

  selectCompany(item: any) {
    this.selectedCompany = item;
    this.companyServ.changeCompany(item);
  }


  toggleRightSidenav() {
    this.sidenav.toggle();
  }

  opened() {
    console.log('芝麻開門');
  }

  closed() {
    console.log('芝麻關門');
  }
}
