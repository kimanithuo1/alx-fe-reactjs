import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddRecipeForm = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required("Recipe title is required"),
    ingredients: Yup.string()
      .required("Ingredients are required")
      .test(
        "min-ingredients",
        "Please list at least two ingredients",
        (value) => value.split("\n").length >= 2
      ),
    steps: Yup.string().required("Preparation steps are required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form values:", values);
    // Logic for submitting the form data (e.g., sending to an API)
    resetForm();
    alert("Recipe submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Add New Recipe</h1>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <Formik
          initialValues={{
            title: "",
            ingredients: "",
            steps: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {/* Recipe Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Recipe Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the recipe title"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Ingredients */}
              <div>
                <label
                  htmlFor="ingredients"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ingredients
                </label>
                <Field
                  as="textarea"
                  id="ingredients"
                  name="ingredients"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter each ingredient on a new line"
                  rows="5"
                />
                <ErrorMessage
                  name="ingredients"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Preparation Steps */}
              <div>
                <label
                  htmlFor="steps"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preparation Steps
                </label>
                <Field
                  as="textarea"
                  id="steps"
                  name="steps"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter each step on a new line"
                  rows="5"
                />
                <ErrorMessage
                  name="steps"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    isSubmitting && "opacity-50"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Recipe"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRecipeForm;
