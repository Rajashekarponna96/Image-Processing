import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ImageServiceService {
  private baseUrl = "http://localhost:9000/image/uploads";

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);

    return this.http.post<any>(this.baseUrl, formData);
  }
}
