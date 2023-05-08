import { Injectable } from '@angular/core';
import { CustomerRequest } from './shared/models/task';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private HTAUrl = 'http://163.18.110.100:5555';  //URL to web api

  //宣告傳去的格式
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  //獲取A1
  getCustomerRequests(): Observable<any> {
    const url = `${this.HTAUrl}/GetA1`;
    return this.http.get(url);
  }

  //新增A1
  addCustomerRequests(customerRequest: CustomerRequest) {
    const url = `${this.HTAUrl}/UploadA1`;
    return this.http.post(url, customerRequest)
  }
}
