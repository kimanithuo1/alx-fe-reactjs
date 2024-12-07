import React, { useState } from "react";

const AddRecipeForm = () => {
  const [formValues, setFormValues] = useState({
    title: "",
    ingredients: "",
    steps: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = target.value;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Validate the form
  const validateForm = () => {
    const errors = {};
    if (!formValues.title.trim()) errors.title = "Recipe title is required";
    if (!formValues.ingredients.trim()) errors.ingredients = "Ingredients are required";
    if (!formValues.steps.trim()) errors.steps = "Preparation steps are required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", formValues);
      setIsSubmitted(true);
      // Reset form
      setFormValues({ title: "", ingredients: "", steps: "" });
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Recipe</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipe Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter the recipe title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Ingredients Field */}
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formValues.ingredients}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter each ingredient on a new line"
              rows="5"
            />
            {errors.ingredients && (
              <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>
            )}
          </div>

          {/* Preparation Steps Field */}
          <div>
            <label htmlFor="steps" className="block text-sm font-medium text-gray-700">
              Preparation Steps
            </label>
            <textarea
              id="steps"
              name="steps"
              value={formValues.steps}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter each step on a new line"
              rows="5"
            />
            {errors.steps && <p className="text-red-500 text-sm mt-1">{errors.steps}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit Recipe
            </button>
          </div>
          {/* Success Message */}
          {isSubmitted && (
            <p className="text-green-500 text-center mt-4">Recipe submitted successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;
