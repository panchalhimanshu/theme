import { useState } from "react";
import { Search } from "lucide-react";
import Layout from '../components/Layout';
import { Link } from "@remix-run/react";

export default function Component() {
  const [activeTab, setActiveTab] = useState("raw-material");
  const [searchQuery, setSearchQuery] = useState("");

  const rawMaterials = [
    { id: "#0001", name: "Wheat", category: "Grains", course: "Raw", price: 50 },
    { id: "#0002", name: "Sugar", category: "Sweetener", course: "Raw", price: 80 },
  ];

  const finishedGoods = [
    { id: "#0003", name: "Raju Masala", category: "Indian", course: "Starter", price: 100 },
    { id: "#0004", name: "Peppy Paneer", category: "Chinese", course: "Main Course", price: 125 },
  ];

  const semiFinishedGoods = [
    { id: "#0005", name: "Tomato Paste", category: "Condiment", course: "Semi-Finished", price: 70 },
    { id: "#0006", name: "Cheese", category: "Dairy", course: "Semi-Finished", price: 110 },
  ];

  const getTableData = () => {
    switch (activeTab) {
      case "raw-material":
        return rawMaterials;
      case "finished-goods":
        return finishedGoods;
      case "semi-finished-goods":
        return semiFinishedGoods;
      default:
        return [];
    }
  };

  const getAddLink = () => {
    switch (activeTab) {
      case "raw-material":
        return "/admin/inventorymanagment/product/rawmaterialadd";
      case "finished-goods":
        return "/admin/inventorymanagment/product/finishedgoodsadd";
      case "semi-finished-goods":
        return "/admin/inventorymanagment/product/semifinishedgoodsadd";
      default:
        return "#";
    }
  };

  const getViewLink = () => {
    switch (activeTab) {
      case "raw-material":
        return "/admin/inventorymanagment/product/rawmaterialview";
      case "finished-goods":
        return "/admin/inventorymanagment/product/finishedgoodsview";
      case "semi-finished-goods":
        return "/admin/inventorymanagment/product/semifinishedgoodsview";
      default:
        return "#";
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-background rounded-lg bg-white dark:bg-black dark:text-white">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Product List</h1>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-200" />
            <input
              type="text"
              placeholder="Search"
              className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-1 border-b dark:border-gray-700 mb-3">
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none ${
              activeTab === "raw-material"
                ? "border-b-2 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:dark:text-gray-100"
            }`}
            onClick={() => setActiveTab("raw-material")}
          >
            Raw Material
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none ${
              activeTab === "finished-goods"
                ? "border-b-2 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:dark:text-gray-100"
            }`}
            onClick={() => setActiveTab("finished-goods")}
          >
            Finished Goods
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm focus:outline-none ${
              activeTab === "semi-finished-goods"
                ? "border-b-2 border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-300"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-300 hover:dark:text-gray-100"
            }`}
            onClick={() => setActiveTab("semi-finished-goods")}
          >
            Semi-Finished Goods
          </button>
        </div>

        <div className="border rounded-lg overflow-hidden dark:bg-gray-900">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-200">Item Code</th>
                <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-200">Product Name</th>
                <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-200">Category</th>
                <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-200">Course</th>
                <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-200">Price</th>
                <th className="text-left p-2 font-medium text-gray-500 dark:text-gray-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {getTableData().map((product) => (
                <tr key={product.id} className="border-t dark:border-gray-700">
                  <td className="p-2 text-sm">{product.id}</td>
                  <td className="p-2 text-sm">{product.name}</td>
                  <td className="p-2 text-sm">{product.category}</td>
                  <td className="p-2 text-sm">{product.course}</td>
                  <td className="p-2 text-sm">₹{product.price}</td>
                  <td className="p-2">
                    <Link to={getViewLink()} className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none dark:text-blue-400 dark:hover:text-blue-600">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-5">
          <Link to={getAddLink()} className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:bg-white dark:text-black dark:hover:bg-gray-300">
            + Add {activeTab === "raw-material" ? "Raw Material" : activeTab === "finished-goods" ? "Finished Goods" : "Semi-Finished Goods"}
          </Link>
        </div>
      </div>
    </Layout>
  );
}
