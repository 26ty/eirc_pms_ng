import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateDepartment, CreatePosition, Departments, EditDepartment, EditPosition } from '../admin/models/organization';

const API_URL = environment.API_URL;

let token: string | null = window.localStorage.getItem('auth-token');
let tokenKey: string = '';
if (token != null) {
  tokenKey = token;
}

const httpOptions = {
  headers: { Authorization: tokenKey, 'Content-Type': 'application/json'}
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private http: HttpClient) { }
  // 部門
  departmentList(): Observable<any>{
    return this.http.get(API_URL + 'departments', httpOptions);
  }
  // 部門
  departmentItem(): Observable<any>{
    return this.http.get(API_URL + 'department', httpOptions);
  }
  // 職稱
  positionList(): Observable<any>{
    return this.http.get(API_URL + 'positions', httpOptions);
  }
  // 職稱
  positionItem(department: Departments): Observable<any>{
    return this.http.post(API_URL + 'Position', department, httpOptions);
  }
  // 權限
  organizationOne(ID: string): Observable<any> {
    return this.http.get(API_URL + `organization/${ID}`, httpOptions);
  }
  // 部門C
  departmentCreate(organization: CreateDepartment): Observable<any> {
    return this.http.post(API_URL + 'department', organization, httpOptions);
  }
  // 職稱C
  positionCreate(organization: CreatePosition): Observable<any> {
    return this.http.post(API_URL + 'position', organization, httpOptions);
  }
  // 部門U
  editDepartment(ID: string, editDepartment:EditDepartment): Observable<any>{
    return this.http.put(API_URL + `department/${ID}`, editDepartment, httpOptions);
  }
  // 職稱C
  editPosition(ID: string, editPosition:EditPosition): Observable<any>{
    return this.http.put(API_URL + `position/${ID}`, editPosition, httpOptions);
  }
  // 部門D
  deleteDepartment(ID: string): Observable<any>{
    return this.http.delete(API_URL + `department/${ID}`, httpOptions);
  }
  // 職稱D
  deletePosition(ID: string): Observable<any>{
    return this.http.delete(API_URL + `position/${ID}`, httpOptions);
  }

  fetchDepartment(): Observable<any>{
    return this.http.get(API_URL + 'department', httpOptions);
  }


  fetchPosition(): Observable<any> {
    return this.http.get(API_URL + 'fetchposition', httpOptions);
  }
}
