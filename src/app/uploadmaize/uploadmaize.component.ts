import { Component, OnInit } from '@angular/core';
import { NGXToastrService } from 'app/service/toastr.service';

@Component({
  selector: 'app-uploadmaize',
  templateUrl: './uploadmaize.component.html',
  styleUrls: ['./uploadmaize.component.scss'],
  providers: [NGXToastrService]
})
export class UploadmaizeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
