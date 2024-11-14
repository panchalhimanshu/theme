import React, { useState } from 'react';
import Layout from '../components/Layout';
import Select from 'react-select';

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    description: '',
    barcode: '',
    purchaseUnit: [],
    consumptionUnit: '',
    purchasePrice: '',
    salePrice: '',
    reconciliationPrice: '',
    normalLoss: '',
    minStockLevelUnit: '',
    minStockLevel: '',
    atParStockLevelUnit: '',
    atParStockLevel: '',
    closingStockCalculatedOn: '',
    gst: '',
    hsnCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  const purchaseUnitOptions = [
    { value: 'unit1', label: 'Unit 1' },
    { value: 'unit2', label: 'Unit 2' },
    { value: 'unit3', label: 'Unit 3' },
  ];

  return (
    <Layout>
      <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium ">Product Name *</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                placeholder="Enter Product Name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium ">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
              >
                <option value="">Select Category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium ">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                placeholder="Enter Product Description"
              ></textarea>
            </div>

            <div>
              <label htmlFor="barcode" className="block text-sm font-medium ">BarCode</label>
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                placeholder="Enter BarCode"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Units</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="purchaseUnit" className="block text-sm font-medium ">Purchase Unit</label>
                <Select
                  id="purchaseUnit"
                  name="purchaseUnit"
                  isMulti
                  value={formData.purchaseUnit.map((unit) => ({ value: unit, label: unit }))}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'purchaseUnit')}
                  options={purchaseUnitOptions}
                  className="mt-1 w-full"
                  placeholder="Select multiple units"
                />
              </div>

              <div>
                <label htmlFor="consumptionUnit" className="block text-sm font-medium ">Consumption Unit</label>
                <select
                  id="consumptionUnit"
                  name="consumptionUnit"
                  value={formData.consumptionUnit}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                >
                  <option value="">Select consumption unit</option>
                  <option value="unit1">Unit 1</option>
                  <option value="unit2">Unit 2</option>
                  <option value="unit3">Unit 3</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Prices</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="purchasePrice" className="block text-sm font-medium ">Purchase Price</label>
                <input
                  type="number"
                  id="purchasePrice"
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter purchase price"
                />
              </div>

              <div>
                <label htmlFor="salePrice" className="block text-sm font-medium ">Sale Price</label>
                <input
                  type="number"
                  id="salePrice"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter sale price"
                />
              </div>

              <div>
                <label htmlFor="reconciliationPrice" className="block text-sm font-medium ">Reconciliation Price</label>
                <input
                  type="number"
                  id="reconciliationPrice"
                  name="reconciliationPrice"
                  value={formData.reconciliationPrice}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter reconciliation price"
                />
              </div>

              <div>
                <label htmlFor="normalLoss" className="block text-sm font-medium ">Normal Loss (%)</label>
                <input
                  type="number"
                  id="normalLoss"
                  name="normalLoss"
                  value={formData.normalLoss}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter normal loss percentage"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Stocks</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="minStockLevelUnit" className="block text-sm font-medium ">Minimum Stock Level Unit</label>
                <input
                  type="text"
                  id="minStockLevelUnit"
                  name="minStockLevelUnit"
                  value={formData.minStockLevelUnit}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter minimum stock"
                />
              </div>

              <div>
                <label htmlFor="minStockLevel" className="block text-sm font-medium ">Minimum Stock Level</label>
                <input
                  type="text"
                  id="minStockLevel"
                  name="minStockLevel"
                  value={formData.minStockLevel}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter minimum stock"
                />
              </div>

              <div>
                <label htmlFor="atParStockLevelUnit" className="block text-sm font-medium ">At Par Stock Level Unit *</label>
                <input
                  type="text"
                  id="atParStockLevelUnit"
                  name="atParStockLevelUnit"
                  value={formData.atParStockLevelUnit}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter at par stock"
                />
              </div>

              <div>
                <label htmlFor="atParStockLevel" className="block text-sm font-medium ">At Par Stock Level</label>
                <input
                  type="text"
                  id="atParStockLevel"
                  name="atParStockLevel"
                  value={formData.atParStockLevel}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter at par stock"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">GST</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="gst" className="block text-sm font-medium ">GST (%)</label>
                <input
                  type="number"
                  id="gst"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter GST percentage"
                />
              </div>

              <div>
                <label htmlFor="hsnCode" className="block text-sm font-medium ">HSN Code</label>
                <input
                  type="text"
                  id="hsnCode"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                  placeholder="Enter HSN Code"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
