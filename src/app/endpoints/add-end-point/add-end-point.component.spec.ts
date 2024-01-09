import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEndPointComponent } from './add-end-point.component';

describe('AddEndPointComponent', () => {
  let component: AddEndPointComponent;
  let fixture: ComponentFixture<AddEndPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEndPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEndPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
