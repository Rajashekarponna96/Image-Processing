import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserManagementComponent } from './add-user-management.component';

describe('AddUserManagementComponent', () => {
  let component: AddUserManagementComponent;
  let fixture: ComponentFixture<AddUserManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
