import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private recipeInfoUrl = 'https://api.spoonacular.com/recipes/{id}/information?includeNutrition=true';
  private apiKey = 'c5d83f33429a42e5a6a590866740f5ed';

  constructor(private http: HttpClient) { }

  searchRecipes(query: string, maxFat?: number, number?: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('apiKey', this.apiKey);
    params = params.append('query', query);

    if (maxFat) {
      params = params.append('maxFat', maxFat.toString());
    }

    if (number) {
      params = params.append('number', number.toString());
    }

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.results),
      mergeMap((results: any[]) => {
        const recipeIds = results.map(result => result.id);
        return this.fetchRecipeDetails(recipeIds);
      })
    );
  }

  private fetchRecipeDetails(recipeIds: number[]): Observable<Recipe[]> {
    const requests = recipeIds.map(id =>
      this.http.get<Recipe>(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${this.apiKey}`)
    );
  
    return forkJoin(requests);
  }

  getPopularRecipes(): Observable<any> {
    let params = new HttpParams();
    params = params.append('apiKey', this.apiKey);
    params = params.append('sort', 'popularity');
    params = params.append('number', '4');

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.results),
      mergeMap((results: any[]) => {
        const recipeIds = results.map(result => result.id);
        return this.fetchRecipeDetails(recipeIds);
      })
    );
  }

  getRecipeById(id: number): Observable<any> {
    const url = this.recipeInfoUrl.replace('{id}', id.toString());
    const params = new HttpParams().set('apiKey', this.apiKey);
    return this.http.get<Recipe>(url, { params });
  }

  addIngredientsToGroceryList(ingredients: string[]) {
    console.log('Ingredients added to Grocery List:', ingredients);
  }
}