import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Status } from 'app/model/status';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-status',
  templateUrl: './view-status.component.html',
  styleUrls: ['./view-status.component.scss']
})
export class ViewStatusComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 
  appURL:string; 
  status=new Status();
  statuses:Status[];
  constructor(private http: HttpClient,private router:Router,private spinner:NgxSpinnerService) {

    this.getAllStatusListByAppId();
   }
 
  getStatusListByAppId(){
    var appId = localStorage.getItem("appId");
    this.appURL = localStorage.getItem("appURL");
    return this.http.get<Status[]>(environment.smartSafeAPIUrl+'/getAppStatusbyAppID?appId='+appId,this.httpOptions);
  }

  getAllStatusListByAppId() {
       
            
      return this.getStatusListByAppId().
      subscribe((data) => {
        console.log(data);
        this.statuses = data;
        this.spinner.hide();
      });
      
          }  
  ngOnInit() {
    this.spinner.show();
    this.getAllStatusListByAppId();
  }

}
