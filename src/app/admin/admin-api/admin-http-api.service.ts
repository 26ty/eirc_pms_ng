import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';
import { Department } from '../admin-models/admin-model';
import { Jobtitle } from '../admin-models/admin-model';
@Injectable({
  providedIn: 'root'
})
export class AdminHttpApiService {

  private BaseUrl: string = 'https://api.testing.eirc.app/authority/v1.0';//伺服器網址
  //private BaseUrl: string = 'http://localhost:8080/authority/v1.0';//本地網址

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  //部門
  //-------------------------department--------------------------------------------------------------------------
  //取得departmente資料
  getDepartment(page: number, limit: number): Observable<any> {
    const url = this.BaseUrl + '/department?page=' + page + '&limit=' + limit;
    return this.http.get(url);
  }
  //取得有主管名稱的department資料
  getDepartmentUserList(): Observable<any> {
    const url = this.BaseUrl + '/department/departmentUserList';
    return this.http.get(url);
  }
  //取得單一Department資料
  getOneDepartment(id: string) {
    const url = `${this.BaseUrl}/department/${id}`;
    return this.http.get(url);
  }
  //上傳Department資料
  uploadDepartment(department: Department): Observable<any> {
    const url = `${this.BaseUrl}/department`;
    return this.http.post(url, department);
  }
  //修改單一Department資料
  updateDepartment(id: string, department: Department) {
    const url = `${this.BaseUrl}/department/${id}`;
    return this.http.patch(url, department);
  }
  //刪除Department資料
  deleteDepartment(accountid: any, id: string) {
    const url = `${this.BaseUrl}/department/${accountid}/${id}`;
    return this.http.delete(url);
  }

  //-------------------------user--------------------------------------------------------------------------
  //User
  getUser(page?: number): Observable<any> {
    const url = this.BaseUrl + '/account'
    return this.http.get(url);
  }

  //取得單一User資料
  getOneUser(id: string) {
    const url = `${this.BaseUrl}/account/${id}`;
    return this.http.get(url);
  }

  //取得單一User資料
  getOneUserPA(id: string) {
    const url = `${this.BaseUrl}/personnel_affiliation/GetByUserID/${id}`;
    return this.http.get(url);
  }

  //上傳User資料 新增人員accounts
  uploadUser(account: any, body: Department, auth_token: any) {
    const url = `${this.BaseUrl}/account/${account}`; // /authority/v1.0/account/:account
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    return this.http.post(url, body, { headers: headers });
  }

  //修改單一User資料
  updateUser(accountid: any, account: any, body: Department) {
    const url = `${this.BaseUrl}/account/${accountid}/${account}`; // /authority/v1.0/account/:accountID/:account
    return this.http.patch(url, body);
  }

  //刪除User資料
  deleteUser(accountid: any, account: any) {
    const url = `${this.BaseUrl}/account/${accountid}/${account}`; // /authority/v1.0/account/:accountID/:account
    return this.http.delete(url);
  }

  getAccountList(): Observable<any> {
    const url = this.BaseUrl + '/account/GetAccountNameList';
    return this.http.get(url);
  }

  getAccountNameDepartmentList(): Observable<any> {
    const url = this.BaseUrl + '/account/AccountNameDepartmentList';
    return this.http.get(url);
  }

  //-------------------------personnel_affiliation--------------------------------------------------------------------------
  uploadPersonnelAffiliation(account: any, body: Department) {
    console.log(body)
    console.log(JSON.stringify(body))
    const url = `${this.BaseUrl}/personnel_affiliation/${account}`; // /authority/v1.0/personnel_affiliation/:account
    return this.http.post(url, body);
  }

  //rbac 修改人員隸屬personnel_affiliation
  updatePersonnelAffiliation(paId: any, account: any, body: Department) {
    const url = `${this.BaseUrl}/personnel_affiliation/${paId}/${account}`; // /authority/v1.0/personnel_affiliation/:PaID/:account
    return this.http.patch(url, body);
  }

  //rbac 刪除人員隸屬personnel_affiliation
  deletePersonnelAffiliation(paId: any, account: any) {
    const url = `${this.BaseUrl}/personnel_affiliation/${paId}/${account}`; // /authority/v1.0/personnel_affiliation/:PaID/:account
    return this.http.delete(url);
  }

  //-------------------------jobtitle--------------------------------------------------------------------------
  //User
  getJobTitle(page: number): Observable<any> {
    const url = this.BaseUrl + '/jobtitle?page=' + page + '&limit=20';
    return this.http.get(url);
  }

  //取得單一User資料
  getOneJobTitle(jid: string) {
    const url = `${this.BaseUrl}/jobtitle/${jid}`;
    return this.http.get(url);
  }
  //上傳User資料 新增人員accounts
  uploadJobTitle(body: Jobtitle) {
    const url = `${this.BaseUrl}/jobtitle`;
    return this.http.post(url, body);
  }
  //修改單一User資料
  updateJobTitle(jid: string, body: Jobtitle) {
    const url = `${this.BaseUrl}/jobtitle/${jid}`;
    return this.http.patch(url, body);
  }
  //刪除User資料
  deleteJobTitle(jid: string) {
    const url = `${this.BaseUrl}/jobtitle/${jid}`;
    return this.http.delete(url);
  }
}
