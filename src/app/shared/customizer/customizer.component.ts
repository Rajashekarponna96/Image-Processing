import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { LayoutService } from "../services/layout.service";
import { ConfigService } from "../services/config.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-customizer",
  templateUrl: "./customizer.component.html",
  styleUrls: ["./customizer.component.scss"]
})
export class CustomizerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
}
