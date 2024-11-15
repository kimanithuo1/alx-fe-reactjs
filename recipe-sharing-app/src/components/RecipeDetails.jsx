// src/components/RecipeDetails.jsx
import React from 'react';
import useRecipeStore from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
    const { id } = useParams();  // Gets the recipe ID from the URL
    const recipeId = parseInt(id, 10);  // Converts the ID to an integer

    // Finds the recipe with the matching ID in the Zustand store
    const recipe = useRecipeStore((state) =>
      state.recipes.find((recipe) => recipe.id === recipeId)
    );

    // If no recipe is found with the given ID, display a message
    if (!recipe) return <p>Recipe not found</p>;

    return (
        <div>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            
            {/* EditRecipeForm and DeleteRecipeButton components for editing and deleting the recipe */}
            <EditRecipeForm recipe={recipe} />
            <DeleteRecipeButton recipeId={recipeId} />
        </div>
    );
};

export default RecipeDetails;
