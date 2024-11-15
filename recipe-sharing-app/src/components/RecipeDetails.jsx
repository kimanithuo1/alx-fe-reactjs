// src/components/RecipeDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';  // Assuming this exists and is used for form submission
import DeleteRecipeButton from './DeleteRecipeButton'; // Assuming you have this for deleting

const RecipeDetails = () => {
  const { id } = useParams(); // Get recipe ID from URL params
  const recipeId = parseInt(id, 10);  // Convert to integer
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId)); // Find recipe by ID
  const updateRecipe = useRecipeStore(state => state.updateRecipe); // Get update action from store
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe); // Get delete action from store

  const [title, setTitle] = useState(recipe?.title || '');  // Set initial title value or empty string
  const [description, setDescription] = useState(recipe?.description || '');  // Set initial description value or empty string

  if (!recipe) return <p>Recipe not found</p>;  // Show message if no recipe found

  const handleUpdate = () => {
    updateRecipe({ id: recipeId, title, description }); // Call update action with new values
  };

  const handleDelete = () => {
    deleteRecipe(recipeId);  // Call delete action with recipe ID
  };

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      
      {/* Editable fields for title and description */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}  // Update title on change
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}  // Update description on change
      />
      
      {/* Buttons for handling update and delete */}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      
      {/* Optional: Passing the recipe to other components (e.g. EditRecipeForm, DeleteRecipeButton) */}
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
};

export default RecipeDetails;
