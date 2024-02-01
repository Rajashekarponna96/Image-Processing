import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAccount } from 'app/model/user';
import { environment } from 'environments/environment';
import { NGXToastrService } from 'app/service/toastr.service';
import { Role } from 'app/model/role';
import { NgForm } from '@angular/forms';
import { State } from 'app/model/state';
import { City } from 'app/model/city';
@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
    providers: [NGXToastrService]
})

export class RegisterPageComponent implements OnInit{

  show: boolean;
  @ViewChild("registerForm", null) registerForm: NgForm;

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

  role = new Role();
  roles: Role[];

  state = new State();
  states:State[];

  city = new City();
  citys:City[];

  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService, private changeDetectorRefs: ChangeDetectorRef) {
    this.show = false;
   // this.getAllUsersList();
  }
  // getUserList() {

  //   return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + '/user/list', this.httpOptions);
  // }

  // getAllUsersList() {
  //   return this.getUserList().
  //     subscribe((data) => {
  //       console.log(data);
  //       this.users = data;
  //       this.changeDetectorRefs.markForCheck();
  //     });
  // }
  onSaveConfirm() {
    //this.user.role = this.role.name;
    this.http.post<UserAccount>(environment.smartSafeAPIUrl + '/user/', this.user, this.httpOptions).subscribe(
      res => {
        console.log(res);
        
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
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
   // this.getAllUsersList();
  }
  showPassword() {
    this.show = !this.show;
  }
  getRoleList() {

    return this.http.get<Role[]>(environment.smartSafeAPIUrl + '/role/list');
  }
  getAllRolesList() {
    return this.getRoleList().
      subscribe((data) => {
        console.log(data);
        this.roles = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getStateList() {

    return this.http.get<State[]>(environment.smartSafeAPIUrl +'/state/list');
  }
  getAllStatesList() {
    return this.getStateList().
      subscribe((data) => {
        console.log(data);
        this.states = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  // getCityList() {

  //   return this.http.get<City[]>(environment.smartSafeAPIUrl + '/city/list');
  // }
  // getAllCitysList() {
  //   return this.getCityList().
  //     subscribe((data) => {
  //       console.log(data);
  //       this.citys = data;
  //       this.changeDetectorRefs.markForCheck();
  //     });
  // }

  getSelectedCitiesByStateName(state: string) {
    return this.http.get<City[]>(environment.smartSafeAPIUrl+'/city/list/'+state);
  }
  
  onCitiesSelected(state: string) {
    alert("Selected state name: " + JSON.stringify(state));
  
    this.getSelectedCitiesByStateName(state)
      .subscribe((data) => {
        this.citys = data;
      });
  }


  ngOnInit() {
   // this.getAllUsersList();
    this.getAllRolesList();
    this.getAllStatesList();
  }


  

  
  
  
  
  
  
 
  
 
}

   // @ViewChild('f', {static: false}) registerForm: NgForm;

    //  On submit click, reset field value
   // onSubmit() {
     //   this.registerForm.reset();
   // }
   






   

