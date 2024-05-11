import { Ingredient } from "./ingredient";

export interface Recipe {
    id: number;
    title: string;
    image: string;
    servings: number;
    readyInMinutes: number;
    extendedIngredients: Ingredient[];
    analyzedInstructions: any;
    nutrition?: any;
}