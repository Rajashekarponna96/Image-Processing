import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.scss'],
  providers: [NGXToastrService]
})
export class CreateroleComponent implements OnInit {
  role = new Role();
  roles: Role[];
  roleFeatures: string[] = ['All', 'InsertBills', 'Doors', 'Admin', 'ChangeRequestDoors', 'StandBank', 'OTPScreen', 'Valut'
  ];
  
  SelectedFeatureNames: string[];
  searchText: string = '';
  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getRoleList() {

    return this.http.get<Role[]>(environment.smartSafeAPIUrl + '/role/all');
  }
  getAllRolesList() {
    return this.getRoleList().
      subscribe((data) => {
        console.log(data);
        this.roles = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addRole() {
    var role = new Role();
    role.features = this.SelectedFeatureNames;
    this.http.post<Role>(environment.smartSafeAPIUrl + '/role/', this.role).subscribe(
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
    console.log(JSON.stringify(this.role));
    this.getAllRolesList();
  }
  ngOnInit() {
    this.getAllRolesList();
  }

}
