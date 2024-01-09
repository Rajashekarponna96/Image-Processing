import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { UserAccount } from 'app/model/user';
import { MasterDataService } from 'app/service/master-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/service/toastr.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [NGXToastrService]
})

export class LoginPageComponent {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  
  ipAddress: string;
  user = new UserAccount();
  @ViewChild('f', { static: false }) loginForm: NgForm;
  password: string;
  

  constructor(private router: Router,
    private route: ActivatedRoute,private service: NGXToastrService, private http: HttpClient,private spinner:NgxSpinnerService, private masterDataService: MasterDataService) { }

  // On submit button click
  onSubmit() {
    this.loginForm.reset();
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  onLogin(email: string, password: string) {
   // alert("Login Successfull" + email + password);
  // this.router.navigate(['/dashboard']);
   this.spinner.show();
    var user = new UserAccount();
    user.password = this.password;
    user.feature = "Admin";
  //  localStorage.setItem("email",email);
    //this.getIP();
    this.http.post<UserAccount>(environment.smartSafeAPIUrl+ '/userInfo/login', user, this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        if (res) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
          this.service.loginSuccess();
          this.spinner.hide();
          
        } else {
          alert("Login failed. Invalid Credentials");
          this.spinner.hide();            
        }

      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
          this.spinner.hide();
        }
        else {
        //  alert("Login failed." +err.error.message);
          console.log("Server-side error occured.");
          this.service.showMessage(err.error.message);
          this.spinner.hide();
        }
      });


  }


  // getIP() {
  //   this.masterDataService.getIPAddress().subscribe((res: any) => {
  //     this.ipAddress = res.ip;
  //   });
  // }

}


  


