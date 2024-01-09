import { Component, OnInit } from '@angular/core';
import { UserAccount } from 'app/model/user';
import { environment } from 'environments/environment';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

  user= new UserAccount();
  constructor(private http: HttpClient) { }

  ngOnInit() {
   // this.user=JSON.parse(localStorage.getItem('user'));
    this.loadUser();
  }
  loadUser(){
   
                   
    //this.user=JSON.parse(localStorage.getItem('user'));  
    var email =localStorage.getItem('email');
      this.http.get<UserAccount>(environment.smartSafeAPIUrl + "/userByEmail?email="+email, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
this.user=res;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
        });
  
   
    console.log(JSON.stringify(this.user));
  }
}

