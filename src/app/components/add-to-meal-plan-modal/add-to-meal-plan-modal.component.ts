import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from '../../interfaces/recipe';
import { FormsModule } from '@angular/forms';
import { style } from '@angular/animations';

@Component({
  selector: 'app-add-to-meal-plan-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-meal-plan-modal.component.html',
  styleUrl: './add-to-meal-plan-modal.component.css'
})
export class AddToMealPlanModalComponent {
  @Input() recipe!: Recipe;
  @Input() showModal: boolean = false;
  @Output() addRecipe = new EventEmitter<{ recipe: Recipe, day: string, mealType: string }>();
  @Output() closeModalEvent = new EventEmitter<void>();

  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  selectedDay: string = '';
  selectedMealType: string = '';

  addToMealPlan() {
    this.addRecipe.emit({ recipe: this.recipe, day: this.selectedDay, mealType: this.selectedMealType });
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}