import { Plus } from "lucide-react";

export default function Component() {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-black dark:bg-black dark:text-white shadow-md rounded-lg overflow-hidden">
      <form className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label htmlFor="typeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type Name</label>
            <input
              type="text"
              id="typeName"
              name="typeName"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
              placeholder="Enter Type Name"
            />
          </div>
          <div>
            <label htmlFor="menuCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Menu Category</label>
            <select
              id="menuCategory"
              name="menuCategory"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="">Select Category</option>
              <option value="appetizers">Appetizers</option>
              <option value="main-course">Main Course</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>
        </div>

        {/* Remarks */}
        <div>
          <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Remarks</label>
          <input
            type="text"
            id="remarks"
            name="remarks"
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="Enter Remarks"
          />
        </div>

        {/* Recipe Items */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Recipe Items</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Item Name</label>
              <select
                id="itemName"
                name="itemName"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">Select Item</option>
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
                <option value="item3">Item 3</option>
              </select>
            </div>
            <div>
              <label htmlFor="unitOfMeasurement" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Unit of Measurement</label>
              <select
                id="unitOfMeasurement"
                name="unitOfMeasurement"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">Select Unit</option>
                <option value="kg">Kilogram</option>
                <option value="g">Gram</option>
                <option value="l">Liter</option>
                <option value="ml">Milliliter</option>
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Enter Quantity"
              />
            </div>
          </div>
          <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-500">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>

        {/* Options */}
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="customizationOption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Customization Option</label>
            <select
              id="customizationOption"
              name="customizationOption"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="">Select customization</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          <div>
            <label htmlFor="preparationOption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preparation Option</label>
            <select
              id="preparationOption"
              name="preparationOption"
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="">Select preparation</option>
              <option value="prep1">Preparation 1</option>
              <option value="prep2">Preparation 2</option>
              <option value="prep3">Preparation 3</option>
            </select>
          </div>
        </div>

        {/* Recipe Description */}
        <div>
          <label htmlFor="recipeDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Recipe Description</label>
          <textarea
            id="recipeDescription"
            name="recipeDescription"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 dark:focus:border-indigo-600 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="Enter recipe description"
          ></textarea>
        </div>
      </form>
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
          Save
        </button>
        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 dark:bg-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}
