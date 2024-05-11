import { Injectable } from '@angular/core';
import { Recipe } from '../interfaces/recipe';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  public recipeSubject = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private http: HttpClient) { }

  getFavouriteRecipes() {
    this.http.get<{ recipes: Recipe[] }>('http://localhost:3000/recipes').subscribe((jsonData) => {
      this.recipes = jsonData.recipes;
      this.recipeSubject.next(this.recipes);
    });
  }  

  onAddRecipe(recipe: Recipe) {
    this.http.post<{ message: string }>('http://localhost:3000/add-recipe-to-favourites', recipe).subscribe(
      (jsonData) => {
        console.log(jsonData.message);
        this.getFavouriteRecipes();
      },
      (error) => {
        console.error('Error adding recipe to favorites:', error);
      }
    );
  }

  onDeleteRecipe(id: number) {
    this.http.delete<{ message: string }>(`http://localhost:3000/remove-recipe-from-favourites/${id}`).subscribe(
      (jsonData) => {
        console.log(jsonData.message);
        this.getFavouriteRecipes();
      },
      (error) => {
        console.error('Error deleting recipe from favorites:', error);
      }
    );
  }
}
