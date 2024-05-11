import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToMealPlanModalComponent } from './add-to-meal-plan-modal.component';

describe('AddToMealPlanModalComponent', () => {
  let component: AddToMealPlanModalComponent;
  let fixture: ComponentFixture<AddToMealPlanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToMealPlanModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToMealPlanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
