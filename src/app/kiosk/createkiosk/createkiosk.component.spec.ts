import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatekioskComponent } from './createkiosk.component';

describe('CreatekioskComponent', () => {
  let component: CreatekioskComponent;
  let fixture: ComponentFixture<CreatekioskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatekioskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatekioskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
