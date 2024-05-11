import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../../services/spoonacular.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Recipe } from '../../interfaces/recipe';


@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  recipeId?: number;
  recipe: Recipe | null = null;

  constructor(
    private route: ActivatedRoute,
    private spoonacularService: SpoonacularService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      this.getRecipeDetails();
    });
  }

  getRecipeDetails() {
    if (this.recipeId) {
      this.spoonacularService.getRecipeById(this.recipeId).subscribe(
        recipe => {
          this.recipe = recipe;
        },
        error => {
          console.error('Error retrieving recipe details:', error);
        }
      );
    }
  }

  addIngredientsToGroceryList() {
    if (this.recipe && this.recipe.extendedIngredients) {
      const ingredients = this.recipe.extendedIngredients.map((ingredient: any) => ingredient.original);
      this.spoonacularService.addIngredientsToGroceryList(ingredients);
    }
  }
}
