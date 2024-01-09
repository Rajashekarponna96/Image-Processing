import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ChangePasswordDto } from 'app/model/ChangePasswordDto';
import { NGXToastrService } from 'app/service/toastr.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers:[NGXToastrService]
})
export class ChangePasswordComponent implements OnInit {

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
  onSubmitConfirm() {
    
       this.changePasswordDto.email = localStorage.getItem('email');

      this.http.post<ChangePasswordDto>(environment.smartSafeAPIUrl + '/changePassword', this.changePasswordDto, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
this.service.passwordChangeSuccess();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          this.service.typeWarning();
        });
  
    
    console.log(JSON.stringify(this.changePasswordDto));
  }

  ngOnInit() {
  }

}
