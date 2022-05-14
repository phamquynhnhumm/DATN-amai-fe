import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmaterialComponent } from './unmaterial.component';

describe('UnmaterialComponent', () => {
  let component: UnmaterialComponent;
  let fixture: ComponentFixture<UnmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
