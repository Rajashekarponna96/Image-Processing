import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Status } from 'app/model/status';
import { ActivatedRoute, Router } from '@angular/router';
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
  state:any;
  statename:string;

  cities:any[];
  constructor(private http: HttpClient,private router:Router,private spinner:NgxSpinnerService, private route:ActivatedRoute) {

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
          
          getAllCityList() {
            this.statename =localStorage.getItem('stateName');
            console.log("state Name is------:"+this.statename)
            return this.http.get<any>(environment.smartSafeAPIUrl + '/city/list/'+this.statename);
          }
          getAllAssignedCityList() {
            return this.getAllCityList().
              subscribe((data) => {
                console.log(data);
                this.cities = data;
                //localStorage.setItem('stateNames',this.states)
                
              });
          }
        






  ngOnInit() {
    this.getAllAssignedCityList();

  //   this.route.queryParams.subscribe(params => {
  //     this.state = params['state'];
  //     console.log('State value:', this.state);
  //   });
  // }
   
    
  }

}
  