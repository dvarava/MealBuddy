const express = require('express');
const bodyParser = require('body-parser')

const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
  }));

let recipes = [
    { id: 1, title: 'sdg', image: 'sdgsd', servings: 2, readyInMinutes: 20, extendedIngredients: ['sfsgs', 'sdsgd'], analyzedInstructions: ['sdfsdf', 'sdggds'], nutrition: ['sdgs'] },
    { id: 2, title: 'sdg', image: 'sdgsd', servings: 2, readyInMinutes: 20, extendedIngredients: ['sfsgs', 'sdsgd'], analyzedInstructions: ['sdfsdf', 'sdggds'], nutrition: ['sdgs'] }
];

let mealPlan = {
    Monday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Tuesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Wednesday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Thursday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Friday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Saturday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] },
    Sunday: { Breakfast: [], Lunch: [], Dinner: [], Snacks: [] }
};

app.use(bodyParser.json());

// Get the recipes
app.get('/recipes', (req, res, next) => {
    res.json({'recipes': recipes})
});

// Add a recipe to favourites
app.post('/add-recipe-to-favourites', (req, res) => {
    recipes.push({
        id: req.body.id,
        title: req.body.title,
        image: req.body.image,
        servings: req.body.servings,
        readyInMinutes: req.body.readyInMinutes,
        extendedIngredients: req.body.extendedIngredients,
        analyzedInstructions: req.body.analyzedInstructions,
        nutrition: req.body.nutrition
    });
    res.status(200).json({ 
        message: 'Recipe added to favourites'
    })
});

// Remove a recipe from favourites
app.delete('/remove-recipe-from-favourites/:id', (req, res) => {
    const index = recipes.findIndex(el => {
        return el.id == req.params.id
    })

    recipes.splice(index, 1)
    res.status(200).json({
        message: 'Recipe removed from favourites'
    })
});


// Get the meal plan
app.get('/meal-plan', (req, res) => {
    res.json(mealPlan);
});
  
// Add a recipe to the meal plan
app.post('/meal-plan', (req, res) => {
    const { recipeId, day, mealType } = req.body;
    const recipe = recipes.find(r => r.id === recipeId);
  
    if (recipe) {
      mealPlan[day][mealType].push(recipe);
      res.status(200).json({ message: 'Recipe added to meal plan' });
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
});
  
// Remove a recipe from the meal plan
app.delete('/meal-plan', (req, res) => {
    const { recipeId, day, mealType } = req.body;
    const recipe = recipes.find(r => r.id === recipeId);
  
    if (recipe) {
      const index = mealPlan[day][mealType].findIndex(r => r.id === recipeId);
      if (index !== -1) {
        mealPlan[day][mealType].splice(index, 1);
        res.status(200).json({ message: 'Recipe removed from meal plan' });
      } else {
        res.status(404).json({ message: 'Recipe not found in meal plan' });
      }
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
});

module.exports = app;