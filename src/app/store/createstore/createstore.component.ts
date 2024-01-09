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
  [x: string]: any;
  storeInfoRequest = new StoreInfoRequest();
  storeInfoRequests: StoreInfoRequest[];

  constructor(private http: HttpClient,
    private router: Router,
    private service: NGXToastrService,
    private changeDetectorRefs: ChangeDetectorRef) {
  }
  // uploadedImages: { url: string }[] = [];

  // onImageSelected(event: any): void {
  //   // Handle image selection logic
  // }

  // uploadImage(): void {
  //   const fileInput = document.getElementById('image') as HTMLInputElement;
  //   const file = fileInput.files ? fileInput.files[0] : null;

  //   if (file) {
  //     const reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       const imageUrl = e.target.result;
  //       this.uploadedImages.push({ url: imageUrl });

  //       // Optionally, you can reset the file input to allow uploading another image
  //       fileInput.value = '';
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }

  // onImageSelected(event: any): void {
  //   // Handle image selection logic if needed
  // }

  // uploadImage(): void {
  //   // Handle image upload logic
  // }
  // uploadImage(): void {
  //   const fileInput = document.getElementById('image') as HTMLInputElement;
  //   const file = fileInput.files?.[0];
  
  //   if (file) {
  //     const reader = new FileReader();
  
  //     reader.onload = (e: any) => {
  //       const imageUrl = e.target.result;
  //       this.uploadedImages.push({ url: imageUrl });
  
  //       // Optionally, you can reset the file input to allow uploading another image
  //       fileInput.value = '';
  //     };
  
  //     reader.readAsDataURL(file);
  //   }
  // }
 
  // uploadImage(): void {
  //   const fileInput = document.getElementById('image') as HTMLInputElement;
  //   const file = fileInput.files ? fileInput.files[0] : null;
  
  //   if (file) {
  //     const reader = new FileReader();
  
  //     reader.onload = (e: any) => {
  //       const imageUrl = e.target.result;
  //       this.uploadedImages.push({ url: imageUrl });
  
  //       // Optionally, you can reset the file input to allow uploading another image
  //       fileInput.value = '';
  //     };
  
  //     reader.readAsDataURL(file);
  //   }
  // }
  
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


  //

  // imageFile: any; // Use appropriate data type for the image file
  // wid: number;
  // len: number;
  // count: number;

  // // constructor(private http: HttpClient) {}

  // onFileChange(event: any): void {
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     this.imageFile = fileList[0];
  //   }
  // }

  // uploadImage(): void {
  //   const formData = new FormData();
  //   formData.append('image', this.imageFile);

  //   this.http.post('/upload', formData).subscribe((response: any) => {
  //     // Handle the response data, update component properties if necessary
  //     this.wid = response.wid;
  //     this.len = response.len;
  //     this.count = response.count;
  //   });
 
  // imageFile: any;
  // wid: number;
  // len: number;
  // count: number;

  // //constructor(private http: HttpClient) {}

  // onFileChange(event: any): void {
  //   const fileList: FileList = event.target.files;
  //   if (fileList.length > 0) {
  //     this.imageFile = fileList[0];
  //   }
  // }

  // uploadImage(): void {
  //   const formData = new FormData();
  //   formData.append('image', this.imageFile);

  //   this.http.post('/upload', formData).subscribe((response: any) => {
  //     // Handle the response data, update component properties if necessary
  //     this.wid = response.wid;
  //     this.len = response.len;
  //     this.count = response.count;
  //   });
  // }

  // getUploadedImageUrl(): string {
  //   // Assuming the image is stored in the 'uploads' folder on the server
  //   return `/static/uploads/${this.imageFile.name}`;
  // }

  imageFile: any;
  wid: number;
  len: number;
  count: number;

  // constructor(private http: HttpClient) {}

  onFileChange(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.imageFile = fileList[0];
    }
  }

  uploadImage(): void {
    const formData = new FormData();
    formData.append('image', this.imageFile);

    this.http.post('/upload', formData).subscribe((response: any) => {debugger;
      // Handle the response data, update component properties if necessary
      this.wid = response.wid;
      this.len = response.len;
      this.count = response.count;

      // Store image details in local storage
      localStorage.setItem('uploadedImageDetails', JSON.stringify({ 
        wid: this.wid,
        len: this.len,
        count: this.count
      }));
    });
  }

  getUploadedImageUrl(): string {
    // Retrieve image details from local storage
    const uploadedImageDetails = JSON.parse(localStorage.getItem('uploadedImageDetails') || '{}');
    
    // Assuming the image is stored in the 'uploads' folder on the server
    return `/static/uploads/${this.imageFile.name}?wid=${uploadedImageDetails.wid}&len=${uploadedImageDetails.len}&count=${uploadedImageDetails.count}`;
  }
}