import React, { useContext } from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { RecipeContext } from './App';
import { v4 as uuidv4 } from 'uuid';


export default function RecipeEdit({ recipe }) {
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

    function handleChange(changes) {
        handleRecipeChange(recipe.id, { ...recipe, ...changes })
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients];
        const index = newIngredients.findIndex(i => i.id === id);
        newIngredients[index] = ingredient;
        handleChange({ ingredients: newIngredients });
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuidv4(),
            name: '',
            amount: ''
        }
        handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
    }

    function handleIngredientDelete(id) {
        handleChange({
            ingredients: recipe.ingredients.filter(i => i.id !== id)
        })
    }

    return (
        <div className='recipe-edit'>
            <div className='recipe-edit__remove-button-container'>
                <button
                    className='btn recipe-edit__remove-button'
                    onClick={() => handleRecipeSelect(undefined)}
                >
                    &times;
                </button>
            </div>
            <div className='recipe-edit__details-grid'>
                <label
                    htmlFor="name"
                    className='recipe-edit__label'>
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    className='recipe-edit__input'
                    id="name"
                    value={recipe.name}
                    onChange={e =>
                        handleChange({ name: e.target.value })
                    }
                />
                <label
                    className='recipe-edit__label'
                    htmlFor="cookTime">
                    Cook Time
                </label>
                <input
                    type="text"
                    name="cookTime"
                    className='recipe-edit__input'
                    id="cookTime"
                    value={recipe.cookTime}
                    onChange={e =>
                        handleChange({ cookTime: e.target.value })
                    }
                />
                <label
                    className='recipe-edit__label'
                    htmlFor="servings">
                    Servings
                </label>
                <input
                    className='recipe-edit__input'
                    type="number"
                    min="1"
                    name="servings"
                    id="servings"
                    value={recipe.servings}
                    onChange={e =>
                        handleChange({ servings: parseInt(e.target.value) || '' })
                    }
                />
                <label
                    className='recipe-edit__label'
                    htmlFor="instructions">
                    Instructions
                </label>
                <textarea
                    name="instructions"
                    className='recipe-edit__input'
                    id="instructions"
                    value={recipe.instructions}
                    onChange={e =>
                        handleChange({ instructions: e.target.value })
                    }
                />
            </div>
            <br />
            <label className='recipe-edit__label'>
                Ingredients</label>
            <div className='recipe-edit__ingredient-grid'>
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                    />
                ))}
            </div>
            <div className='recipe-edit__add-ingredient-btn-container'>
                <button
                    className='btn btn--primary'
                    onClick={() => handleIngredientAdd()}
                >
                    Add Ingredient
                </button>
            </div>
        </div>
    )
}