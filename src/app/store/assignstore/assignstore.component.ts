import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { UserAccount } from 'app/model/user';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-assignstore',
  templateUrl: './assignstore.component.html',
  styleUrls: ['./assignstore.component.scss'],
  providers: [NGXToastrService]
})
export class AssignstoreComponent implements OnInit {
  role = new Role();
  roles: Role[];

  store = new StoreInfoRequest();
  stores: StoreInfoRequest[];
  selectedStore = new StoreInfoRequest();
  //selectedStores:StoreInfoRequest[];
  employee = new UserAccount();
  employees: UserAccount[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  getUnAssignedStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all/unassigned');
  }
  getAllUnassignedStoresList() {
    return this.getUnAssignedStoreList().
      subscribe((data) => {
        console.log(data);
        this.stores = data;
        this.changeDetectorRefs.markForCheck();
      });
  }

  onStoreSelected(storeName: string) {
    this.getStoresByStoreName(storeName).
      subscribe((data) => {
        this.selectedStore = data;

      })
  }

  getStoresByStoreName(storeName: string) {
    return this.http.get<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/' + storeName);
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
  onRoleSelected(roleName: string) {
    this.getUnassignedEmployeesByrole(roleName).
      subscribe((data) => {
        this.employees = data;

      })
  }

  getUnassignedEmployeesByrole(roleName: string) {
    return this.http.get<UserAccount[]>(environment.smartSafeAPIUrl + '/userInfo/role/' + roleName+"/unassignedusers");
  }
  ngOnInit() {
    this.getAllUnassignedStoresList();
    this.getAllRolesList();
  }

  assignStoretouser(storeId: number, userId: number) {

    return this.http.post(environment.smartSafeAPIUrl + '/storeinfo/assign/store/' + storeId + "/user/" + userId, {});
  }
  assignStore(storeId: number, userId: number) {
    return this.assignStoretouser(storeId, userId).
      subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl("dashboard");
      });
  }


}
