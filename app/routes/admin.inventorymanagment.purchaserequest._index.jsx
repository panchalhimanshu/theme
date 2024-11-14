import Layout from '../components/Layout';
import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { Link } from '@remix-run/react';

function Index() {

  const [reqDate, setReqDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  return (
    <Layout>

<div className="p-6 rounded-lg text-black bg-white dark:bg-black dark:text-white">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Purchase Request List</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="date"
                value={reqDate}
                onChange={(e) => setReqDate(e.target.value)}
                className="w-full dark:bg-black dark:text-white bg-white text-black  px-3 py-2 border rounded-md appearance-none"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full dark:bg-black dark:text-white bg-white text-black  px-3 py-2 border rounded-md appearance-none"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <select className="w-full dark:bg-black dark:text-white bg-white text-black  px-3 py-2 border rounded-md appearance-none">
              <option value="">Supplier</option>
              <option value="supplier1">Supplier 1</option>
              <option value="supplier2">Supplier 2</option>
              <option value="supplier3">Supplier 3</option>
            </select>
          </div>
          <button className="min-w-[100px] px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full  transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="space-y-4 mt-11">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Purchase Request List</h2>
          <button className="px-4 py-2  bg-black text-white dark:bg-white dark:text-black rounded-full  transition-colors">
            <Link to={'/admin/inventorymanagment/purchaserequest/createpurchaserequest'}>
            <span className="mr-2 ">+</span>
            Add Request
            </Link>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full dark:bg-black dark:text-white bg-white text-black  border">
            <thead>
              <tr className="border border-border">
                <th className="p-2 text-left ">Order No.</th>
                <th className="p-2 text-left ">Date</th>
                <th className="p-2 text-left ">Due Date</th>
                <th className="p-2 text-left ">No of Items</th>
                <th className="p-2 text-left ">Status</th>
                <th className="p-2 text-left ">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border-b">#0001</td>
                <td className="p-2 border-b">20/02/2024</td>
                <td className="p-2 border-b">20/03/2024</td>
                <td className="p-2 border-b">10</td>
                <td className="p-2 border-b">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                    Quotes Received
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b">#0002</td>
                <td className="p-2 border-b">20/02/2024</td>
                <td className="p-2 border-b">20/03/2024</td>
                <td className="p-2 border-b">10</td>
                <td className="p-2 border-b">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                    Rejected
                  </span>
                </td>
                <td className="p-2 border-b">
                  <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>

  )
}

export default Index