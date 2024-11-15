// src/components/recipeStore.js
import {create} from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [], // List of recipes
  favorites: [], // List of favorite recipe IDs
  searchTerm: '', // Search term for filtering recipes
  filteredRecipes: [], // Filtered recipes based on the search term
  recommendations: [], // List of recommended recipes

  // Add a new recipe to the list
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe],
  })),

  // Update an existing recipe in the list
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
  })),

  // Delete a recipe from the list
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
  })),

  // Set the recipes list directly
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  // Add a recipe to favorites
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...state.favorites, recipeId],
  })),

  // Remove a recipe from favorites
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((id) => id !== recipeId),
  })),

  // Set the search term for filtering recipes
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Filter recipes based on the search term (title or description)
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
  })),

  // Generate recipe recommendations based on favorites (mock implementation)
  generateRecommendations: () => set((state) => {
    const recommended = state.recipes.filter((recipe) =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),
}));

export default useRecipeStore;
