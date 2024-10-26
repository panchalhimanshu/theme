import React, { useState } from 'react';
import Layout from '~/components/Layout';
import { ChevronUp, ChevronDown } from 'lucide-react'; // Import icons

const initialProducts = [
  { name: "Apple MacBook Pro 17\"", color: "Silver", category: "Laptop", price: 2999 },
  { name: "Microsoft Surface Pro", color: "White", category: "Laptop PC", price: 1999 },
  { name: "Magic Mouse 2", color: "Black", category: "Accessories", price: 99 },
];

export default function Settings() {
  const [products, setProducts] = useState(initialProducts);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Layout>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('name')}>
                Product name
                {sortConfig.key === 'name' && (
                  sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-2" /> : <ChevronDown className="inline ml-2" />
                )}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('color')}>
                Color
                {sortConfig.key === 'color' && (
                  sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-2" /> : <ChevronDown className="inline ml-2" />
                )}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('category')}>
                Category
                {sortConfig.key === 'category' && (
                  sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-2" /> : <ChevronDown className="inline ml-2" />
                )}
              </th>
              <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => requestSort('price')}>
                Price
                {sortConfig.key === 'price' && (
                  sortConfig.direction === 'ascending' ? <ChevronUp className="inline ml-2" /> : <ChevronDown className="inline ml-2" />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.color}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
