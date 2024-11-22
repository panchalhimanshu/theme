import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Trash2 } from 'lucide-react';

export default function AddProductForm() {
  const [preparationName, setPreparationName] = useState('Pizza Sauce Conversion');
  const [semiFinishedItem, setSemiFinishedItem] = useState('');
  const [recipeQuantity, setRecipeQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [defaultQuantity, setDefaultQuantity] = useState('');
  const [ingredients, setIngredients] = useState([
    { id: 1, rawMaterial: '', quantity: '', unit: '' },
  ]);

  const addIngredient = () => {
    setIngredients([...ingredients, { id: Date.now(), rawMaterial: '', quantity: '', unit: '' }]);
  };

  const removeIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const updateIngredient = (id, field, value) => {
    setIngredients(
      ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ preparationName, semiFinishedItem, recipeQuantity, unit, defaultQuantity, ingredients });
    // Here you would typically send this data to your backend
  };

  return (
    <Layout>
      <div className="mx-auto p-6 bg-white text-black dark:bg-black dark:text-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-6">Semi Finished Goods Preparation Details</h1>

        <form onSubmit={handleSubmit} className="">
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block  text-sm font-bold mb-2" htmlFor="preparation-name">
                Preparation Name
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white text-black dark:bg-black dark:text-white"
                id="preparation-name"
                type="text"
                value={preparationName}
                onChange={(e) => setPreparationName(e.target.value)}
              />
            </div>
            <div>
              <label className="block  text-sm font-bold mb-2" htmlFor="semi-finished-item">
                Semi Finished Item prepared
              </label>
              <select
                className=" appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white text-black dark:bg-black dark:text-white"
                id="semi-finished-item"
                value={semiFinishedItem}
                onChange={(e) => setSemiFinishedItem(e.target.value)}
              >
                <option value="">Select Item</option>
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
              </select>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block  text-sm font-bold mb-2" htmlFor="recipe-quantity">
                Recipe Output Quantity
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white text-black dark:bg-black dark:text-white"
                id="recipe-quantity"
                type="number"
                placeholder="Enter Quantity"
                value={recipeQuantity}
                onChange={(e) => setRecipeQuantity(e.target.value)}
              />
            </div>
            <div>
              <label className="block  text-sm font-bold mb-2" htmlFor="unit">
                Unit
              </label>
              <select
                className=" appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white text-black dark:bg-black dark:text-white"
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="">Select Unit</option>
                <option value="kg">Kilogram</option>
                <option value="l">Liter</option>
              </select>
            </div>
            <div>
              <label className="block  text-sm font-bold mb-2" htmlFor="default-quantity">
                Default Preparation Quantity
              </label>
              <input
                className=" appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline bg-white text-black dark:bg-black dark:text-white"
                id="default-quantity"
                type="number"
                placeholder="Enter Quantity"
                value={defaultQuantity}
                onChange={(e) => setDefaultQuantity(e.target.value)}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Recipe Ingredients</h2>

          <div className="mb-4 border border-border grid grid-cols-3 gap-x-4 py-3 px-4 bg-gray-100  text-black dark:bg-black dark:text-white p-3 rounded">
            <div className="col-span-5 font-bold text-sm ">Raw Material *</div>
            <div className="col-span-3 font-bold text-sm">Quantity *</div>
            <div className="col-span-3 font-bold text-sm">Unit *</div>
            <div className="col-span-1"></div>
          </div>

          <div className="mb-4 space-y-4">
            {ingredients.map((ingredient) => (
              <div key={ingredient.id} className="grid grid-cols-3 gap-4 items-center">
                <select
                  className="col-span-5 bg-white text-black dark:bg-black dark:text-white  appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  value={ingredient.rawMaterial}
                  onChange={(e) => updateIngredient(ingredient.id, 'rawMaterial', e.target.value)}
                >
                  <option value="">Select Raw Material</option>
                  <option value="material1">Material 1</option>
                  <option value="material2">Material 2</option>
                </select>
                <input
                  type="number"
                  placeholder="Enter Quantity"
                  className="col-span-3 bg-white text-black dark:bg-black dark:text-white  appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  value={ingredient.quantity}
                  onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                />
                <select
                  className="col-span-3 bg-white text-black dark:bg-black dark:text-white  appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                >
                  <option value="">Select Unit</option>
                  <option value="kg">Kilogram</option>
                  <option value="l">Liter</option>
                </select>
                <button
                  type="button"
                  onClick={() => removeIngredient(ingredient.id)}
                  className="col-span-1 text-red-500 hover:text-red-700"
                  aria-label="Remove ingredient"
                >
                  <Trash2 className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addIngredient}
            className="dark:bg-white dark:text-black bg-black text-white font-bold py-2 px-4 rounded-full mb-6"
          >
            + Add New
          </button>

          <div className="flex items-center justify-end">
            <button
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-4"
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
