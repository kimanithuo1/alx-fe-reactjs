// src/components/RecipeDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // For getting the dynamic route parameter
import { useRecipeStore } from './recipeStore'; // Assuming you have this store for state management
import EditRecipeForm from './EditRecipeForm';  // Assuming you have a form component to edit recipe
import DeleteRecipeButton from './DeleteRecipeButton'; // Assuming you have a button component to delete recipe

const RecipeDetails = () => {
  const { id } = useParams(); // Extract the recipe ID from the URL
  const recipeId = parseInt(id, 10);  // Convert the `id` from string to integer
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId)); // Get the recipe from the store using the `id`
  
  // Handling state for title and description
  const [title, setTitle] = useState(recipe?.title || '');  // Initial value is either the recipe title or an empty string
  const [description, setDescription] = useState(recipe?.description || '');  // Initial value is either the recipe description or an empty string

  // If recipe is not found, return a "not found" message
  if (!recipe) return <p>Recipe not found</p>;

  // Actions to update and delete the recipe from the Zustand store
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleUpdate = () => {
    updateRecipe({ id: recipeId, title, description }); // Update the recipe with the new title and description
  };

  const handleDelete = () => {
    deleteRecipe(recipeId); // Delete the recipe by its ID
  };

  return (
    <div>
      <h1>{recipe.title}</h1>  {/* Display the recipe title */}
      <p>{recipe.description}</p>  {/* Display the recipe description */}

      {/* Input fields for editing the recipe */}
      <input
        type="text"
        value={title}  // Controlled input for title
        onChange={(e) => setTitle(e.target.value)}  // Update title on change
      />
      <textarea
        value={description}  // Controlled input for description
        onChange={(e) => setDescription(e.target.value)}  // Update description on change
      />

      {/* Buttons to update and delete the recipe */}
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>

      {/* Optional: Including additional components like EditRecipeForm and DeleteRecipeButton */}
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={recipeId} />
    </div>
  );
};

export default RecipeDetails;
