import { Component, OnInit } from '@angular/core';
import { Application } from 'app/model/api';
import { environment } from 'environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NGXToastrService } from 'app/service/toastr.service';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-endpoints',
  templateUrl: './endpoints.component.html',
  styleUrls: ['./endpoints.component.scss'],
  providers:[NGXToastrService],
  
})
export class EndpointsComponent implements OnInit {

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
  constructor(private http: HttpClient, private router: Router,private service:NGXToastrService,private spinner:NgxSpinnerService) {
    
    this.getAllEndPointsList();
    

    
  }

  getEndPointsList() {

    return this.http.get<Application[]>(environment.smartSafeAPIUrl + '/getAllApps', this.httpOptions);

  }

  getAllEndPointsList() {


    return this.getEndPointsList().
      subscribe((data) => {
        console.log(data);
        this.apis = data;
        this.spinner.hide();
      });

  }
  editEndPoints(api: Application) {

    localStorage.setItem('api', JSON.stringify(api));
    this.router.navigate(["/endpoints/update-endpoints"]);

  }
  // deleteEndPoints(api: Application){
  //   if (window.confirm('Are you sure you want to Delete?')) {
  //     this.http.delete<Application>(environment.smartSafeAPIUrl + "/deleteApp/" + api.appId).subscribe(
  //       res => {
  //         console.log(res);
  //         //event.confirm.resolve(event.newData);
  //         this.service.typeDelete();
  //         this.getAllEndPointsList();
  //       },
  //       (err: HttpErrorResponse) => {
  //         if (err.error instanceof Error) {
  //           console.log("Client-side error occured.");
  //         } else {
  //           console.log("Server-side error occured.");
  //         }
  //       });

  //   } else {
  //     //event.confirm.reject();
  //   }
  //   console.log(JSON.stringify(this.api));
  // }
  deleteEndPoints(api: Application){
           
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
      
    }).then((result) => {
      console.log("hi");
     
      if (result.value) {
        console.log("hello");
        this.http.delete<Application>(environment.smartSafeAPIUrl + "/deleteApp/" + api.appId, this.httpOptions).subscribe(
          res => {
            console.log(res);
            //event.confirm.resolve(event.newData);
            this.service.typeDelete();
            this.getAllEndPointsList();
          },
          (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              console.log("Client-side error occured.");
            } else {
              console.log("Server-side error occured.");
            }
          });
        swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
    
  }


  ngOnInit() {
    this.spinner.show();
    this.getAllEndPointsList();

  }

}
