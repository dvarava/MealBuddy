import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../interfaces/recipe';
import { FormsModule } from '@angular/forms';
import { MealPlanService } from '../../services/meal-plan.service';

@Component({
  selector: 'app-add-to-meal-plan-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-meal-plan-modal.component.html',
  styleUrl: './add-to-meal-plan-modal.component.css'
})
export class AddToMealPlanModalComponent {
  constructor(private mealPlanService: MealPlanService) {}

  @Input() recipe!: Recipe;
  @Input() showModal: boolean = false;
  @Output() addRecipe = new EventEmitter<{ id: number, day: string, mealType: string }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  selectedDay: string = '';
  selectedMealType: string = '';

  addToMealPlan() {
    this.mealPlanService.addRecipeToMealPlan(this.recipe.id, this.selectedDay, this.selectedMealType)
      .subscribe(
        (response) => {
          console.log(response.message);
          this.closeModal();
        },
        (error) => {
          console.error('Error adding recipe to meal plan:', error);
        }
      );
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}