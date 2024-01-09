import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import swal from 'sweetalert2';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAccount } from 'app/model/user';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  providers: [NGXToastrService]

})
export class UserManagementComponent implements OnInit {

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

    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + '/userInfo/all', this.httpOptions);
  }

  getAllUsersList() {


    return this.getUserList().
      subscribe((data) => {
        console.log(data);
        this.users = data;
        this.changeDetectorRefs.markForCheck();
        this.spinner.hide();
      });

  }
  editUsermanagement(user: UserAccount) {

    localStorage.setItem('editUser', JSON.stringify(user));
    this.router.navigate(["/user-management/update-user"]);

  }

  deleteUser(user: UserAccount) {

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
        this.http.delete<UserAccount>(environment.smartSafeAPIUrl + "/deleteUser/" + user.id, this.httpOptions).subscribe(
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


  ngOnInit() {
    // this.spinner.show();
    this.getAllUsersList();
  }



}
