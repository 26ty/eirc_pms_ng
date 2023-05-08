import { Project, Task, Meeting, Attendee, Countersign, ManufactureOrder } from './../shared/models/models';
import { ProjectManagerRequest, ProjectTemplate, Filedata } from './../shared/models/model';
import { CustomerRequest } from './../shared/models/model';
import { TaskRequest } from './../shared/models/model';
import { EmailRequest } from './../shared/models/model';
import { MeetingRequest } from './../shared/models/model';
import { FilesRequest } from './../shared/models/model';
import { MachineCombined } from './../shared/models/model';
import { PlugIn } from './../shared/models/model';
import { AntivirusSoftware } from './../shared/models/model';
import { TestTaskRequest } from './../shared/models/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LaborHourRequest } from './../shared/models/model';
import { Router } from '@angular/router';
import { debounceTime, retry } from 'rxjs/operators';
import { Users } from '../shared/models/user'
import { startFormInput } from '../shared/models/bonita-struct';
import { TreeNode } from 'primeng/api';
import { dmApprovalStatus } from '../shared/models/bonita-struct';
import { updateTaskUserData } from '../shared/models/bonita-struct';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AnyCnameRecord } from 'dns';

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})



export class HttpApiService {
  //private BaseUrl: string = 'http://163.18.110.100:8080/authority/v1.0';//伺服器網址//163.18.110.100

  // private BaseUrl: string = 'http://localhost:8080/authority/v1.0';//伺服器網址//163.18.110.100
  private LoginUrl: string = '/login'
  private BaseUrl: string = 'https://api.testing.eirc.app/authority/v1.0';

  private HTAUrl: string = 'https://kmssapi.website'
  //宣告傳去的格式

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  //file---------------------------------------------------------------------------------------------------------
  public postimage(file: Filedata[]): Observable<Filedata> {
    return this.http.post<Filedata>(this.BaseUrl + '/file', file, httpOptions)
  }

  getDocumentsFilesList(documents_id: any): Observable<any> {
    const url = `${this.BaseUrl}/file/GetByDocumentID/${documents_id}`
    return this.http.get(url)
  }

  getDocumentsUserFilesList(documents_id: any, user_id: any): Observable<any> {
    const url = `${this.BaseUrl}/file/GetByDocumentIDUserID/${documents_id}/${user_id}`
    return this.http.get(url)
  }

  //阻擋無token的使用者 一律倒回登入頁面-----------------------------------------------------------------------------
  userJson: any
  userToken: any
  getSessionToken(userJson: any, userToken: any) {
    /*取得使用者資訊*/
    //console.log(window.localStorage.getItem(TOKEN_KEY))
    const tokenstring = window.localStorage.getItem(TOKEN_KEY)
    this.userToken = tokenstring
    console.log("userToken", this.userToken)

    //console.log(window.localStorage.getItem(USER_KEY))
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log("userJson", this.userJson)

    userJson = this.userJson
    userToken = this.userToken
  }

  verifyToken(authToken: string) {
    if (authToken == null) {
      location.href = this.LoginUrl
    }
  }

  //選取該使用者當月的工時表
  getByUserMonthLaobrList(userId: any, firstDate: any): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour/GetByUserIdMonthList/${userId}/${firstDate}`
    return this.http.get(url);
  }

  //寄信通知 api--------------------------------------------------------------------------------------------------
  //上傳寄送郵件
  SendEmailRequest_t(emailRequest: EmailRequest) {
    const url = `${this.BaseUrl}/SendEmail`;
    return this.http.post(url, emailRequest);
  }

  //簽核流程 api--------------------------------------------------------------------------------------------------

  //首頁一次取得所有該使用者可執行的單據
  getUserCaseCount(account: any, bonitaUserId: any) {
    const url = `${this.BaseUrl}/GetBonitaCaseCount/${account}/${bonitaUserId}`
    return this.http.get(url);
  }
  //客需單bonita

  //啟動單據(客需單)
  startCRForm(id: any, startFormData: startFormInput): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/A1UpdatedCaseID/${id}`;
    return this.http.patch(url, startFormData);
  }

  //A1獲取使用者可執行的單 (重啟單)
  getA1BonitaCaseListStart(account: any, bonitaCaseID: any): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListStart/${account}/${bonitaCaseID}`;
    return this.http.get(url);
  }


  //審核單據(客需單)、新建任務
  ReviewCRForm(account: string, taskId: any, startFormData: startFormInput): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/A1ReviewTask/${account}/${taskId}`;
    return this.http.patch(url, startFormData);
  }

  //B2啟動單據
  startProjectForm(id: any, startFormData: startFormInput): Observable<any> {
    const url = `${this.BaseUrl}/project/B2UpdatedCaseID/${id}`;
    return this.http.patch(url, startFormData);
  }

  //C2啟動
  startManufactureForm(id: any, startFormData: startFormInput): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_order/C2UpdatedCaseID/${id}`;
    return this.http.patch(url, startFormData);
  }

  //C2重新啟動
  getrestartManufactureForm(account: any, bonitaCaseID: any): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_order/GetC2BonitaCaseListStart/${account}/${bonitaCaseID}`;
    return this.http.get(url);
  }

  //C2審核
  reviewManufactureForm(account: string, taskId: any, dmApprovalStatus: dmApprovalStatus): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_order/C2ReviewTask/${account}/${taskId}`;
    return this.http.patch(url, dmApprovalStatus);
  }

  //A1客需單簽核------------------------------------------------------------------------------------------------------

  //A1獲取使用者可執行的單 (業務經理審核)
  getCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListDepartment/${account}/${userId}`
    return this.http.get(url)
  }

  //A2獲取使用者可執行的單 (回覆簽核意見並指定專案經理)
  getDirectorCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListDirector/${account}/${userId}`
    return this.http.get(url)
  }

  //A3獲取使用者可執行的單 (PM人選確認並負責RD部門勾選)
  getTopCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListTop/${account}/${userId}`
    return this.http.get(url)
  }

  //Ｃ獲取使用者可執行的單 (會簽主管指派各部門人員(可能1人或多人))
  getDispatchCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListDispatch/${account}/${userId}`
    return this.http.get(url)
  }

  //Ｄ獲取使用者可執行的單 (會簽人員送交評估報告)
  getEvaluationCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListEvaluation/${account}/${userId}`
    return this.http.get(url)
  }

  //Ｅ獲取使用者可執行的單 (會簽主管審核)
  getCountersignCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListCountersign/${account}/${userId}`
    return this.http.get(url)
  }

  //F 獲取使用者可執行的單 (PM送審評估報告) Pm待回報客需單
  getPMEvaluationCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListPMEvaluation/${account}/${userId}`
    return this.http.get(url)
  }

  //G 獲取使用者可執行的單 (業務簽核)
  getBusinessCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListBusiness/${account}/${userId}`
    return this.http.get(url)
  }
  //H 獲取使用者可執行的單 (業務經理簽核)
  getBusinessManagerCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListBusinessManager/${account}/${userId}`
    return this.http.get(url)
  }
  // 獲取使用者可執行的單 (業務結案)
  getBusinessCloseCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListBusinessClose/${account}/${userId}`
    return this.http.get(url)
  }
  //I 獲取使用者可執行的單 (業務副總簽核)
  getBusinessDirectorCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListBusinessDirector/${account}/${userId}`
    return this.http.get(url)
  }
  //J 獲取使用者可執行的單 (業務經理結案審核)
  getDepartmentCloseCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListDepartmentClose/${account}/${userId}`
    return this.http.get(url)
  }
  //K 獲取使用者可執行的單 (業務副總結案審核)
  getDirectorCloseCloseCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListDirectorClose/${account}/${userId}`
    return this.http.get(url)
  }
  //L 獲取使用者可執行的單 (總經理結案審核)
  getTopCloseCloseCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListTopClose/${account}/${userId}`
    return this.http.get(url)
  }
  //M 獲取使用者可執行的單 
  getCountersignCloseCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListCountersignClose/${account}/${userId}`
    return this.http.get(url)
  }
  //製造部主管通知
  getA1BonitaCaseListProductionClose(account: string, userId: any): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListProductionClose/${account}/${userId}`
    return this.http.get(url)
  }
  //N 獲取使用者可執行的單 
  getPmCloseCrReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListPMClose/${account}/${userId}`
    return this.http.get(url)
  }
  //A1獲取新增任務的任務ID
  getTaskReturnList(account: string, bonitaCaseId: any, bonitaUserId: any): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListTask/${account}/${bonitaUserId}/${bonitaCaseId}`
    return this.http.get(url)
  }
  //A1獲取使用者可執行的單 (任務完工送審)
  getTaskFinishReturnList(account: string, bonitaCaseId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListTaskFinish/${account}/${bonitaCaseId}`
    return this.http.get(url)
  }
  //A1獲取使用者可執行的單 (任務直屬主管審核)
  getTaskFinishManagerReturnList(account: string, bonitaCaseId: any) {
    const url = `${this.BaseUrl}/customer_demand/GetA1BonitaCaseListTaskFinishManager/${account}/${bonitaCaseId}`
    return this.http.get(url)
  }


  //B2------------------------------------------------------------------------------------------------------

  //獲取使用者可執行的單(pm)待送審
  getUserCaseList(account: string, userId: any) {
    const url = `${this.BaseUrl}/project/GetB2BonitaCaseListPM/${account}/${userId}`
    return this.http.get(url)
  }

  //獲取使用者可執行的單(pm)待完工
  getUserAuditCaseList(account: string, userId: any): Observable<any> {
    const url = `${this.BaseUrl}/project/GetB2BonitaCaseListTop/${account}/${userId}`
    return this.http.get(url)
  }

  //獲取使用者可執行的單 (專案任務工作回報)
  getUserTMCaseList(account: string, userId: any): Observable<any> {
    const url = `${this.BaseUrl}/project/GetB2BonitaCaseListTM/${account}/${userId}`
    return this.http.get(url)
  }

  //獲取使用者可執行的單 (會簽)
  getUserCounterSignList(account: string, userId: any): Observable<any> {
    const url = `${this.BaseUrl}/project/GetB2BonitaCaseListCountersign/${account}/${userId}`
    return this.http.get(url)
  }

  //獲取使用者可執行的單 (專案任務完工送審)
  getUserTMAuditCaseList(account: string, userId: any): Observable<any> {
    const url = `${this.BaseUrl}/project/GetB2BonitaCaseListDepartment/${account}/${userId}`
    return this.http.get(url)
  }

  //獲取使用者可執行的單 (確認會簽內容)
  GetTaskCheckCaseList(account: string, userId: any): Observable<any> {
    const url = `${this.BaseUrl}/project/GetB2BonitaCaseListConfirm/${account}/${userId}`
    return this.http.get(url)
  }

  //最高主管PM審核
  PmReviewCase(account: string, taskId: any, dmApprovalStatus: dmApprovalStatus) {
    const url = `${this.BaseUrl}/project/B2ReviewTask/${account}/${taskId}`
    return this.http.patch(url, dmApprovalStatus)
  }

  //部門主管PM審核
  DmReviewCase(account: string, taskId: any, dmApprovalStatus: dmApprovalStatus) {
    const url = `${this.BaseUrl}/project/B2ReviewTask/${account}/${taskId}`
    return this.http.patch(url, dmApprovalStatus)
  }

  //更改task_user狀態
  UpdateTaskUserStatus(tuId: any, updateTaskUserData: updateTaskUserData): Observable<any> {
    const url = `${this.BaseUrl}/task_user/UpdatedStatus/${tuId}`
    return this.http.patch(url, updateTaskUserData)
  }

  //C2----------------------------------------------------------------------

  //Bonita C2獲取使用者可執行的單 (單位主管審核)
  getManufactureReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/manufacture_order/GetC2BonitaCaseListDepartment/${account}/${userId}`
    return this.http.get(url)
  }

  //Bonita C2獲取使用者可執行的單 (生管-製造-審核)
  getManufactureManufactureReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/manufacture_order/GetC2BonitaCaseListManufacture/${account}/${userId}`
    return this.http.get(url)
  }

  //Bonita C2獲取使用者可執行的單 (總經理審核)
  getTopManufactureReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/manufacture_order/GetC2BonitaCaseListTop/${account}/${userId}`
    return this.http.get(url)
  }

  //Bonita C2獲取使用者可執行的單 (確認單號開啟)
  getConfirmManufactureReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/manufacture_order/GetC2BonitaCaseListConfirm/${account}/${userId}`
    return this.http.get(url)
  }

  //Bonita C2獲取使用者可執行的單 (儲存製令單號)
  getSaveManufactureReturnList(account: string, userId: any) {
    const url = `${this.BaseUrl}/manufacture_order/GetC2BonitaCaseListSave/${account}/${userId}`
    return this.http.get(url)
  }


  //-----------------------------------------------------------------------------------------------------------------------
  auth(company_id: string, account: string, password: string, coco: string): Observable<any> {
    return this.http.post(this.BaseUrl + `/login/web`, { 'company_id': company_id, 'account': account, 'password': password, coco });
  }

  signOut(): void {
    window.localStorage.clear();
  }

  getKey(): string | null {
    return window.localStorage.getItem(LIST_KEY);
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);//移除
    window.localStorage.setItem(TOKEN_KEY, token);//建立
  }

  saveRefreshToken(r_token: string): void {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);//移除
    window.localStorage.setItem(REFRESH_TOKEN_KEY, r_token);//建立
  }

  saveUser(user: Users): void {
    const userStr = JSON.stringify(user);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, userStr);
  }

  getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  getUser(): string | null {
    return window.localStorage.getItem(USER_KEY);
  }

  logout() {
    this.signOut();
    this.router.navigate(['/']);
  }

  onTokenExpired(refresh_token: any) {
    // const refresh_token = this.authData.token.refresh_token;
    // const refresh_token = 'this.authData.token.refresh_token';

    if (!false) {
      // this.toastr.warning('ç™»å…¥é€¾æ™‚ç³»çµ±è‡ªå‹•ç™»å‡º', 'ç³»çµ±è¨Šæ¯');
      return this.logout();
    }

    this.http.post<any>(`${this.BaseUrl}/refresh`, { "refresh_token": refresh_token })
      .pipe(debounceTime(1000))
      .subscribe(res => {
        console.log("refresh res", res)
        this.saveToken(res.body.access_token);//存入token
        this.saveRefreshToken(res.body.refresh_token);//存入token
        // this.authData.token = r.data;
        // this.saveCookie(AUTH_DATA, this.authData);
        // this.toastr.warning('ç™»å…¥é€¾æ™‚è«‹å˜—è©¦åˆ·æ–°ç€è¦½å™¨', 'ç³»çµ±è¨Šæ¯');
      },
        () => {
          this.logout();
          // this.toastr.error('ç™»å…¥è¶…æ™‚ç³»çµ±è‡ªå‹•ç™»å‡º', 'ç³»çµ±è¨Šæ¯');
        }
      );
  }



  //bonita_login---------------------------------------------------------------------------------
  // bonita_login(username: string, password: string): Observable<any> {
  //   const body = new HttpParams()
  //     .set('username', username)
  //     .set('password', password);

  //   const url = `${this.BonitaUrl}/bonita/loginservice`;
  //   return this.http.post(url,
  //     body.toString(),
  //     {
  //       headers: new HttpHeaders()
  //         .set('Content-Type', 'application/x-www-form-urlencoded')
  //     }
  //   );
  // }

  //任務轉移--------------------------------------------------------------------------------------------------
  //取得待審核單據(任務轉移)
  getTaskTransferRequest(account: any, bonita_user_id: any): Observable<any> {
    const url = `${this.BaseUrl}/GetBonitaCaseDetail/${account}/${bonita_user_id}`;
    return this.http.get(url);
  }

  //任務轉移(可多筆)
  taskTransferRequest(account: any, tRequest: Task): Observable<any> {
    const url = `${this.BaseUrl}/BonitaTransferTask/${account}`;
    return this.http.patch(url, tRequest);
  }


  //-------------------------transaction record(異動紀錄)------------------------------------------------------------------
  //取得transaction record資料
  getTransactionRecordRequest_t(page: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/transaction_record?page=' + page + '&limit=20');
  }
  //上傳transaction_record資料
  uploadTransactionRecordRequest_t(trRequest: Project) {
    const url = `${this.BaseUrl}/transaction_record`;
    return this.http.post(url, trRequest);
  }
  //取得單一transaction_record資料
  getOneTransactionRecordRequest_t(id: any): Observable<any> {
    const url = `${this.BaseUrl}/transaction_record/GetByDocumentIDUserList/${id}?page=1&limit=20`;
    return this.http.get(url);
  }
  //刪除transaction_record資料
  deleteTransactionRecordRequest_t(id: string) {
    const url = `${this.BaseUrl}/transaction_record/${id}`;
    return this.http.delete(url);
  }

  //-------------------------project------------------------------------------------------------------
  //取得project資料
  getProjectRequest_t(page: number, limit: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/project?page=' + page + '&limit=' + limit);
  }

  //取得projectlistuser資料
  getProjectListRequest_t(page: number, limit: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/project/ProjectListUser?page=' + page + '&limit=' + limit);
  }
  //取得ProduceSalesListUser資料
  getProduceSalesListRequest_t(page: number, limit: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/project/ProduceSalesListUser?page=' + page + '&limit=' + limit);
  }
  //取得ProjectAuthorization資料
  getProjectAuthorizationListRequest_t(page: number, limit: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/project/ProjectAuthorizationListUser?page=' + page + '&limit=' + limit);
  }

  //取得單一projectlistuser
  getOneProjectListRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/project/GetByProjectListUser/${id}`;
    return this.http.get(url);
  }

  //取得project_template 專案範本資料
  getProjectTemplateRequest_t(page: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/project/ProjectTemplateListUser?page=' + page + '&limit=20');
  }

  //取得單一project
  getOneProjectRequest_t(id: string): Observable<any> {
    const url = `${this.BaseUrl}/project/${id}`;
    return this.http.get(url);
  }

  //上傳project資料
  uploadProjectRequest_t(pmRequest: Project): Observable<any> {
    const url = `${this.BaseUrl}/project`;
    return this.http.post(url, pmRequest);
  }

  //修改單一project資料
  updateProjectRequest_t(id: string, pmRequest: Project) {
    const url = `${this.BaseUrl}/project/${id}`;
    return this.http.patch(url, pmRequest)
  }

  //取得專案負責人bonitaUserId
  getProjectBonitaUserList(pId: any): Observable<any> {
    const url = `${this.BaseUrl}/project/GetByProjectBonitaUserList/${pId}`;
    return this.http.get(url);
  }

  //-------------------------account request----------------------------------------------------------------------
  getAccountRequest_t(page: number, limit: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/account?page=' + page + '&limit=' + limit);
  }

  getAccountRequest(): Observable<any> {
    return this.http.get(this.BaseUrl + '/account');
  }

  getAccountOneRequest_t(accountId: string): Observable<any> {

    return this.http.get(this.BaseUrl + '/account/' + accountId)
  }

  getAccountList(): Observable<any> {
    const url = this.BaseUrl + '/account/GetAccountNameList';
    return this.http.get(url);
  }

  getDepartmentAccountList(id: string): Observable<any> {
    const url = this.BaseUrl + '/personnel_affiliation/GetByParentDepartmentID/' + id;
    return this.http.get(url);
  }

  getAccountNameDepartmentList(): Observable<any> {
    const url = this.BaseUrl + '/account/AccountNameDepartmentList';
    return this.http.get(url);
  }

  //-------------------------department----------------------------------------------------------------------
  getDepartmentList(): Observable<any> {
    const url = this.BaseUrl + '/department?page=1&limit=100';
    return this.http.get(url);
  }

  getA1DepartmentList(): Observable<any> {
    const url = this.BaseUrl + '/department/A1Department';
    return this.http.get(url);
  }

  getAllDepartmentList(): Observable<any> {
    const url = this.BaseUrl + '/department/AllDepartment';
    return this.http.get(url);
  }


  //-------------------------task----------------------------------------------------------------------------------

  //getTaskByOriginIDAndUserID
  getTaskByOriginIDAndUserID(originID: any, userID: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByOriginIDAndUserID/' + originID + '/' + userID;
    return this.http.get(url);
  }

  //getAllTaskListLast
  getAllTaskListLast(page: any): Observable<any> {
    const url = this.BaseUrl + '/task' + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //GetByDocumentIDTaskListLast 選取該專案範本的任務列表
  getTaskListLast(ptId: any, page: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByDocumentIDTaskListLast/' + ptId + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //GetByDocumentIDTaskListLast 選取該專案範本的任務列表
  getTaskList(ptId: any, page: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByDocumentIDTaskList/' + ptId + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //GetByOriginIDAndUserID
  getTaskListLastByOriginIDAndUserID(OId: any, UId: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByOriginIDAndUserID/' + OId + '/' + UId;
    return this.http.get(url);
  }

  //GetTaskListHourByUserID 資源工時列表
  getTaskListHourByUserIDRequest(documentId: any): Observable<any> {
    const url = this.BaseUrl + `/task/GetByTaskListHourDocumentsID/${documentId}`
    return this.http.get(url);
  }
  //GetByTaskListHourDocumentsAndUserID 資源細項內容 (已提報工時人員及內容)
  getByTaskListHourDocumentsAndUserIDRequest(documentId: any, userId: any): Observable<any> {
    const url = this.BaseUrl + `/task/GetByTaskListHourDocumentsAndUserID/${documentId}/${userId}`
    return this.http.get(url);
  }
  //GetByDocumnetIDListHour 工時頁面工時列表
  getByDocumnetIDListHourRequest(documentId: any): Observable<any> {
    const url = this.BaseUrl + `/task_user/GetByDocumnetIDListHour/${documentId}`
    return this.http.get(url);
  }
  //GetByIDListTaskHour 工時頁面細項內容 (已提報工時人員及內容)
  getByIDListTaskHour(documentId: any, userId: any): Observable<any> {
    const url = this.BaseUrl + `/task/GetByIDListTaskHour/${documentId}/${userId}`
    return this.http.get(url);
  }

  //task list (會顯示人名任務列表 可判斷專案下的任務有哪些)
  getTaskListUserRequest(documentId: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByDocumentsTaskListUser/' + documentId;
    return this.http.get(url);
  }

  //task list (會顯示人名任務列表 可判斷專案範本下的任務有哪些)
  getTemplateTaskListUserRequest(documentId: any, page?: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByDocumentIDTaskList/' + documentId;
    return this.http.get(url);
  }

  //取得單一tasklistuser
  getOneTaskListRequest(tId: string): Observable<any> {
    const url = `${this.BaseUrl}/task/GetByTaskListUser/${tId}`;
    return this.http.get(url);
  }
  //取得Task資料
  getTaskRequest_t(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/task?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得Task資料by origin_id 提報工時
  getTaskRequestByOriginId(originID: any, page: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByOriginID/' + originID + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }
  //取得Task資料by origin_id+user_id 提報工時
  getTaskRequestByOriginIdUserId(originID: any, userID: any, page: any): Observable<any> {
    const url = this.BaseUrl + '/task/GetByOriginIDAndUserID/' + originID + '/' + userID + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }
  //取得單一Task資料
  getOneTaskRequest_t(id: string): Observable<any> {
    const url = `${this.BaseUrl}/task/${id}`;
    return this.http.get(url);
  }
  //上傳Task資料
  uploadTaskRequest_t(tRequest: Task) {
    const url = `${this.BaseUrl}/task`;
    return this.http.post(url, tRequest);
  }
  //修改單一Task資料
  updateTaskRequest_t(id: any, tRequest: Task): Observable<any> {
    const url = `${this.BaseUrl}/task/${id}`;
    return this.http.patch(url, tRequest);
  }
  //修改單一Task資料
  updateOneTaskRequest(tRequest: Task) {
    const url = `${this.BaseUrl}/task`;
    return this.http.patch(url, tRequest);
  }
  //刪除Task資料
  deleteTaskRequest_t(id: string) {
    const url = `${this.BaseUrl}/task/${id}`;
    return this.http.delete(url);
  }

  //上傳pluralTask資料
  uploadpluralTaskRequest(taskRequest: any): Observable<any> {
    const url = `${this.BaseUrl}/task`;
    return this.http.post(url, taskRequest);
  }
  //修改pluralTask資料
  updatepluralTaskRequest(taskRequest: any): Observable<any> {
    const url = `${this.BaseUrl}/task`;
    return this.http.patch(url, taskRequest);
  }
  //刪除pluraltask資料
  deletepluralTaskRequest(task: any): Observable<any> {
    const url = `${this.BaseUrl}/task`;
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        task
      }
    }
    console.log(Options)
    return this.http.delete(url, Options);
    //return this.http.delete(url, taskRequest)
  }

  //刪除pluraltask資料
  test(id: any, task: any) {
    const url = `${this.BaseUrl}/task`;
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        task
      }
    }
    console.log(Options)
    return this.http.delete(url, Options);
    //return this.http.delete(url, taskRequest)
  }
  // // //刪除task_user資料
  // // deleteTaskUserRequest(id: string, task_user: any) {
  // //   const url = `${this.BaseUrl}/task_user/${id}`;
  // //   console.log(url)
  // //   const Options = {
  // //     headers: new HttpHeaders({
  // //     }),
  // //     body: {
  // //       task_user
  // //     }
  // //   }
  // //   return this.http.delete(url, Options);
  // // }

  deletepluralTaskRequest_t(id: string, task: any) {
    const url = `${this.BaseUrl}/task/${id}`;
    console.log(url)
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        task
      }
    }
    return this.http.delete(url, Options);
  }

  getTaskBonitaUserList(documentsId: any): Observable<any> {
    const url = `${this.BaseUrl}/task/GetByIDTaskBonitaUserList/${documentsId}`;
    return this.http.get(url);
  }
  //-------------------------task_user------------------------------------------------------------------------
  //取得Task資料
  getTaskUserRequest_t(page: number, limit: number): Observable<any> {
    const url = this.BaseUrl + '/task_user?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得單一Task資料
  getOneTaskUserRequest_t(id: string) {
    const url = `${this.BaseUrl}/task_user/${id}`;
    return this.http.get(url);
  }
  //上傳Task資料
  uploadTaskUserRequest_t(tRequest: TaskRequest) {
    const url = `${this.BaseUrl}/task_user`;
    return this.http.post(url, tRequest);
  }
  //修改單一Task資料
  updateTaskUserRequest_t(id: string, tRequest: TaskRequest) {
    const url = `${this.BaseUrl}/task_user/${id}`;
    return this.http.patch(url, tRequest);
  }
  //刪除Task資料
  deleteTaskUserRequest_t(id: String) {
    const url = `${this.BaseUrl}/task_user/${id}`;
    return this.http.delete(url);
  }

  //刪除task_user資料
  deleteTaskUserRequest(id: string, task_user: any) {
    const url = `${this.BaseUrl}/task_user/${id}`;
    console.log(url)
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        task_user
      }
    }
    return this.http.delete(url, Options);
  }
  //上傳pluralTaskUser資料
  uploadpluralTaskUserRequest(taskuserRequest: any): Observable<any> {
    const url = `${this.BaseUrl}/task_user`;
    return this.http.post(url, taskuserRequest);
  }
  //修改pluralTask資料
  updatepluralTaskUserRequest(taskuserRequest: any): Observable<any> {
    const url = `${this.BaseUrl}/task_user`;
    return this.http.patch(url, taskuserRequest);
  }

  //刪除單筆task_user資料
  //修改pluralTask資料
  // deleteTaskUserRequest(id: any) {
  //   const url = `${this.BaseUrl}/task_user/${id}`;
  //   return this.http.delete(url);
  // }

  //刪除pluraltaskuser資料
  deletepluralTaskUserRequest(task_user: any): Observable<any> {
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        task_user
      }
    }
    console.log(Options)
    const url = `${this.BaseUrl}/task_user`;
    return this.http.delete(url, Options)
  }

  deletepluralTaskUserRequest_t(task_user: any): Observable<any> {
    const url = `${this.BaseUrl}/task_user`;
    return this.http.delete(url, task_user)
  }

  //-------------------------meeting------------------------------------------------------------------------
  //取得屬於該單據 meetingListUser資料
  getMeetingListUserRequest_t(documentsID: number, page: number): Observable<any> {
    const url = this.BaseUrl + '/meeting/GetByDIDMeetingListUser/' + documentsID + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //取得該單據 單一筆meetingListUser資料
  getOneMeetingUserRequest(mID: number): Observable<any> {
    const url = this.BaseUrl + '/meeting/GetByMIDMeetingUser/' + mID;
    return this.http.get(url);
  }

  //取得屬於該單據 會議參與人員、主席資料
  getMeetingListUserByMidRequest(mID: number, page: number): Observable<any> {
    const url = this.BaseUrl + '/meeting/GetByMIDMeetingListUser/' + mID + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }


  //取得meeting資料
  getMeetingUserRequest_t(page: number, limit: number): Observable<any> {
    const url = this.BaseUrl + '/meeting/MeetingUser?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }

  //取得meeting資料
  getMeetingRequest_t(page: number, limit: number): Observable<any> {
    const url = this.BaseUrl + '/meeting?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得單一meeting資料
  getOneMeetingRequest_t(id: string) {
    const url = `${this.BaseUrl}/meeting/${id}`;
    return this.http.get(url);
  }

  //取得屬於該人員的會議
  getMeetingListUserByUserID(userID: number, page: number): Observable<any> {
    const url = this.BaseUrl + '/meeting/GetByUserIDMeetingListUser/' + userID + '?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //上傳meeting資料
  uploadMeetingRequest_t(tRequest: Meeting) {
    const url = `${this.BaseUrl}/meeting`;
    return this.http.post(url, tRequest);
  }
  //修改單一meeting資料
  updateMeetingRequest_t(id: string, tRequest: Meeting) {
    const url = `${this.BaseUrl}/meeting/${id}`;
    return this.http.patch(url, tRequest);
  }
  //刪除meeting資料
  deleteMeetingRequest_t(id: string) {
    const url = `${this.BaseUrl}/meeting/${id}`;
    return this.http.delete(url);
  }


  //-------------------------attendee--------------------------------------------------------------------------
  //取得attendee資料
  getAttendeeRequest_t(page: number, limit: number): Observable<any> {
    const url = this.BaseUrl + '/attendee?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得單一attendee資料
  getOneAttendeeRequest_t(id: string) {
    const url = `${this.BaseUrl}/attendee/${id}`;
    return this.http.get(url);
  }
  //上傳attendee資料
  uploadAttendeeRequest_t(tRequest: Attendee): Observable<any> {
    const url = `${this.BaseUrl}/attendee`;
    return this.http.post(url, tRequest);
  }
  //修改單一attendee資料
  updateAttendeeRequest_t(tRequest: Attendee) {
    const url = `${this.BaseUrl}/attendee`;
    return this.http.patch(url, tRequest);
  }
  //刪除attendee資料
  deleteAttendeeRequest_t(id: string) {
    const url = `${this.BaseUrl}/attendee/${id}`;
    return this.http.delete(url);
  }

  //-------------------------machine_combined--------------------------------
  //取得machine_combinedList資料
  getMachineCombinedListRequest_t(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/machine_combined/MachineCombinedListLast?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得machine_combined資料
  getMachineCombinedRequest_t(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/machine_combined?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得單一machine_combined資料
  getOneMachineCombinedRequest_t(id: string) {
    const url = `${this.BaseUrl}/machine_combined/${id}`;
    return this.http.get(url);
  }
  //上傳machine_combined資料
  uploadMachineCombinedRequest_t(mcRequest: MachineCombined) {
    const url = `${this.BaseUrl}/machine_combined`;
    return this.http.post(url, mcRequest);
  }
  //修改單一machine_combined資料
  updateMachineCombinedRequest_t(id: string, mcRequest: MachineCombined) {
    const url = `${this.BaseUrl}/machine_combined/${id}`;
    return this.http.patch(url, mcRequest);
  }
  //刪除machine_combined資料
  deleteMachineCombinedRequest_t(id: string) {
    const url = `${this.BaseUrl}/machine_combined/${id}`;
    return this.http.delete(url);
  }

  //-------------------------plug_in--------------------------------
  //取得plug_in資料
  getPlugInRequest_t(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/plug_in?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得單一plug_in資料
  getOnePlugInRequest_t(id: string) {
    const url = `${this.BaseUrl}/plug_in/${id}`;
    return this.http.get(url);
  }
  //上傳plug_in資料
  uploadPlugInRequest_t(piRequest: PlugIn) {
    const url = `${this.BaseUrl}/plug_in`;
    return this.http.post(url, piRequest);
  }
  //修改單一plug_in資料
  updatePlugInRequest_t(id: string, piRequest: PlugIn) {
    const url = `${this.BaseUrl}/plug_in/${id}`;
    return this.http.patch(url, piRequest);
  }
  //刪除plug_in資料
  deletePlugInRequest_t(id: string): Observable<any> {
    const url = `${this.BaseUrl}/plug_in/${id}`;
    return this.http.delete(url);
  }

  //-------------------------antivirus_software--------------------------------
  //取得antivirus_software資料
  getAntivirusSoftwareRequest_t(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/antivirus_software?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得單一antivirus_software資料
  getOneAntivirusSoftwareRequest_t(id: string) {
    const url = `${this.BaseUrl}/antivirus_software/${id}`;
    return this.http.get(url);
  }
  //上傳並送審antivirus_software資料
  uploadAntivirusSoftwareRequest_t(piRequest: AntivirusSoftware) {
    const url = `${this.BaseUrl}/antivirus_software`;
    return this.http.post(url, piRequest);
  }
  //審核antivirus_software資料
  reviewAntivirusSoftwareRequest_t(account: any, bonita_task_id: any, piRequest: AntivirusSoftware) {
    const url = `${this.BaseUrl}/antivirus_software/AsReviewTask/${account}/${bonita_task_id}`;
    return this.http.patch(url, piRequest);
  }
  //取得審核antivirus_software資料
  getreviewAntivirusSoftwareRequest_t() {
    const url = `${this.BaseUrl}/antivirus_software/GetByCaseIDtoTop/james/44`;
    return this.http.get(url);
  }
  //修改單一antivirus_software資料
  updateAntivirusSoftwareRequest_t(id: string, piRequest: AntivirusSoftware) {
    const url = `${this.BaseUrl}/antivirus_software/${id}`;
    return this.http.patch(url, piRequest);
  }
  //刪除antivirus_software資料
  deleteAntivirusSoftwareRequest_t(id: string) {
    const url = `${this.BaseUrl}/antivirus_software/${id}`;
    return this.http.delete(url);
  }



  //-------------------------labor_hour--------------------------------------------------------------------------

  getLaborHourList(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }

  getLaborHourListByUserId(userId: any, tId: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour/GetByUserIdLaborHourList/' + userId + '/' + tId;
    return this.http.get(url);
  }

  getLaborHourByUserId(userId: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour/GetByUserIdList/' + userId;
    return this.http.get(url);
  }

  getLaborHourByCSId(userId: any, CSId: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour/GetByCsIdLaborHourList/' + userId + '/' + CSId;
    return this.http.get(url);
  }

  getLaborHourByCUId(CUId: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour/GetByCuIdLaborHourList/' + CUId;
    return this.http.get(url);
  }

  getLaborHourByCategoryList(userId: any, category: any, date: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour/GetByUserIdCategoryList/' + userId + '/' + category + '/' + date;
    return this.http.get(url);
  }

  getLaborHourByCategory(userId: any, category: any): Observable<any> {
    const url = this.BaseUrl + '/labor_hour/GetByUserIdCategory/' + userId + '/' + category;
    return this.http.get(url);
  }

  //-----------------------project_template-------------------------------------------------------------------------

  //取得project資料
  getProjectTemplateRequest(page: number, limit: number): Observable<any> {
    return this.http.get(this.BaseUrl + '/project_template?page=' + page + '&limit=' + limit);
  }

  //取得單一project
  getOneProjectTemplateRequest(id: string) {
    const url = `${this.BaseUrl}/project_template/${id}`;
    return this.http.get(url);
  }

  //上傳project資料
  uploadProjectTemplateRequest(ptRequest: ProjectTemplate) {
    const url = `${this.BaseUrl}/project_template`;
    return this.http.post(url, ptRequest);
  }

  //修改單一project資料
  updateProjectTemplateRequest(id: string, ptRequest: ProjectTemplate) {
    const url = `${this.BaseUrl}/project_template/${id}`;
    return this.http.patch(url, ptRequest)
  }
  //刪除project資料
  deleteProjectTemplateRequest_t(id: string) {
    const url = `${this.BaseUrl}/project_template/${id}`;
    return this.http.delete(url);
  }

  //-------------------------todo_type------------------------------------------------------------------
  //取得todo_type資料
  getTodoTypeRequest(page: number): Observable<any> {
    const url = this.BaseUrl + '/todo_type?page=' + page + '&limit=20';
    return this.http.get(url);
  }
  //取得單一todo_type資料
  getOneTodoTypeRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/todo_type/${id}`;
    return this.http.get(url);
  }
  //上傳todo_type資料
  uploadTodoTypeRequest(Request: Attendee): Observable<any> {
    const url = `${this.BaseUrl}/todo_type`;
    return this.http.post(url, Request);
  }
  //修改單一todo_type資料
  updateTodoTypeRequest(id: string, Request: Attendee): Observable<any> {
    const url = `${this.BaseUrl}/todo_type/${id}`;
    return this.http.patch(url, Request);
  }
  //刪除todo_type資料
  deleteTodoTypeRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/todo_type/${id}`;
    return this.http.delete(url);
  }









  //project_old---------------------------------------------------
  //刪除project資料
  deleteProjectRequest_t(id: string) {
    const url = `${this.BaseUrl}/project/${id}`;
    return this.http.delete(url)
  }


  //取得project資料
  getProjectRequest(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Project/Select');
  }

  //取得單一project
  getOneProjectRequest(id: string) {
    const url = `${this.BaseUrl}/Project/Select/${id}`;
    return this.http.get(url);
  }

  //上傳project資料
  uploadProjectRequest(pmRequest: ProjectManagerRequest) {
    const url = `${this.BaseUrl}/Project/Upload`;
    return this.http.post(url, pmRequest);
  }

  //修改單一project資料
  updateProjectRequest(pmRequest: ProjectManagerRequest) {
    const url = `${this.BaseUrl}/Project/Update`;
    return this.http.put(url, pmRequest);
  }

  //刪除project資料(?)
  deleteProjectRequest(id: number) {
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        p_id: Number(id)
      }
    }
    console.log(Options)
    const url = `${this.BaseUrl}/Project/Delete`;
    return this.http.delete(url, Options)
  }
  //上傳檔案------------------------------------------------------------
  upload(Request: any) {
    const url = `${this.BaseUrl}/File/Upload`;
    const formData: FormData = new FormData();
    formData.append('file', Request, Request.name);
    return this.http.post(url, formData);
  }
  //下載檔案
  download(fileName: string) {
    const url = `${this.BaseUrl}/File/Download/${fileName}`;
    return this.http.post(url, {}, { responseType: 'blob' as 'json' });
  }

  //-------------------------客需單 customer request-----------------------
  //取得客需單資料
  getCustomerRequest(page: number, limit: any): Observable<any> {
    const url = this.BaseUrl + '/customer_demand?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得客需單資料回傳人名
  getCustomerRequest_n(page: number, limit: any): Observable<any> {
    const url = this.BaseUrl + '/customer_demand/CustomerDemandListUser?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }

  //取得單一客需單
  getOneCustomerRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/GetByCuIDCustomerDemandListUser/${id}`;
    return this.http.get(url);
  }

  //上傳客需單資料
  uploadCustomerDemand(crRequest: CustomerRequest): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand`;
    return this.http.post(url, crRequest);
  }

  //修改單一客需單資料
  updateCustomerRequest(id: string, crRequest: CustomerRequest): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/${id}`;
    return this.http.patch(url, crRequest);
  }

  //刪除客需單資料
  deleteCustomerRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/${id}`;
    return this.http.delete(url);
  }

  //取得CR追蹤資料
  getCustomerRequestTask(Userid: string): Observable<any> {
    const url = `${this.BaseUrl}/customer_demand/GetByUserIDListCR/${Userid}`
    return this.http.get(url);
  }

  //取得該使用者客需單會簽
  getByUserIDListHCR(userID: any): Observable<any> {
    const url = this.BaseUrl + '/customer_demand/GetByUserIDListHCR/' + userID;
    return this.http.get(url);
  }

  //取得機台
  getAllModel(): Observable<any> {
    const url = this.HTAUrl + '/HtaModel/';
    return this.http.get(url);
  }


  //-------------------------projectInfo manufacture-----------------------
  //取得製令資料
  getProjectInfoManufacture(page: number, limit: any): Observable<any> {
    const url = this.BaseUrl + '/manufacture_order?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }

  //取得CR、project製令資料
  getProjectInfoManufacture_byProject(page: number, limit: any): Observable<any> {
    const url = this.BaseUrl + '/manufacture_order/ManufactureOrderProjectListUser?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }

  //取得單一製令
  getOneProjectInfoManufacture(id: string) {
    const url = `${this.BaseUrl}/manufacture_order/GetByIDOne/${id}`;
    return this.http.get(url);
  }

  //上傳製令資料
  uploadProjectInfoManufacture(MORequest: ManufactureOrder): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_order`;
    return this.http.post(url, MORequest);
  }

  //修改單一製令資料
  updateProjectInfoManufacture(id: string, MORequest: ManufactureOrder): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_order/${id}`;
    return this.http.patch(url, MORequest);
  }

  //刪除製令資料(
  deleteProjectInfoManufacturet(id: string) {
    const url = `${this.BaseUrl}/manufacture_order/${id}`;
    return this.http.delete(url);
  }

  //取得製令副本資料
  getProjectInfoManufactureUser(id: number): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_user/GetByManufactureID/${id}`;
    return this.http.get(url);
  }

  //上傳製令副本資料
  uploadProjectInfoManufactureUser(MURequest: ManufactureOrder): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_user`;
    return this.http.post(url, MURequest);
  }

  //刪除製令副本資料(
  deleteProjectInfoManufactureUser(id: string): Observable<any> {
    const url = `${this.BaseUrl}/manufacture_user/${id}`;
    return this.http.delete(url);
  }


  getTaskRequest(): Observable<any> {
    const url = `${this.BaseUrl}/Task/Select`;
    return this.http.get(url);
  }
  //取得單一Task資料
  getOneTaskRequest(id: string) {
    const url = `${this.BaseUrl}/Task/Select/${id}`;
    return this.http.get(url);
  }
  //上傳Task資料
  uploadTaskRequest(tRequest: TaskRequest) {
    const url = `${this.BaseUrl}/Task/Upload`;
    return this.http.post(url, tRequest);
  }
  //修改單一Task資料
  updateTaskRequest(tRequest: TaskRequest) {
    const url = `${this.BaseUrl}/Task/Update`;
    return this.http.put(url, tRequest);
  }
  //刪除Task資料(?)
  deleteTaskRequest(tRequest: TaskRequest) {
    const url = `${this.BaseUrl}/Task/Delete`;
    return this.http.delete(url);
  }

  //-------------------------testtask-----------------------
  //取得TestTask資料
  getTestTaskRequest(): Observable<any> {
    const url = `${this.BaseUrl}/TestTask/Select`;
    return this.http.get(url);
  }

  //修改單一TestTask資料
  updateTestTaskRequest(ttRequest: TestTaskRequest) {
    const url = `${this.BaseUrl}/TestTask/Update`;
    return this.http.put(url, ttRequest);
  }
  //刪除TestTask資料(?)
  deleteTestTaskRequest(id: number) {
    const Options = {
      headers: new HttpHeaders({
      }),
      body: {
        t_id: Number(id)
      }
    }
    console.log(Options)
    const url = `${this.BaseUrl}/TestTask/Delete`;
    return this.http.delete(url, Options)
  }

  //取得單一TestTask資料
  getOneTestTaskRequest(id: string) {
    const url = `${this.BaseUrl}/TestTask/Select/${id}`;
    return this.http.get(url);
  }
  //上傳Task資料
  uploadTestTaskRequest(ttRequest: TestTaskRequest) {
    const url = `${this.BaseUrl}/TestTask/Upload`;
    return this.http.post(url, ttRequest);
  }
  //------------------------TestTask------------------//
  //-------------------------meeting-----------------------
  //取得meeting資料
  getMeetingRequest(page: any, limit: any): Observable<any> {
    const url = this.BaseUrl + '/meeting?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }

  //取得單一Meeting資料
  getOneMeetingRequest(id: string) {
    const url = `${this.BaseUrl}/Meeting/Select/${id}`;
    return this.http.get(url);
  }

  //上傳Meeting資料-----改引數
  uploadMeetingRequest(mRequest: MeetingRequest) {
    const url = `${this.BaseUrl}/Meeting/Upload`;
    return this.http.post(url, mRequest);
  }
  //修改單一Meeting資料
  updateMeetingRequest(mRequest: MeetingRequest) {
    const url = `${this.BaseUrl}/Meeting/Update`;
    return this.http.put(url, mRequest);
  }
  //刪除Meeting資料(?)
  deleteMeetingRequest(mRequest: MeetingRequest) {
    const url = `${this.BaseUrl}/Meeting/Delete`;
    return this.http.delete(url);
  }

  //-------------------------files-----------------------
  //取得Files資料
  getFilesRequest(): Observable<any> {
    const url = `${this.BaseUrl}/File/Select`;
    return this.http.get(url);
  }

  //取得單一Files資料
  getOneFilesRequest(id: string) {
    const url = `${this.BaseUrl}/File/Select/${id}`;
    return this.http.get(url);
  }

  //上傳Files資料-----改引數
  uploadFilesRequest(fRequest: FilesRequest) {
    const url = `${this.BaseUrl}/Files/Upload`;
    return this.http.post(url, fRequest);
  }
  //修改單一Files資料
  updateFilesRequest(fRequest: FilesRequest) {
    const url = `${this.BaseUrl}/Files/Update`;
    return this.http.put(url, fRequest);
  }
  //刪除Files資料(?)
  deleteFilesRequest(id: string) {
    const url = `${this.BaseUrl}/Files/Delete/${id}`;
    return this.http.delete(url);
  }

  //-------------------------Log-----------------------
  //取得log資料
  getLogRequest(): Observable<any> {
    const url = `${this.BaseUrl}/Log/Select`;
    return this.http.get(url);
  }

  //-------------------------interview-----------------------
  //取得interview資料
  getInterviewRequest(): Observable<any> {
    const url = `${this.BaseUrl}/Interview/Select`;
    return this.http.get(url);
  }

  //取得單一interview資料
  getOneInterviewRequest(id: string) {
    const url = `${this.BaseUrl}/Interview/Select/${id}`;
    return this.http.get(url);
  }

  //上傳interview資料-----改引數
  uploadInterviewRequest(fRequest: FilesRequest) {
    const url = `${this.BaseUrl}/Interview/Upload`;
    return this.http.post(url, fRequest);
  }
  //修改單一interview資料
  updateInterviewRequest(fRequest: FilesRequest) {
    const url = `${this.BaseUrl}/Interview/Update`;
    return this.http.put(url, fRequest);
  }
  //刪除interview資料(?)
  deleteInterviewRequest(fRequest: FilesRequest) {
    const url = `${this.BaseUrl}/Interview/Delete`;
    return this.http.delete(url);
  }


  //Sysuser
  getSysuserRequest(): Observable<any> {
    return this.http.get(this.BaseUrl + '/Sysuser/Select');
  }

  //Sysuser
  getOneSysuserRequest(id: string) {
    const url = `${this.BaseUrl}/Sysuser/Select/${id}`;
    return this.http.get(url);
  }

  //Sysuser
  uploadSysuserRequest(pmRequest: ProjectManagerRequest) {
    const url = `${this.BaseUrl}/Sysuser/Upload`;
    return this.http.post(url, pmRequest);
  }

  //Sysuser
  updateSysuserRequest(pmRequest: ProjectManagerRequest) {
    const url = `${this.BaseUrl}/Sysuser/Update`;
    return this.http.put(url, pmRequest);
  }

  /*---------------------------------------------------------------*/

  //取得labor_hour資料
  getLaborHourRequest(page: number): Observable<any> {
    const url = this.BaseUrl + '/labor_hour?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //labor_hour
  getOneLaborHourRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour/${id}`;
    return this.http.get(url);
  }

  //labor_hour
  uploadLaborHourRequest(lhRequest: LaborHourRequest): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour`;
    return this.http.post(url, lhRequest);
  }

  //labor_hour
  updateLaborHourRequest(id: string, lhRequest: LaborHourRequest): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour/${id}`;
    return this.http.patch(url, lhRequest);
  }

  deleteLaborHourRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour/${id}`;
    return this.http.delete(url);
  }

  /*labor_hour_modify---------------------------------------------------------------*/

  //Bonita 獲取使用者可執行的單 (異動紀錄重新送審)
  getLaborBonitaCaseList(account: any, bonita_case_id: any): Observable<any> {
    const url = this.BaseUrl + `/labor_hour_modify/GetLaborBonitaCaseListStart/${account}/${bonita_case_id}`;
    return this.http.get(url);
  }

  //Bonita 獲取使用者可執行的單 (主管審核)
  getLaborDirectBonitaCaseList(account: any, bonita_user_id: any): Observable<any> {
    const url = this.BaseUrl + `/labor_hour_modify/GetLaborBonitaCaseListDepartment/${account}/${bonita_user_id}`;
    return this.http.get(url);
  }

  //主管審核工時
  LaborReviewTask(account: string, taskId: any, dmApprovalStatus: dmApprovalStatus): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour_modify/LaborReviewTask/${account}/${taskId}`
    return this.http.patch(url, dmApprovalStatus)
  }

  //UserID篩選 取得該使用者的異動工時
  getByUserIdListRequest(user_id: string): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour_modify/GetByUserIdList/${user_id}`;
    return this.http.get(url);
  }

  //審核狀態變更(PATCH)
  UpdatedLaborStatus(hm_id: any, dmApprovalStatus: dmApprovalStatus): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour_modify/UpdatedStatus/${hm_id}`
    return this.http.patch(url, dmApprovalStatus)
  }

  //取得labor_hour_modify資料
  getLaborHourModifyRequest(page: number): Observable<any> {
    const url = this.BaseUrl + '/labor_hour_modify?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //labor_hour
  getOneLaborHourModifyRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour_modify/${id}`;
    return this.http.get(url);
  }

  //labor_hour
  uploadLaborHourModifyRequest(lhRequest: LaborHourRequest, account: any): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour_modify/${account}`;
    return this.http.post(url, lhRequest);
  }

  //labor_hour
  updateLaborHourModifyRequest(id: string, lhRequest: LaborHourRequest): Observable<any> {
    const url = `${this.BaseUrl}/labor_hour_modify/${id}`;
    return this.http.patch(url, lhRequest);
  }

  //-------------------------Countersign-----------------------
  //上傳Countersign資料
  uploadCountersignRequest(csRequest: Countersign) {
    const url = `${this.BaseUrl}/countersign`;
    return this.http.post(url, csRequest);
  }

  //修改單一Countersign資料
  updateCountersignRequest(id: string, csRequest: Countersign) {
    const url = `${this.BaseUrl}/countersign/${id}`;
    return this.http.patch(url, csRequest);
  }

  //刪除Countersign資料
  deleteCountersignRequest(id: string) {
    const url = `${this.BaseUrl}/countersign/${id}`;
    return this.http.delete(url);
  }

  //上傳Countersign User資料
  uploadCountersignUserRequest(csRequest: Countersign): Observable<any> {
    const url = `${this.BaseUrl}/countersign_user`;
    return this.http.post(url, csRequest);
  }

  //修改單一Countersign User資料
  updateCountersignUserRequest(id: string, csRequest: Countersign): Observable<any> {
    const url = `${this.BaseUrl}/countersign_user/${id}`;
    return this.http.patch(url, csRequest);
  }

  //刪除Countersign User資料
  deleteCountersignUserRequest(id: string) {
    const url = `${this.BaseUrl}/countersign_user/${id}`;
    return this.http.delete(url);
  }


  //取得Countersign資料
  getCountersignRequest(id: string): Observable<any> {
    const url = `${this.BaseUrl}/countersign_user/GetByIDCountersignUserListUser/${id}`;
    return this.http.get(url);
  }

  //取得CountersignUser資料
  getCountersignRequestByCsID(id: string, cs_id: string): Observable<any> {
    const url = `${this.BaseUrl}/countersign_user/GetByIDCountersignUserListUser/${id}/${cs_id}`;
    return this.http.get(url);
  }

  //取得單一CountersignUser資料
  getOneCountersignRequest(cu_id: string): Observable<any> {
    const url = `${this.BaseUrl}/countersign_user/GetByCuIDCountersignUserListUser/${cu_id}`;
    return this.http.get(url);
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



}

