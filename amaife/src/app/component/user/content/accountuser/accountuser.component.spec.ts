import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountuserComponent } from './accountuser.component';

describe('AccountuserComponent', () => {
  let component: AccountuserComponent;
  let fixture: ComponentFixture<AccountuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
