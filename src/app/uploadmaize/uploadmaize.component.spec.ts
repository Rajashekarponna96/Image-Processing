import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadmaizeComponent } from './uploadmaize.component';

describe('UploadmaizeComponent', () => {
  let component: UploadmaizeComponent;
  let fixture: ComponentFixture<UploadmaizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadmaizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadmaizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
