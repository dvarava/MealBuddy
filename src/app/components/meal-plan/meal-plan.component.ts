import { Component } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { MealPlanService } from '../../services/meal-plan.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-meal-plan',
    standalone: true,
    templateUrl: './meal-plan.component.html',
    styleUrl: './meal-plan.component.css',
    imports: [CommonModule, RouterModule, FooterComponent, HeaderComponent]
})

export class MealPlanComponent {
  mealPlan: { [day: string]: { [mealType: string]: Recipe[] } } = {
    Monday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Friday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] }
  };

  selectedDay: string = '';
  selectedMealType: string = '';
  selectedRecipe: Recipe | null = null;

  constructor(private mealPlanService: MealPlanService) { }

  ngOnInit() {
    this.getMealPlan();
  }

  getMealPlan() {
    this.mealPlanService.getMealPlan().subscribe(
      (mealPlan) => {
        this.mealPlan = mealPlan;
      },
      (error) => {
        console.error('Error fetching meal plan:', error);
      }
    );
  }

  selectDay(day: string) {
    console.log('selectDay called with:', day);
    this.selectedDay = day;
    this.selectedMealType = '';
  }

  selectMealType(mealType: string) {
    console.log('selectMealType called with:', mealType);
    this.selectedMealType = mealType;
  }

  addRecipeToMealPlan(recipe: Recipe, day: string, mealType: string) {
    console.log('Adding recipe to meal plan:', recipe, day, mealType);
    this.mealPlanService.addRecipeToMealPlan(recipe.id, day, mealType).subscribe(
      (response) => {
        console.log(response.message);
        this.getMealPlan();
      },
      (error) => {
        console.error('Error adding recipe to meal plan:', error);
      }
    );
  }

  removeRecipeFromMealPlan(recipe: Recipe, day: string, mealType: string) {
    this.mealPlanService.removeRecipeFromMealPlan(recipe.id, day, mealType).subscribe(
      (response) => {
        console.log(response.message);
        this.getMealPlan();
      },
      (error) => {
        console.error('Error removing recipe from meal plan:', error);
      }
    );
  }
}
