import { Component, OnInit } from '@angular/core';
import { Role } from 'app/model/role';

@Component({
  selector: 'app-createkiosk',
  templateUrl: './createkiosk.component.html',
  styleUrls: ['./createkiosk.component.scss']
})
export class CreatekioskComponent implements OnInit {
role = new Role();
roles : Role[];
  constructor() { }

  ngOnInit() {
  }

}
