import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatefoodComponent } from './createfood.component';

describe('CreatefoodComponent', () => {
  let component: CreatefoodComponent;
  let fixture: ComponentFixture<CreatefoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatefoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatefoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
