// src/components/FavoritesList.jsx

import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
    const favorites = useRecipeStore(state => state.favorites);
    const recipes = useRecipeStore(state => state.recipes);
  
    const favoriteRecipes = recipes.filter(recipe =>
      favorites.includes(recipe.id)
    );
    

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
