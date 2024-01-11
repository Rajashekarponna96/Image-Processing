// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAccount } from 'app/model/user';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { data } from 'app/shared/data/smart-data-table';
import { Role } from 'app/model/role';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-management-for-dashboard',
  templateUrl: './user-management-for-dashboard.component.html',
  styleUrls: ['./user-management-for-dashboard.component.scss']
})
export class UserManagementForDashboardComponent implements OnInit {

  @ViewChild("aregisterForm", null) addClassForm: NgForm;
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  }

  user = new UserAccount();
  users: UserAccount[];

  user1 =  new UserAccount();
  storename:string=localStorage.getItem("STORENAME");
  
  

  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService, private changeDetectorRefs: ChangeDetectorRef, private spinner: NgxSpinnerService) {
    this.getAllUsersList();
    

  }
  onSaveConfirm() {
    if (window.confirm('Are you sure you want to Save?')) {

      this.http.post<UserAccount>(environment.smartSafeAPIUrl + '/saveuser', this.user, this.httpOptions).subscribe(
        res => {
          console.log(res);
          

          //event.confirm.resolve(event.newData);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });

    } else {
      //event.confirm.reject();
    }
    console.log(JSON.stringify(this.user));
    
   
  }

  getUserList() {
    

    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + '/userInfo/store/'+this.storename, this.httpOptions);
  }

  // gerUserdata(id:number){
  //   return this.http.get<UserAccount>(environment.smartSafeAPIUrl + "/userInfo/" + id,this.httpOptions)
  // }

  getAllUsersList() {


    return this.getUserList().
      subscribe((data) => {
        console.log(data);
        this.users = data;
        this.changeDetectorRefs.markForCheck();
        this.spinner.hide();
      });

  }
  editUsermanagement(user:UserAccount) {
    
    
    // this.user.firstName = firstName
    // console.log(firstName)
    // this.user.username = username
    // this.user.role = role    
    //  this.http.get<UserAccount>(environment.smartSafeAPIUrl + "/userInfo/" + id,this.httpOptions).subscribe(data =>{
    //   // console.log(user.firstName + ' ' +user.lastName + ' ' + user.role + ' ' + user.username)
    //   console.log(data)
    //   console.log('printed data above ')
    //   this.user.firstName = data['firstName']
    //  })
    // this.gerUserdata(id).subscribe(data =>{
    //   console.log(data)
    //   this.user.firstName = data['firstName']
    // })
    console.log(user.id)
    localStorage.setItem("id",String(user.id))
    localStorage.setItem('editUser', JSON.stringify(user));
    
    this.router.navigate(["/user-management/update-user"]);

  }

  deleteUser(user: UserAccount) {
    console.log('coming into delete' + user.active)

    if(user.active){
      console.log('coming inside active true')
      swal.fire({
        title: 'You cannot delete a active User ',
        text: "",
        type: 'warning',
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        // confirmButtonText: 'Yes, delete it!'
  
      })

    }
    if(!(user.active)){
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'

    }).then((result) => {
      console.log("hi");

      if (result.value) {
        console.log("hello");
        this.http.delete<UserAccount>(environment.smartSafeAPIUrl + "/userInfo/" + user.id, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllUsersList();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

    }
  }


  ngOnInit() {
    // this.spinner.show();
    this.getAllUsersList();
  }

  }


