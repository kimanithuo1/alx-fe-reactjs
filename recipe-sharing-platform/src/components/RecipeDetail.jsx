import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Find the recipe by ID from the mock data
    const selectedRecipe = data.find((item) => item.id === parseInt(id, 10));
    if (selectedRecipe) {
      setRecipe(selectedRecipe);
    } else {
      // Redirect to HomePage if recipe is not found
      navigate("/");
    }
  }, [id, navigate]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-white max-w-4xl mx-auto rounded-lg shadow-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">{recipe.summary}</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index} className="text-gray-700">
            {ingredient}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Instructions</h2>
      <ol className="list-decimal list-inside space-y-2">
        {recipe.instructions.map((step, index) => (
          <li key={index} className="text-gray-700">
            {step}
          </li>
        ))}
      </ol>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Back to Home
      </button>
    </div>
  );
};

export default RecipeDetail;
