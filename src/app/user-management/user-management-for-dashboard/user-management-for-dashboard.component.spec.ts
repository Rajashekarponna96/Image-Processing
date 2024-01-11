import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementForDashboardComponent } from './user-management-for-dashboard.component';

describe('UserManagementForDashboardComponent', () => {
  let component: UserManagementForDashboardComponent;
  let fixture: ComponentFixture<UserManagementForDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManagementForDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementForDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
