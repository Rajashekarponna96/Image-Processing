import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageServiceService {
  private baseUrl = "http://localhost:9000/image/uploads1";

  constructor(private http: HttpClient) {}
  userId:any=localStorage.getItem('userId')
  
  

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
     let userId:any=localStorage.getItem('userId')

    console.log("user id is:"+this.userId)

    return this.http.post<any>(this.baseUrl+'/'+ this.userId, formData);
  }
}
