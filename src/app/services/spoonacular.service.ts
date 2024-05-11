import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../interfaces/recipe';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {
  private apiUrl = 'https://api.spoonacular.com/recipes/complexSearch';
  private recipeInfoUrl = 'https://api.spoonacular.com/recipes/{id}/information?includeNutrition=true';
  //private randomRecipesUrl = 'https://api.spoonacular.com/recipes/random';
  private apiKey = '9df65189844348ca988c9fcbc1a7b23f';

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
      map(response => response.results)
    );
  }

  getPopularRecipes(): Observable<any> {
    let params = new HttpParams();
    params = params.append('apiKey', this.apiKey);
    params = params.append('sort', 'popularity');
    params = params.append('number', '4');

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => response.results)
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

  // getRandomRecipes(number: number, includeTags?: string, excludeTags?: string): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('apiKey', this.apiKey);
  //   params = params.append('number', number.toString());
  //   if (includeTags) {
  //     params = params.append('include-tags', includeTags);
  //   }
  //   if (excludeTags) {
  //     params = params.append('exclude-tags', excludeTags);
  //   }
  //   return this.http.get<any>(this.randomRecipesUrl, { params });
  // }
}