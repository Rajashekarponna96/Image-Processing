import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';
import { Role } from 'app/model/role';
import { NgForm } from '@angular/forms';
import { State } from 'app/model/state';
import { City } from 'app/model/city';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  providers: [NGXToastrService]
})
export class UpdateUserComponent implements OnInit {

  @ViewChild("addClassForm", null) addClassForm: NgForm;
  
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
  roles : Role[];

  state = new State();
  states:State[];

  city = new City();
  citys:City[];

  constructor(private http: HttpClient, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) { }
  getAllRolesList() {
    return this.getRoleList().
      subscribe((data) => {
        console.log(data);
        this.roles = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  getRoleList() {

    return this.http.get<Role[]>(environment.smartSafeAPIUrl + '/role/all');
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

  getSelectedCitiesByStateName(state: string) {
    return this.http.get<City[]>(environment.smartSafeAPIUrl+'/city/list/'+state);
  }
  
  onCitiesSelected(state: string) {
   // alert("Selected state name: " + JSON.stringify(state));
  
    this.getSelectedCitiesByStateName(state)
      .subscribe((data) => {
        this.citys = data;
      });
  }
  ngOnInit() {
    
    this.getAllStatesList();  
    // this.user =  JSON.parse(localStorage.getItem('editUser'));
    this.user =  JSON.parse(localStorage.getItem('editUser'))
    console.log('print the current user')
    console.log(this.user)

    this.getAllUsersList();
    let a= (localStorage.getItem('id'))
    console.log('this is Id of current user ' + a)
    console.log(this.user.id)
    this.getAllRolesList();
    return this.http.get<UserAccount>(environment.smartSafeAPIUrl + "/user/" + a,this.httpOptions).subscribe(data =>{
        // console.log(user.firstName + ' ' +user.lastName + ' ' + user.role + ' ' + user.username)
        console.log(data)
        // console.log('printed data above ')
        // this.user.firstName = data['firstName']
        // this.user.lastName = data['lastName']
        // this.user.mobile = data['mobile']
        this.user = data
        console.log('print the user ' + this.user)
       })
       
    
  }
 
  getUserList(){
    
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl+'/user/list', this.httpOptions);
  }

    getAllUsersList() {
       
            
      return this.getUserList().
      subscribe((data) => {
        console.log(data);
        console.log('printing users list')
        this.users = data;
        this.changeDetectorRefs.markForCheck();

      });
      
          }  
  updateUserManagement() {
    


      this.http.put<UserAccount>(environment.smartSafeAPIUrl +"/user/"+this.user.id, this.user, this.httpOptions).subscribe(
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
        this.getAllUsersList();

    
    console.log(JSON.stringify(this.user));
  }
}
