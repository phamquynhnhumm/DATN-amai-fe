import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailfoodComponent } from './detailfood.component';

describe('DetailfoodComponent', () => {
  let component: DetailfoodComponent;
  let fixture: ComponentFixture<DetailfoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailfoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailfoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
