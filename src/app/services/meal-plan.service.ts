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

  addRecipeToMealPlan(id: number, day: string, mealType: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/meal-plan`, { id, day, mealType });
  }

  removeRecipeFromMealPlan(id: number, day: string, mealType: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/meal-plan`, {
      body: { id, day, mealType }
    });
  }}
