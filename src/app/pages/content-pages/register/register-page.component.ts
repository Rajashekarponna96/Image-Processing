import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAccount } from 'app/model/user';
import { environment } from 'environments/environment';
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent implements OnInit{

  show: boolean;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  
    user=new UserAccount();
  users: UserAccount[];
  


  constructor(private http: HttpClient,private router:Router) { 
    this.show = false;
  }
  registerUser() {
    if (window.confirm('Are you sure you want to Save?')) {
     
      this.http.post<UserAccount>(environment.smartSafeAPIUrl + '/saveuser',this.user, this.httpOptions).subscribe(
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

  showPassword() {
    this.show = !this.show;
}
 
         
  ngOnInit() {
    this.user.role="Admin";
  }

  

  
  
  
  
  
  
 
  
 
}

   // @ViewChild('f', {static: false}) registerForm: NgForm;

    //  On submit click, reset field value
   // onSubmit() {
     //   this.registerForm.reset();
   // }
   






   

