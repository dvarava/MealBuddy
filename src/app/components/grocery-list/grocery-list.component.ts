import { Component } from '@angular/core';
import { Ingredient } from '../../interfaces/ingredient';
import { SpoonacularService } from '../../services/spoonacular.service';
import { Recipe } from '../../interfaces/recipe';
import { FavouritesService } from '../../services/favourites.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { FormsModule } from '@angular/forms';
import { GroceryService } from '../../services/grocery.service';
import { MealPlanService } from '../../services/meal-plan.service';

@Component({
    selector: 'app-grocery-list',
    standalone: true,
    templateUrl: './grocery-list.component.html',
    styleUrl: './grocery-list.component.css',
    imports: [CommonModule, FooterComponent, HeaderComponent, FormsModule]
})
export class GroceryListComponent {
  ingredients: Ingredient[] = [];
  selectedIngredient: Ingredient | null = null;
  showModal: boolean = false;
  newIngredientName: string = '';
  newIngredientAmount: number = 0;
  newIngredientUnit: string = ''
  
  constructor(private groceryService: GroceryService, private mealPlanService: MealPlanService) { }

  ngOnInit() {
    this.fetchGroceryList();
  
    this.mealPlanService.getMealPlan().subscribe(
      (mealPlan) => {
        const allIngredients: Ingredient[] = [];
  
        for (const day in mealPlan) {
          for (const mealType in mealPlan[day]) {
            const recipes = mealPlan[day][mealType];
            recipes.forEach((recipe) => {
              allIngredients.push(...this.getIngredientsFromRecipe(recipe));
            });
          }
        }
  
        console.log('allIngredients:', allIngredients);
        this.addIngredientsToGroceryList(allIngredients);
      },
      (error) => {
        console.error('Error fetching meal plan:', error);
      }
    );
  }

  fetchGroceryList() {
    this.groceryService.getGroceryList().subscribe(
      (groceryList: Ingredient[]) => {
        this.ingredients = groceryList;
      },
      (error: any) => {
        console.error('Error fetching grocery list:', error);
      }
    );
  }

  addIngredientsToGroceryList(items: Ingredient[]) {
    this.groceryService.addIngredientsToGroceryList(items).subscribe(
      (response: { message: any; groceryList: Ingredient[]; }) => {
        console.log(response.message);
        this.ingredients = response.groceryList;
      },
      (error: any) => {
        console.error('Error adding ingredients to grocery list:', error);
      }
    );
  }

  removeIngredientFromGroceryList(index: number) {
    this.groceryService.removeIngredientFromGroceryList(index).subscribe(
      (response: { message: any; groceryList: Ingredient[]; }) => {
        console.log(response.message);
        this.ingredients = response.groceryList;
      },
      (error: any) => {
        console.error('Error removing ingredient from grocery list:', error);
      }
    );
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
    console.log('Selected ingredient:', ingredient);
    this.selectedIngredient = ingredient;

  }

  markAsPurchased() {
    if (this.selectedIngredient) {
      const index = this.ingredients.indexOf(this.selectedIngredient);
      this.groceryService.removeIngredientFromGroceryList(index).subscribe(
        (response) => {
          console.log(response.message);
          this.ingredients = response.groceryList;
          this.selectedIngredient = null;
        },
        (error) => {
          console.error('Error removing ingredient from grocery list:', error);
        }
      );
    }
  }

  clearList() {
    this.groceryService.clearGroceryList().subscribe(
      (response) => {
        console.log(response.message);
        this.ingredients = [];
        this.selectedIngredient = null;
      },
      (error) => {
        console.error('Error clearing grocery list:', error);
      }
    );
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addIngredient() {
    const newIngredient: Ingredient = {
      id: this.ingredients.length + 1,
      originalName: this.newIngredientName,
      amount: this.newIngredientAmount,
      unit: this.newIngredientUnit,
      original: `${this.newIngredientAmount} ${this.newIngredientUnit} ${this.newIngredientName}`
    };
  
    this.groceryService.addIngredientToGroceryList(newIngredient).subscribe(
      (response: { message: any; groceryList: Ingredient[]; }) => {
        console.log(response.message);
        this.ingredients = response.groceryList;
      },
      (error: any) => {
        console.error('Error adding ingredient to grocery list:', error);
      }
    );
  
    this.closeModal();
    this.newIngredientName = '';
    this.newIngredientAmount = 0;
    this.newIngredientUnit = '';
  }

  downloadGroceryList() {
    const formattedIngredients = this.ingredients.map(ingredient => {
      return `${ingredient.originalName}, ${ingredient.amount} ${ingredient.unit}\n`;
    }).join('\n');
    
    const blob = new Blob([formattedIngredients], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery_list.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
