import { Component, OnInit } from '@angular/core';
import { Application } from 'app/model/api';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Status } from 'app/model/status';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*' ,
      'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Authorization': 'Basic ' + btoa('dashboard:$dashboardPWD$')
    })
  } 

  api=new Application();
  status=new Status();
  apis: Application[];
  constructor(private http: HttpClient,private router:Router,private spinner:NgxSpinnerService) {

   }
 
   
          

  ngOnInit() {
   // this.spinner.show();
   // this.getAllEndPointsList();
  }

}
