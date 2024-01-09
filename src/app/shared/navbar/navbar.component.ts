import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  public isCollapsed = true;
  layoutSub: Subscription;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};

  constructor(public translate: TranslateService, private layoutService: LayoutService, private configService:ConfigService) {
    
  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    
  }

  
}
