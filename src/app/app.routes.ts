import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DiscoverRecipesComponent } from './components/discover-recipes/discover-recipes.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { MealPlanComponent } from './components/meal-plan/meal-plan.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'discover-recipes', component: DiscoverRecipesComponent },
    { path: 'recipe/:id', component: RecipeDetailsComponent },
    { path: 'favourites', component: FavouritesComponent },
    { path: 'meal-plan', component: MealPlanComponent },
    { path: 'grocery-list', component: GroceryListComponent },
];