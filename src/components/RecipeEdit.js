import React from 'react';
import RecipeIngredientEdit from './RecipeIngredientEdit';

export default function RecipeEdit({ recipe }) {
    return (
        <div className='recipe-edit'>
            <div className='recipe-edit__remove-button-container'>
                <button className='btn recipe-edit__remove-button'>&times;</button>
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
                >{recipe.instructions}</textarea>
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
                        ingredient={ingredient} />
                ))}
            </div>
            <div className='recipe-edit__add-ingredient-btn-container'>
                <button className='btn btn--primary'>Add Ingredient</button>
            </div>
        </div>
    )
}