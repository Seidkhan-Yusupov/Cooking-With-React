import React, { useState, useEffect } from 'react';
import RecipeList from "./RecipeList";
import '../css/App.css'
import RecipeEdit from './RecipeEdit';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes'

export const RecipeContext = React.createContext();

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);

  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }


  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: '',
      cookTime: "",
      servings: 1,
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: ""
        }
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe]);
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];
    const index = newRecipes.findIndex(r => r.id === id);
    newRecipes[index] = recipe;
    setRecipes(newRecipes);
  }

  function handleRecipeDelete(id) {
    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList
        recipes={recipes}
      />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}


const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    cookTime: "1:45",
    servings: 3,
    instructions: "1. Put salt on a chicken \n2. Put in the oven \n3. Each the chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "3 kg"
      },
      {
        id: 2,
        name: "Salt",
        amount: "3 tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Plain Beef",
    cookTime: "2:30",
    servings: 5,
    instructions: "1. Put onion on a beef \n2. Put on the pan \n3. Each the beef",
    ingredients: [
      {
        id: 1,
        name: "Beef",
        amount: "2 kg"
      },
      {
        id: 2,
        name: "Onion",
        amount: "500 gr"
      }
    ]
  }
]

export default App;
