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
    this.http.get<{ recipes: Recipe[] }>('http://3.249.164.129:5050/recipes').subscribe((jsonData) => {
      this.recipes = jsonData.recipes;
      this.recipeSubject.next(this.recipes);
    });
  }  

  onAddRecipe(recipe: Recipe) {
    if (recipe.id) {
      const recipeData = {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        extendedIngredients: recipe.extendedIngredients,
        analyzedInstructions: recipe.analyzedInstructions,
        nutrition: recipe.nutrition
      };

      console.log('Recipe data being sent to the server:', recipeData);
  
      this.http.post<{ message: string, savedRecipe: Recipe }>('http://3.249.164.129:5050/add-recipe', recipeData).subscribe(
        (response) => {
          console.log(response.message);
          this.recipes.push(response.savedRecipe);
          this.recipeSubject.next(this.recipes);
        },
        (error) => {
          console.error('Error adding recipe to favorites:', error);
        }
      );
    } else {
      console.error('Invalid recipe object. Spoonacular ID is missing.');
    }
  }

  onDeleteRecipe(id: number) {
    this.http.delete<{ message: string }>(`http://3.249.164.129:5050/remove-recipe/${id}`).subscribe(
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
