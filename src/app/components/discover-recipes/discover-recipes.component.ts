import { Component, OnInit } from '@angular/core';
import { SpoonacularService } from '../../services/spoonacular.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FavouritesService } from '../../services/favourites.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-discover-recipes',
  templateUrl: './discover-recipes.component.html',
  styleUrls: ['./discover-recipes.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent]
})

export class DiscoverRecipesComponent implements OnInit {
  searchQuery: string = '';
  showFilters: boolean = false;
  searchResults: any[] = [];
  popularRecipes: any[] = [];

  constructor(
    private spoonacularService: SpoonacularService,
    private favouritesService: FavouritesService
  ) {}
  
  ngOnInit() {
    this.getPopularRecipes();
  }

  searchRecipes() {
    if (this.searchQuery.trim() !== '') {
      this.spoonacularService.searchRecipes(this.searchQuery, 25, 10).subscribe(
        recipes => {
          this.searchResults = recipes;
          this.showFilters = true;
        },
        error => {
          console.error('Error searching recipes:', error);
        }
      );
    }
  }

  getPopularRecipes() {
    this.spoonacularService.getPopularRecipes().subscribe(
      recipes => {
        this.popularRecipes = recipes;
      },
      error => {
        console.error('Error retrieving popular recipes:', error);
      }
    );
  }

  addToFavorites(recipe: Recipe) {
    if (recipe.id) {
      this.favouritesService.onAddRecipe(recipe);
    } else {
      console.error('Invalid recipe object. Spoonacular ID is missing.');
    }
  }
}