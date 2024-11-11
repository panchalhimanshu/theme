import { Trash2 } from "lucide-react";
import Layout from '../components/Layout';

export default function Component({ 
  requisition = {
    reqDate: "05/12/24",
    dueDate: "10/12/24",
    supplier: "Warehouse 01",
    status: "Pending",
    items: [
      {
        orderNo: "#0001",
        item: "Amul Cow Milk Packet",
        attributes: {
          volume: "xl",
          color: "Black"
        },
        quantity: "x05"
      }
    ]
  }
}) {
  return (
    <Layout>
    <div className="mx-auto text-black bg-white dark:bg-black dark:text-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-b">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Requisition Details</h2>
            <div className="grid grid-cols-2 text-sm gap-2">
              <div className="">Req Date:</div>
              <div>{requisition.reqDate}</div>
              <div className="">Supplier:</div>
              <div>{requisition.supplier}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-2 text-sm gap-2">
              <div className="">Due Date:</div>
              <div>{requisition.dueDate}</div>
              <div className="">Status:</div>
              <div>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800">
                  {requisition.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Requested Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs  uppercase ">
                <tr>
                  <th className="px-6 py-3 w-[100px]">Order No</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Attributes</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3 w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {requisition.items.map((item) => (
                  <tr key={item.orderNo} className=" border-b">
                    <td className="px-6 py-4 font-medium">{item.orderNo}</td>
                    <td className="px-6 py-4">{item.item}</td>
                    <td className="px-6 py-4">
                      Volume: {item.attributes.volume}, Color: {item.attributes.color}
                    </td>
                    <td className="px-6 py-4">{item.quantity}</td>
                    <td className="px-6 py-4">
                      <button className=" hover:">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete item</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium  hover:bg-gray-50">
            Edit Requisition
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
            Delete Requisition
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
}
