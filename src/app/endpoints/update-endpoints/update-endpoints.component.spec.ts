import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEndpointsComponent } from './update-endpoints.component';

describe('UpdateEndpointsComponent', () => {
  let component: UpdateEndpointsComponent;
  let fixture: ComponentFixture<UpdateEndpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEndpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
