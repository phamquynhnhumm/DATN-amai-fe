import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoderdetailComponent } from './unoderdetail.component';

describe('UnoderdetailComponent', () => {
  let component: UnoderdetailComponent;
  let fixture: ComponentFixture<UnoderdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnoderdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnoderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
