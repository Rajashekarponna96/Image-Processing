import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ChangePasswordDto } from 'app/model/ChangePasswordDto';
import { NGXToastrService } from 'app/service/toastr.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers:[NGXToastrService]
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild("forgotPasswordForm", null) forgotPasswordForm: NgForm;

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

  changePasswordDto=new ChangePasswordDto();

  constructor(private http: HttpClient,private service:NGXToastrService) { }
  
  onSubmitConfirm( changePasswordDto: ChangePasswordDto) {
    
     this.changePasswordDto.email = localStorage.getItem('user');
       
      this.http.post<ChangePasswordDto>(environment.smartSafeAPIUrl + "/userInfo/changePassword/"+changePasswordDto.oldPassword+'/'+changePasswordDto.newPassword, this.changePasswordDto, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.passwordChangeSuccess();
          this.forgotPasswordForm.reset();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          this.service.typeCustommessage(err.error.message);

        });
  
    
    console.log(JSON.stringify(this.changePasswordDto));
  }

  ngOnInit() {
  }

}
