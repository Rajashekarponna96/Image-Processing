import { Component, OnInit } from "@angular/core";
import { NGXToastrService } from "app/service/toastr.service";

import { ImageServiceService } from "./image-service.service";
import { from } from "rxjs";

@Component({
  selector: "app-uploadmaize",
  templateUrl: "./uploadmaize.component.html",
  styleUrls: ["./uploadmaize.component.scss"],
  providers: [NGXToastrService],
})
export class UploadmaizeComponent implements OnInit {
  constructor(
    private imageService: ImageServiceService,
    private service: NGXToastrService
  ) {}

  ngOnInit() {}

  selectedFile: File;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  uploadImage() {
    debugger;
    if (this.selectedFile) {
      this.imageService.uploadImage(this.selectedFile).subscribe(
        (data) => {
          console.log("Image uploaded successfully:", data);
          this.service.addSuccess();
          debugger;
          // Handle success, if needed
        },
        (error) => {
          console.error("Error uploading image:", error);
          // Handle error, if needed
        }
      );
    } else {
      console.warn("No file selected.");
      // Handle case where no file is selected
    }
  }
}
