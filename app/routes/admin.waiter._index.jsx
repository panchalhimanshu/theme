import { Link } from '@remix-run/react';
import Layout from '../components/Layout';

export default function Waiter() {
  return (
    <Layout>
      <div className="p-6 bg-background dark:bg-black bg-white rounded-lg" >
        <h2 className="text-2xl font-bold mb-4">Employee Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1">Employee Name</label>
            <input type="text" placeholder="Employee Name" className="p-2 border border-border rounded w-full" />
          </div>
          <div>
            <label className="block mb-1">Location</label>
            <input type="text" placeholder="Enter Location" className="p-2 border border-border rounded w-full" />
          </div>
          <div>
            <label className="block mb-1">Status</label>
            <input type="text" placeholder="Enter Status" className="p-2 border border-border rounded w-full" />
          </div>
          <div>
            <label className="block mb-1">Role</label>
            <input type="text" placeholder="Enter Role" className="p-2 border border-border rounded w-full" />
          </div>
        </div>
        <button className="bg-black text-white p-2 rounded dark:bg-white dark:text-black">Search</button>

        <h3 className="text-xl font-semibold mt-8 mb-4">Employee List</h3>
        <div className="flex justify-between mb-4">
          <span className="text-muted-foreground"></span>
          <button className="bg-black text-white p-2 rounded dark:bg-white dark:text-black"> <Link to="/admin/waiter/waiteradd"> + Add </Link></button>
        </div>

        <table className="min-w-full bg-card">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-2">Sr No</th>
              <th className="text-left p-2">Name</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Account Active</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Last Login</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="p-2">#0001</td>
              <td className="p-2">Ashok</td>
              <td className="p-2">Outlet Manager</td>
              <td className="p-2">
                <span className="bg-red-500 rounded-full p-1 text-white">Inactive</span>
              </td>
              <td className="p-2">NA</td>
              <td className="p-2">02-06-2024</td>
              <td className="p-2">
                <button className="text-blue-500">View</button>
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-2">#0002</td>
              <td className="p-2">Khushi</td>
              <td className="p-2">Outlet Manager</td>
              <td className="p-2">
                <span className="bg-green-500 rounded-full p-1 text-white">Online</span>
              </td>
              <td className="p-2">Online</td>
              <td className="p-2">02-06-2024</td>
              <td className="p-2">
                <button className="text-blue-500">View</button>
              </td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-2">#0003</td>
              <td className="p-2">Vishva</td>
              <td className="p-2">Outlet Manager</td>
              <td className="p-2">
                <span className="bg-red-500 rounded-full p-1 text-white">Inactive</span>
              </td>
              <td className="p-2">NA</td>
              <td className="p-2">02-06-2024</td>
              <td className="p-2">
                <button className="text-blue-500"> <Link to={'/admin/waiter/waiterview/5'}> View</Link> </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
