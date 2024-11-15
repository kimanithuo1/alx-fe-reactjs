import React, { useState, useEffect } from 'react';
import { useRecipeStore } from './recipeStore';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipeId = parseInt(id, 10);

  // Retrieve recipe from Zustand store
  const recipe = useRecipeStore(state =>
    state.recipes.find(r => recipe.id === recipeId)
  );

  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  // State for editing the recipe
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setDescription(recipe.description);
    }
  }, [recipe]);

  // If no recipe is found with the given ID, display a message
  if (!recipe) return <p>Recipe not found</p>;

  const handleUpdate = () => {
    if (title && description) {
      updateRecipe({ id: recipeId, title, description });
    }
  };

  const handleDelete = () => {
    deleteRecipe(recipeId);
  };

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {/* Edit Recipe Form */}
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
