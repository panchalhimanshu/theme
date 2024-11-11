import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import Layout from '../components/Layout';

export default function Component() {
  const [date, setDate] = useState()

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout>

    <div className=" mx-auto bg-white text-black dark:bg-black dark:text-white rounded-lg shadow-md p-6">
      <div className="text-lg font-semibold mb-4">Add Wastage</div>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Wastage Date:</label>
          <div className="relative">
            <button
              type="button"
              className={`w-64 flex justify-between text-left font-normal border rounded p-2 ${!date ? 'text-gray-400' : ''}`}
            >
              {date ? formatDate(date) : 'Select Wastage Date'}
              <CalendarIcon className="mr-2 mt-1 h-4 w-4" />
            </button>
            {/* Popover Content should be here for the calendar */}
          </div>
        </div>

          

          <div className="grid grid-cols-3 gap-4 ">
          <div className="space-y-2">
            <label className="text-sm font-medium">Items Name:</label>
            <div className="relative">
              <select className="w-full border rounded p-2 bg-white text-black dark:bg-black dark:text-white">
                <option value="">Select Product Name</option>
                <option value="item1">Item 1</option>
                <option value="item2">Item 2</option>
                <option value="item3">Item 3</option>
              </select>
            </div>
          </div>
            <div className="space-y-2 ">
              <label className="text-sm font-medium ">Quantity:</label>
              <input type="number" className="w-full bg-white text-black dark:bg-black dark:text-white border rounded p-2" placeholder="Enter Quantity" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Unit of Measurement:</label>
              <select className="w-full border rounded p-2 bg-white text-black dark:bg-black dark:text-white">
                <option value="kg">Kilograms</option>
                <option value="units">Units</option>
                <option value="liters">Liters</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Remarks:</label>
            <textarea className="w-full border rounded bg-white text-black dark:bg-black dark:text-white p-2" placeholder="Enter Remarks" />
          </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="border bg-black text-white dark:bg-white dark:text-black rounded px-4 py-2">Back</button>
          <button type="submit" className="bg-black text-white dark:bg-white dark:text-black rounded px-4 py-2">Save</button>
        </div>
      </form>
    </div>
    </Layout>

  )
}
