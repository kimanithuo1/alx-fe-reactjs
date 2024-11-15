// src/components/RecipeDetails.jsx
import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id, 10);
  const recipe = useRecipeStore(state => state.recipes.find(r => r.id === recipeId));
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const [title, setTitle] = useState(recipe?.title || '');
  const [description, setDescription] = useState(recipe?.description || '');

  if (!recipe) return <p>Recipe not found</p>;

  const handleUpdate = () => {
    updateRecipe({ id: recipeId, title, description });
  };

  const handleDelete = () => {
    deleteRecipe(recipeId);
  };

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default RecipeDetails;
