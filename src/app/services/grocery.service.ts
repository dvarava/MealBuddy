import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../interfaces/ingredient';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
  private apiUrl = 'http://34.254.246.165:5050/grocery-list';

  constructor(private http: HttpClient) { }

  getGroceryList(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  addIngredientsToGroceryList(items: Ingredient[]): Observable<{ message: string, groceryList: Ingredient[] }> {
    return this.http.post<{ message: string, groceryList: Ingredient[] }>(this.apiUrl, { items });
  }

  addIngredientToGroceryList(item: Ingredient): Observable<{ message: string, groceryList: Ingredient[] }> {
    return this.http.post<{ message: string, groceryList: Ingredient[] }>(`${this.apiUrl}/item`, { item });
  }

  removeIngredientFromGroceryList(index: number): Observable<{ message: string, groceryList: Ingredient[] }> {
    return this.http.delete<{ message: string, groceryList: Ingredient[] }>(`${this.apiUrl}/item/${index}`);
  }

  clearGroceryList(): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(this.apiUrl);
  }
}