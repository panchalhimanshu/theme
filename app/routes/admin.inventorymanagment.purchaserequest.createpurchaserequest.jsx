import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import Layout from '../components/Layout';
import { useState } from "react"

// This would typically come from your backend
const SUPPLIERS = [
  { id: 1, name: "Supplier A" },
  { id: 2, name: "Supplier B" },
  { id: 3, name: "Supplier C" },
]

const ITEMS = [
  { id: "pizza-base", name: "Pizza Base", sizes: ["9 in", "12 in"], doughTypes: ["Masla", "Regular"] },
  { id: "tomatoes", name: "Tomatoes", types: ["Desi", "Hybrid"] },
  { id: "milk", name: "Amul Cow Milk", capacities: ["500 ml", "1 L", "2 L"] },
  { id: "coca-cola", name: "Coca-Cola Can", capacities: ["330 ml", "500 ml"] },
]

export default function Component() {
  const [dueDate, setDueDate] = useState("")
  const [reqDate, setReqDate] = useState("")
  const [suppliers, setSuppliers] = useState([])
  const [items, setItems] = useState([])

  const addSupplier = () => {
    if (suppliers.length < 2) {
      setSuppliers([...suppliers, suppliers.length + 1])
    }
  }

  const addItem = () => {
    const newItem = {
      id: `#${String(items.length + 1).padStart(4, "0")}`,
      itemId: "",
      attributes: {},
      quantity: 0,
    }
    setItems([...items, newItem])
  }

  const updateItem = (index, updates) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], ...updates }
    setItems(newItems)
  }

  const deleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <Layout>
    <div className="p-6 rounded-lg mx-auto text-black bg-white dark:bg-black dark:text-white">
      <h1 className="text-2xl font-semibold">Create Purchase Request</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Due Date</label>
          <div className="relative">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-black bg-white dark:bg-black dark:text-white"
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Req. Date</label>
          <div className="relative">
            <input
              type="date"
              value={reqDate}
              onChange={(e) => setReqDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-black bg-white dark:bg-black dark:text-white"
            />
            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {suppliers.map((supplier, index) => (
          <div key={supplier} className="space-y-2">
            <label className="text-sm font-medium">Supplier {index + 1}</label>
            <select className="w-full px-3 py-2 border rounded-md text-black bg-white dark:bg-black dark:text-white">
              <option value="">Select Supplier</option>
              {SUPPLIERS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        {suppliers.length < 2 && (
          <button
            onClick={addSupplier}
            className="flex my-2 items-center px-4 py-2 text-sm font-medium border rounded-md text-gray-700 bg-white dark:bg-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </button>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Requested Items</h2>
        <div className="border rounded-lg overflow-x-auto text-black bg-white dark:bg-black dark:text-white">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">S. No</th>
                <th className="px-4 py-2 text-left">Select Items</th>
                <th className="px-4 py-2 text-left">Attributes</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">
                    <select
                      value={item.itemId}
                      onChange={(e) => updateItem(index, { itemId: e.target.value })}
                      className="w-full px-2 py-1 border rounded text-black bg-white dark:bg-black dark:text-white"
                    >
                      <option value="">Select Item</option>
                      {ITEMS.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    {item.itemId && (
                      <div className="flex gap-2">
                        {ITEMS.find((i) => i.id === item.itemId)?.sizes && (
                          <select
                            value={item.attributes.size}
                            onChange={(e) =>
                              updateItem(index, {
                                attributes: { ...item.attributes, size: e.target.value },
                              })
                            }
                            className="px-2 py-1 border rounded text-black bg-white dark:bg-black dark:text-white"
                          >
                            <option value="">Size</option>
                            {ITEMS.find((i) => i.id === item.itemId)?.sizes?.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        )}
                        {ITEMS.find((i) => i.id === item.itemId)?.doughTypes && (
                          <select
                            value={item.attributes.doughType}
                            onChange={(e) =>
                              updateItem(index, {
                                attributes: { ...item.attributes, doughType: e.target.value },
                              })
                            }
                            className="px-2 py-1 border rounded text-black bg-white dark:bg-black dark:text-white"
                          >
                            <option value="">Dough</option>
                            {ITEMS.find((i) => i.id === item.itemId)?.doughTypes?.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        )}
                        {ITEMS.find((i) => i.id === item.itemId)?.types && (
                          <select
                            value={item.attributes.type}
                            onChange={(e) =>
                              updateItem(index, {
                                attributes: { ...item.attributes, type: e.target.value },
                              })
                            }
                            className="px-2 py-1 border rounded text-black bg-white dark:bg-black dark:text-white"
                          >
                            <option value="">Type</option>
                            {ITEMS.find((i) => i.id === item.itemId)?.types?.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        )}
                        {ITEMS.find((i) => i.id === item.itemId)?.capacities && (
                          <select
                            value={item.attributes.capacity}
                            onChange={(e) =>
                              updateItem(index, {
                                attributes: { ...item.attributes, capacity: e.target.value },
                              })
                            }
                            className="px-2 py-1 border rounded text-black bg-white dark:bg-black dark:text-white"
                          >
                            <option value="">Capacity</option>
                            {ITEMS.find((i) => i.id === item.itemId)?.capacities?.map((capacity) => (
                              <option key={capacity} value={capacity}>
                                {capacity}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, { quantity: parseInt(e.target.value) || 0 })
                      }
                      className="w-20 px-2 py-1 border rounded text-black bg-white dark:bg-black dark:text-white"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteItem(index)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={addItem}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 border rounded-md bg-white dark:bg-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Item
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button className="px-4 py-2 text-sm font-medium text-gray-700 border rounded-md bg-white dark:bg-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white rounded-md bg-blue-600 hover:bg-blue-700">
          Save
        </button>
      </div>
    </div>
    </Layout>
  )
}
