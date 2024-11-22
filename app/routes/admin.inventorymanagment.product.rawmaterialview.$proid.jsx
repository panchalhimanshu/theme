import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Select from 'react-select';
import CallFor from "../utilities/CallFor";
import { toast, Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from '@remix-run/react';


export default function AddProductForm() {
  const router = useNavigate();
  const { proid } = useParams();
  const isEditMode = !!proid;
  const [isExistingImage, setIsExistingImage] = useState(false);
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
    closingStockCalculatedOn: [],
    gst: '',
    hsnCode: '',
    image: null,
    imageUrl: '',
  });

  const [categories, setCategories] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const response = await CallFor(`products/${proid}`, 'get', null, 'Auth');
          if (response.data.success) {
            const productData = response.data.data;
            setFormData({
              productName: productData.proname,
              category: productData.catid,
              description: productData.prodescription,
              barcode: productData.variant.pvbarcode,
              purchaseUnit: productData.purchaseUoms.map(uom => uom.uomid),
              consumptionUnit: productData.prouom,
              purchasePrice: productData.variant.pvpurchaseprice,
              salePrice: productData.variant.pvsalesprice,
              reconciliationPrice: productData.variant.reconciliation_price,
              normalLoss: productData.variant.normal_loss,
              minStockLevelUnit: productData.location.min_stock_uom,
              minStockLevel: productData.location.safetylevel,
              atParStockLevelUnit: productData.location.par_stock_uom,
              atParStockLevel: productData.location.reorderlevel,
              closingStockCalculatedOn: [], // Set based on your needs
              gst: productData.tax.taxrate,
              hsnCode: productData.tax.hsncode,
              image: productData.productimgid,
              imageUrl: productData.product_image_url
            });
            // setIsUploaded(true);

            if (productData.product_image_url) {

              setImagePreview(`http://192.168.19.237:5000${productData.product_image_url}`);

              // const imagePath = productData.product_image_url.replace('http://192.168.19.237:5000', '');
              // setImagePreview(imagePath);
              // setIsExistingImage(true);

              setIsExistingImage(true);
              setIsUploaded(true);
            }

          }
        } catch (error) {
          console.error('Error fetching product data:', error);
          toast.error('Failed to load product data');
        }
      };

      fetchProductData();
    }
  }, [proid, isEditMode]);

  // Fetch initial modal data and categories
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await CallFor('products/modal', 'get', null, 'Auth');
        if (response.data.success) {
          setCategories(response.data.data.categories);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
        toast.error('Failed to load initial data');
      }
    };

    fetchInitialData();
  }, []);

  // Fetch UOMs when category changes
  useEffect(() => {
    const fetchUoms = async () => {
      if (formData.category) {
        try {
          const response = await CallFor(`products/uoms/${formData.category}`, 'get', null, 'Auth');
          if (response.data.success) {
            setUoms(response.data.data);
          }
        } catch (error) {
          console.error('Error fetching UOMs:', error);
          toast.error('Failed to load units');
        }
      }
    };

    fetchUoms();
  }, [formData.category]);

  const closingStockOptions = [
    { value: 1, label: 'Average' },
    { value: 2, label: 'FIFO' },
    { value: 3, label: 'LIFO' },
  ];

  // Convert UOMs to Select options
  const uomOptions = uoms.map(uom => ({
    value: uom.uomid,
    label: `${uom.uomname} ${uom.uomsymbole ? `(${uom.uomsymbole})` : ''}`
  }));

  // Handle image upload
  const handleUpload = async () => {
    if (!imagePreview) {
      toast.error("Please select an image to upload");
      return;
    }

    try {
      const formDatas = new FormData();
      formDatas.append('file', formData.image);

      const response = await CallFor('images/upload', 'post', formDatas, 'authWithContentTypeMultipart');

      if (response.data) {
        setFormData(prevData => ({
          ...prevData,
          image: response.data.data.umid,
        }));
        setIsUploaded(true);
        toast.success('Image uploaded successfully');
      } else {
        toast.error("Image upload failed");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleImageRemove = () => {
    setFormData(prevData => ({
      ...prevData,
      image: null,
    }));
    setImagePreview(null);
    setIsUploaded(false);
    setIsExistingImage(false);
  };

  // Updated handleImageUpload function
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsExistingImage(false);
      };
      reader.readAsDataURL(file);

      setFormData(prevData => ({
        ...prevData,
        image: file,
      }));
      setIsUploaded(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMultiSelectChange = (selectedOptions, name) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: selectedOptions ? selectedOptions.map(option => option.value) : [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const purchaseUnits = formData.purchaseUnit.map(unit => ({
      uomid: unit,
      is_default: true,
    }));

    const body = {
      proname: formData.productName,
      catid: parseInt(formData.category, 10),
      prouom: parseInt(formData.consumptionUnit, 10),
      prodescription: formData.description,
      productimgid: formData.image,
      proconfig: 1,
      variant: {
        pvbarcode: formData.barcode,
        pvpurchaseprice: parseFloat(formData.purchasePrice) || 0,
        pvsalesprice: parseFloat(formData.salePrice) || 0,
        reconciliation_price: parseFloat(formData.reconciliationPrice) || 0,
        normal_loss: parseFloat(formData.normalLoss) || 0,
      },
      location: {
        safetylevel: parseFloat(formData.minStockLevel) || 0,
        reorderlevel: parseFloat(formData.atParStockLevel) || 0,
        min_stock_uom: formData.minStockLevelUnit,
        par_stock_uom: formData.atParStockLevelUnit,
      },
      tax: {
        taxrate: parseFloat(formData.gst) || 0,
        hsncode: formData.hsnCode,
      },
      purchaseUoms: purchaseUnits,
      consumptionUom: {
        uomid: parseInt(formData.consumptionUnit, 10),
      },
    };

    console.log(body)

    try {
      const response = await CallFor(`products/${proid}`, "put", body, 'Auth');

      if (response.data.success) {
        toast.success(`Product updated successfully`);
        router.push('/admin/inventorymanagment/product'); // Adjust the route as needed
      } else {
        toast.error(`Failed to update  product`);
      }
    } catch (error) {
      console.error(`Error  updating  product:`, error);
      toast.error(`An error occurred while updating the product`);
    }
  };

  return (
    <Layout>
      <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">View Product</h1>
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
              <label htmlFor="category" className="block text-sm font-medium">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.catname}
                  </option>
                ))}
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
                <label htmlFor="purchaseUnit" className="block text-sm font-medium">Purchase Unit</label>
                <Select
                  id="purchaseUnit"
                  name="purchaseUnit"
                  isMulti
                  value={formData.purchaseUnit.map(unit => {
                    const option = uomOptions.find(opt => opt.value === unit);
                    return option ? { value: option.value, label: option.label } : null;
                  })}
                  onChange={(selectedOptions) => handleMultiSelectChange(selectedOptions, 'purchaseUnit')}
                  options={uomOptions}
                  className="mt-1 w-full"
                  placeholder="Select multiple units"
                />
              </div>

              <div>
                <label htmlFor="consumptionUnit" className="block text-sm font-medium">Consumption Unit</label>
                <select
                  id="consumptionUnit"
                  name="consumptionUnit"
                  value={formData.consumptionUnit}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-border bg-white text-black dark:bg-black dark:text-white block w-full rounded-md shadow-sm"
                >
                  <option value="">Select consumption unit</option>
                  {uoms.map(uom => (
                    <option key={uom.uomid} value={uom.uomid}>
                      {uom.uomname} {uom.uomsymbole ? `(${uom.uomsymbole})` : ''}
                    </option>
                  ))}
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


              <div>
                <label htmlFor="closingStockCalculatedOn" className="block text-sm font-medium ">
                  Closing Stock Calculated On
                </label>
                <Select
                  id="closingStockCalculatedOn"
                  name="closingStockCalculatedOn"
                  isMulti
                  value={formData.closingStockCalculatedOn.map((value) => {
                    const option = closingStockOptions.find((opt) => opt.value === value);
                    return option ? { value: option.value, label: option.label } : null;
                  })}
                  onChange={(selectedOptions) =>
                    handleMultiSelectChange(selectedOptions, 'closingStockCalculatedOn')
                  }
                  options={closingStockOptions}
                  className="mt-1 w-full"
                  placeholder="Select calculation methods"
                />

              </div>



              <div>
                <label htmlFor="imageUpload" className="block text-sm font-medium mb-1">
                  Product Image
                </label>
                {!imagePreview && (
                  <input
                    type="file"
                    id="imageUpload"
                    name="imageUpload"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="mt-1 block w-full rounded-md border border-border"
                  />
                )}
                {imagePreview && (
                  <div className="mt-2 flex flex-col items-start gap-4">
                    <img
                    src={imagePreview}
                      alt="Product preview"
                      className="w-24 h-24 object-cover rounded-md"
                      onError={(e) => console.log('Image load error:', e)}
                    />
                    <div className="flex gap-2">
                      {!isExistingImage && !isUploaded && (
                        <button
                          type="button"
                          onClick={handleUpload}
                          className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Upload
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleImageRemove}
                        className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Remove Image
                      </button>
                    </div>
                    {isUploaded && !isExistingImage && (
                      <span className="text-sm text-green-600">
                        Image uploaded successfully!
                      </span>
                    )}
                  </div>
                )}
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
          
            <Link to={`/admin/inventorymanagment/product/rawmaterialedit/${proid}`}>

            <button
              type="button"
              className="bg-black text-white mr-2 dark:bg-white dark:text-black py-2 px-4 rounded-lg"
            >
              Edit
             
            </button>

            <Link to={`/admin/inventorymanagment/product`}>
            <button
              type="button"
              className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            </Link>
            </Link>
            
          </div>
        </form>
      </div>
    </Layout>
  );
}
