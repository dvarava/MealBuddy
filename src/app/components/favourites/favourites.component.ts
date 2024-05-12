import { Component, OnInit } from "@angular/core";
import { FavouritesService } from "../../services/favourites.service";
import { Recipe } from "../../interfaces/recipe";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MealPlanService } from "../../services/meal-plan.service";
import { AddToMealPlanModalComponent } from "../add-to-meal-plan-modal/add-to-meal-plan-modal.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: "app-favourites",
  templateUrl: "./favourites.component.html",
  styleUrls: ["./favourites.component.css"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AddToMealPlanModalComponent,
    FooterComponent,
    HeaderComponent,
  ],
})

export class FavouritesComponent implements OnInit {
  favouriteRecipes: Recipe[] = [];
  selectedRecipe: Recipe | null = null;
  showModal = false;
  
  constructor(
    private favouritesService: FavouritesService,
    private mealPlanService: MealPlanService
  ) {}

  ngOnInit() {
    this.favouritesService.getFavouriteRecipes();
    this.favouritesService.recipeSubject.subscribe((recipes: Recipe[]) => {
      this.favouriteRecipes = recipes;
    });
  }

  deleteRecipe(id: number) {
    this.favouritesService.onDeleteRecipe(id);
  }

  openAddToMealPlanModal(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedRecipe = null;
  }

  addRecipeToMealPlan(event: {recipe: Recipe; day: string; mealType: string;}) {
    this.mealPlanService
      .addRecipeToMealPlan(event.recipe.id, event.day, event.mealType)
      .subscribe(
        (response) => {
          console.log(response.message);
          this.closeModal();
        },
        (error) => {
          console.error("Error adding recipe to meal plan:", error);
        }
      );
  }
}
