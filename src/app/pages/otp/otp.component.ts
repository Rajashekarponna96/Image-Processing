import { Component, OnInit } from '@angular/core';
import { OTPDto } from 'app/model/otpdto';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterDataService } from 'app/service/master-data.service';
import { environment } from 'environments/environment';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [NGXToastrService]
})
export class OtpComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  
  otpDTO = new OTPDto();
  constructor(private router: Router,
    private route: ActivatedRoute, private http: HttpClient, private service: NGXToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.hide();

  }
  validateOtp(otp: string) {
    console.log("OTP " + otp);
    this.otpDTO.token = otp;
    var email = localStorage.getItem('email');
    console.log(" LogIn UserName " + email);
    this.otpDTO.email = email;
    this.http.post<UserAccount>(environment.smartSafeAPIUrl + '/validateOTP', this.otpDTO ,this.httpOptions).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        

        this.router.navigate(['dashboard']);
        this.service.loginSuccess();

      },
      (err: HttpErrorResponse) => {
        alert("OTP verification failed. Invalid OTP");
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
      });
  }
}
