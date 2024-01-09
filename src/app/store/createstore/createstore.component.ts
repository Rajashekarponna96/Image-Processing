import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'app/model/role';
import { StoreInfoRequest } from 'app/model/storeInfoRequest';
import { NGXToastrService } from 'app/service/toastr.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-createstore',
  templateUrl: './createstore.component.html',
  styleUrls: ['./createstore.component.scss'],
  providers: [NGXToastrService]
})
export class CreatestoreComponent implements OnInit {
  storeInfoRequest = new StoreInfoRequest();
  storeInfoRequests: StoreInfoRequest[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  getStoreList() {
    return this.http.get<StoreInfoRequest[]>(environment.smartSafeAPIUrl + '/storeinfo/all');
  }
  getAllStoresList() {
    return this.getStoreList().
      subscribe((data) => {
        console.log(data);
        this.storeInfoRequests = data;
        this.changeDetectorRefs.markForCheck();
      });
  }
  addStore() {
    this.storeInfoRequest.configured=false; 
    this.http.post<StoreInfoRequest>(environment.smartSafeAPIUrl + '/storeinfo/', this.storeInfoRequest).subscribe(
      res => {
        console.log(res);
        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllStoresList();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });
    console.log(JSON.stringify(this.storeInfoRequest));
    this.getAllStoresList();
  }
  ngOnInit() {
    this.getAllStoresList();
  }

}
