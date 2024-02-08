import { Component, OnInit, Input, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit } from "@angular/core";

import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from "../animations/custom-animations";
import { ConfigService } from '../services/config.service';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';
import { Features } from "app/model/features";
import { features } from "process";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon', {static: false}) toggleIcon: ElementRef;
  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  nav_collapsed_open = false;
  logoUrl = 'assets/img/Logo_Hoi.png';
  public config: any = {};
  layoutSub: Subscription;
  feature : Features[];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private layoutService: LayoutService
  ) {
    this.menuItems = ROUTES;
    
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = true;
    }

    this.layoutSub = layoutService.customizerChangeEmitted$.subscribe(
      options => {
        if (options) {
          if (options.bgColor) {
            if (options.bgColor === 'white') {
              this.logoUrl = 'assets/img/Logo_Hoi.png';
            }
            else {
              this.logoUrl = 'assets/img/Logo_Hoi.png';
            }
          }

          if (options.compactMenu === true) {
            this.expanded = false;
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = true;
          }
          else if (options.compactMenu === false) {
            this.expanded = true;
            this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
            this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
            this.nav_collapsed_open = false;
          }

        }
      });
      //this.featurelist();
  }
  featurelist(){
    this.feature=JSON.parse(localStorage.getItem('features'));
    console.log("Feature list......"+JSON.stringify(this.feature));
  //  console.log("Feature list......"+this.feature);

  //   if (this.feature && Array.isArray(this.feature)) {
  //     console.log("checking condition is------------------");
  //     for (let i = 0; i < this.feature.length; i++) {
             

  //     for (let i = 0; i < this.menuItems.length; i++) {
  //       const menuItem = this.menuItems[i];
  //       console.log('Menu Item at index ' + i + ':', menuItem.title);
  
  //       // Check if the menu item is in the user's features
  //       const hasAccess = this.feature.some(feature => feature.name === menuItem.title);
  //       console.log("checking condition is------------------"+hasAccess);
  
  //       // Update the submenu property based on access
  //       menuItem.submenu = hasAccess ? menuItem.submenu : [];
  // }
  //     }
  //   }
  //   else {
  //     console.error('Invalid or missing features array in localStorage');
  //   }
  }
  isFeatureEnable(featureName:string){
    const featureArray: Features[] = JSON.parse(JSON.stringify(this.feature));
    console.log("feature array size is"+featureArray.length);
    console.log("feature name is"+featureName);
    for (let i = 0; i <= featureArray.length; i++) {
      
      //const featureArray: Features[] = JSON.parse(JSON.stringify(this.feature));
      
      if(featureName === featureArray[i].name){
        
        console.log("feature name list are "+featureArray[i].name);
        
        return true;
      }
    }
    //console.log("featutre is not found");
    return false;


  }
  ngOnInit() {
    this.config = this.configService.templateConf;
   

    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/Logo_Hoi.png';
    }
    else {
      this.logoUrl = 'assets/img/Logo_Hoi.png';
    }


  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed != undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = true;
        }
        else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.nav_collapsed_open = false;
        }
      }
    }, 0);


  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf("forms/ngx") !== -1)
      this.router.navigate(["forms/ngx/wizard"], { skipLocationChange: false });
  }

}
