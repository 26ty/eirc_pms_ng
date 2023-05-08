import { Component, OnInit ,ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { resolveSoa } from 'dns';
import { HttpApiService } from 'src/app/api/http-api.service';
//swal
import Swal from 'sweetalert2'

const LIST_KEY = 'auth-key';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-type-dialog',
  templateUrl: './type-dialog.component.html',
  styleUrls: ['./type-dialog.component.scss']
})
export class TypeDialogComponent implements OnInit {

  addForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private HttpApiService: HttpApiService,
  ) { 
    this.addForm = this.fb.group({
      type_name:new FormControl(),
    })
  }

  userJson: any
  ngOnInit(): void {
    const userstring = window.localStorage.getItem(USER_KEY)
    this.userJson = JSON.parse(String(userstring))
    console.log(this.userJson)

    this.getUserTypeList()
  }

  //取得使用者類別列表
  userTypeList:any
  getUserTypeList(){
    this.HttpApiService.getTodoTypeRequest(1).subscribe(
      res => {
        console.log(res.body.todo_type)
        this.userTypeList = res.body.todo_type
      }
    )
  }

  type_name:any
  //新增使用者類別
  addUserType(){
    let typeData:any = {}
    typeData['name'] = this.type_name
    typeData['user_id'] = this.userJson.account_id
    console.log(typeData)
    this.HttpApiService.uploadTodoTypeRequest(typeData).subscribe(
      res => {
        console.log(res)
        if(res.code == 200){
          console.log('新增類別成功')

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'success',
            title: '新增成功'
          })
          this.type_name = ''
          this.getUserTypeList()
        }else{
          console.log('新增類別失敗')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'error',
            title: '新增失敗'
          })
        }
      } 
    )
  }

  deleteUserType(id:any){
    this.HttpApiService.deleteTodoTypeRequest(id).subscribe(
      res => {
        console.log(res)
        if(res.code == 200){
          console.log('刪除成功')
          const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: '刪除成功'
        })
        //重新呼叫類別列表
        this.getUserTypeList()
          
        }else{
          console.log('刪除失敗')
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
  
          Toast.fire({
            icon: 'error',
            title: '刪除失敗'
          })
        }
      }
    )
  }

  closeDialog(){
    window.location.reload();
  }
}
