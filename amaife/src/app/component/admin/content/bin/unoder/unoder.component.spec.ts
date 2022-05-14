import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnoderComponent } from './unoder.component';

describe('UnoderComponent', () => {
  let component: UnoderComponent;
  let fixture: ComponentFixture<UnoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnoderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
