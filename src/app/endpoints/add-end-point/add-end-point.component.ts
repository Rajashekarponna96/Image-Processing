import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Application } from 'app/model/api';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { NGXToastrService } from 'app/service/toastr.service';
import { Header } from 'app/model/header';

@Component({
  selector: 'app-add-end-point',
  templateUrl: './add-end-point.component.html',
  styleUrls: ['./add-end-point.component.scss'],
  providers: [NGXToastrService]
})
export class AddEndPointComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  api = new Application();
  apis: Application[];
  //newDynamic: any = {}; 
  
  constructor(private http: HttpClient, private router: Router, private service: NGXToastrService,private changeDetectorRefs: ChangeDetectorRef) {
    this.getAllEndPointsList();
  }
  getEndPointsList() {

    return this.http.get<Application[]>(environment.smartSafeAPIUrl + '/getAllApps',this.httpOptions);
  }

  getAllEndPointsList() {


    return this.getEndPointsList().
      subscribe((data) => {
        console.log(data);
        this.apis = data;
        this.changeDetectorRefs.markForCheck();

      });

  }
  onSaveConfirm() {

    this.http.post<Application>(environment.smartSafeAPIUrl + '/saveApp', this.api, this.httpOptions).subscribe(
      res => {
        console.log(res);

        //event.confirm.resolve(event.newData);
        this.service.addSuccess();
        this.getAllEndPointsList();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occured.");
        } else {
          console.log("Server-side error occured.");
        }
        this.service.typeWarning();
      });


    console.log(JSON.stringify(this.api));
  }
  ngOnInit() {
    this.getAllEndPointsList();
    this.api.headers = [];
      this.api.headers.push(new Header()); 
  }

  addRow(index) {  

    this.api.headers.push(new Header());  
    //this.toastr.success('New row added successfully', 'New Row');  
    console.log(this.api.headers);  
    //return true;  
}  
  
deleteRow(index) {  
    if(this.api.headers.length ==1) {  
      alert("Can't delete the row when there is only one row");  
        return false;  
    } else {  
        this.api.headers.splice(index, 1);  
         console.log(this.api.headers);  
        return true;  
    }  
}  

}
