import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressuserComponent } from './addressuser.component';

describe('AddressuserComponent', () => {
  let component: AddressuserComponent;
  let fixture: ComponentFixture<AddressuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
