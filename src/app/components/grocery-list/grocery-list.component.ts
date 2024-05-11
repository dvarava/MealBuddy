import { Component } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { SpoonacularService } from '../../services/spoonacular.service';
import { Recipe } from '../../interfaces/recipe';
import { FavouritesService } from '../../services/favourites.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-grocery-list',
    standalone: true,
    templateUrl: './grocery-list.component.html',
    styleUrl: './grocery-list.component.css',
    imports: [CommonModule, FooterComponent, HeaderComponent]
})
export class GroceryListComponent {
  ingredients: Ingredient[] = [];
  selectedIngredient: Ingredient | null = null;

  constructor(
    private spoonacularService: SpoonacularService,
    private favouritesService: FavouritesService
  ) { }

  ngOnInit() {
    this.favouritesService.getFavouriteRecipes();
    this.favouritesService.recipeSubject.subscribe((recipes: Recipe[]) => {
      const ingredientsPromises = recipes.map(recipe =>
        this.spoonacularService.getRecipeById(recipe.id).toPromise()
          .then(recipeDetails => this.getIngredientsFromRecipe(recipeDetails))
          .catch(error => {
            console.error(`Error fetching recipe ${recipe.id}:`, error);
            return [];
          })
      );
  
      Promise.all(ingredientsPromises)
        .then(ingredientsLists => {
          this.ingredients = ingredientsLists.reduce((acc: Ingredient[], curr) => acc.concat(curr), []);
        })
        .catch(error => {
          console.error('Error fetching ingredients:', error);
        });
    });
  }

  getIngredientsFromRecipe(recipe: Recipe): Ingredient[] {
    return recipe.extendedIngredients.map(ingredient => ({
      id: ingredient.id,
      originalName: ingredient.originalName,
      amount: ingredient.amount,
      unit: ingredient.unit,
      original: ingredient.original
    }));
  }

  selectIngredient(ingredient: Ingredient) {
    this.selectedIngredient = ingredient;
  }
}
