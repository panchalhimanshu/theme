import Layout from '../components/Layout';
import React, { useState } from 'react'

export default function Component() {
  const [recipeItems, setRecipeItems] = useState([{}])
  const [recipeSteps, setRecipeSteps] = useState([{ description: '' }])

  const addRecipeItem = () => {
    setRecipeItems([...recipeItems, {}])
  }

  const addRecipeStep = () => {
    setRecipeSteps([...recipeSteps, { description: '' }])
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission
    console.log('Form submitted')
  }

  return (
    <Layout>
    <div className="mx-auto p-6 dark:bg-black bg-white dark:text-white text-black shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Add Finished Goods</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1  dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label htmlFor="scTypeName" className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">SC Type Name</label>
            <input
              type="text"
              id="scTypeName"
              name="scTypeName"
              className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
              placeholder="Enter SC Type"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="menuCategory" className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Menu Category</label>
            <select
              id="menuCategory"
              name="menuCategory"
              className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
            >
              <option value="">Select Category</option>
              <option value="appetizers">Appetizers</option>
              <option value="main-course">Main Course</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>
          <div>
            <label htmlFor="uoName" className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Uo Name</label>
            <input
              type="text"
              id="uoName"
              name="uoName"
              className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
              placeholder="Enter Uo name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="remarks" className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            rows={3}
            className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
            placeholder="Enter Remarks"
          ></textarea>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recipe Items</h3>
          {recipeItems.map((_, index) => (
            <div key={index} className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor={`itemName-${index}`} className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Item Name</label>
                <select
                  id={`itemName-${index}`}
                  name={`itemName-${index}`}
                  className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
                >
                  <option value="">Select Item Name</option>
                  <option value="item1">Item 1</option>
                  <option value="item2">Item 2</option>
                  <option value="item3">Item 3</option>
                </select>
              </div>
              <div>
                <label htmlFor={`quantity-${index}`} className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Quantity</label>
                <input
                  type="number"
                  id={`quantity-${index}`}
                  name={`quantity-${index}`}
                  className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
                  placeholder="Enter Quantity"
                />
              </div>
              <div>
                <label htmlFor={`unitOfMeasurement-${index}`} className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Unit of Measurement</label>
                <input
                  type="text"
                  id={`unitOfMeasurement-${index}`}
                  name={`unitOfMeasurement-${index}`}
                  className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
                  placeholder="Enter Unit"
                />
              </div>
              <div>
                <label htmlFor={`customizationOption-${index}`} className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Customization Option</label>
                <select
                  id={`customizationOption-${index}`}
                  name={`customizationOption-${index}`}
                  className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
                >
                  <option value="">Select customize item</option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div>
                <label htmlFor={`preparationOption-${index}`} className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Preparation Option</label>
                <select
                  id={`preparationOption-${index}`}
                  name={`preparationOption-${index}`}
                  className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
                >
                  <option value="">Select preparation</option>
                  <option value="prep1">Preparation 1</option>
                  <option value="prep2">Preparation 2</option>
                  <option value="prep3">Preparation 3</option>
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-black text-white dark:bg-white dark:text-black"
            onClick={addRecipeItem}
          >
            Add Product
          </button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Recipe Description</h3>
          {recipeSteps.map((_, index) => (
            <div key={index}>
              <label htmlFor={`step-${index}`} className="block text-sm font-medium dark:bg-black bg-white dark:text-white text-black">Step {index + 1}</label>
              <textarea
                id={`step-${index}`}
                name={`step-${index}`}
                rows={3}
                className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full rounded-md p-2 border border-border shadow-sm  "
                placeholder={`Step ${index + 1}`}
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-black text-white dark:bg-white dark:text-black"
            onClick={addRecipeStep}
          >
            Add New Step
          </button>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2  p-2 border border-border rounded-md text-sm font-medium dark:bg-black bg-black text-white dark:bg-white dark:text-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2  border-transparent rounded-md shadow-sm text-sm font-medium bg-black text-white dark:bg-white dark:text-black"
          >
            Save
          </button>
        </div>
      </form>
    </div>
    </Layout>
  )
}