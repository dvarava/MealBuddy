import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMealPlan(): Observable<{ [day: string]: { [mealType: string]: Recipe[] } }> {
    return this.http.get<{ [day: string]: { [mealType: string]: Recipe[] } }>(`${this.apiUrl}/meal-plan`);
  }

  addRecipeToMealPlan(recipeId: number, day: string, mealType: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/meal-plan`, { recipeId, day, mealType });
  }

  removeRecipeFromMealPlan(recipeId: number, day: string, mealType: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/meal-plan`, {
      body: { recipeId, day, mealType }
    });
  }}
