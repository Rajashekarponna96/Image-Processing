import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateUserComponent implements OnInit {
  
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

  user = new UserAccount();
  users: UserAccount[];
  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('editUser'));
  }
  getUserList(){
    
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl+'/getusers', this.httpOptions);
  }

    getAllUsersList() {
       
            
      return this.getUserList().
      subscribe((data) => {
        console.log(data);
        this.users = data;
        this.changeDetectorRefs.markForCheck();

      });
      
          }  
  updateUserManagement() {
    


      this.http.put<UserAccount>(environment.smartSafeAPIUrl + "/updateUser", this.user, this.httpOptions).subscribe(
        res => {
          console.log(res);
          //event.confirm.resolve(event.newData);
          this.service.updateSuccess();
          this.getAllUsersList();

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          this.service.typeWarning();
        });

    
    console.log(JSON.stringify(this.user));
  }
}
