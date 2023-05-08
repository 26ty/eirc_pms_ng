import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreatePurchaseOrder, CreateReceipt, ReqBuyTask, Review, ReviewID, Tasklog } from '../shared/models/task';

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
export class TaskService {

  constructor(private http: HttpClient) { }

  AllTask(review: Review): Observable<any> {
    return this.http.post(API_URL + 'alltask', review, httpOptions);
  }

  ShowReview(rid: ReviewID): Observable<any> {
    return this.http.post(API_URL + 'showreview', rid, httpOptions);
  }

  AddReqTask(reqTask: ReqBuyTask): Observable<any>{
    return this.http.post(API_URL + 'addreqtask', reqTask, httpOptions);
  }
  FetchReview(uid: ReviewID): Observable<any>{
    return this.http.post(API_URL + 'review', uid, httpOptions);
  }

  UpdateReview(rid: string,review: Tasklog): Observable<any> {
    return this.http.put(API_URL + `review/${rid}`, review, httpOptions);
  }

  AllowList(rid: string): Observable<any> {
    return this.http.get(API_URL + `allowlist/${rid}`, httpOptions);
  }

  FetchReqTask(tid: string): Observable<any> {
    return this.http.get(API_URL + `reqtask/${tid}`, httpOptions);
  }
  FetchPurchase(tid: string): Observable<any> {
    return this.http.get(API_URL + `purchase/${tid}`, httpOptions);
  }

  AddPurchase(purchase: CreatePurchaseOrder): Observable<any> {
    return this.http.post(API_URL + 'purchase', purchase, httpOptions);
  }

  AddReceipt(receipt: CreateReceipt): Observable<any>{
    return this.http.post(API_URL + 'receipt', receipt, httpOptions);
  }

  FetchReceipt(tid: string): Observable<any> {
    return this.http.get(API_URL + `receipt/${tid}`, httpOptions);
  }
}
