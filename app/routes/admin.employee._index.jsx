import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import Layout from '../components/Layout';
import CallFor from '../utilities/CallFor';
import Pagination from '../components/Pagination';
import Switch from "react-switch";
import { Eye } from 'lucide-react';
export default function Waiter() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const ROLES = {
    Outlet_Manager: 2,
    Waiter: 3,
    Kitchen_Manager: 4,
    Inventory_Manager: 5
  };

  const Role = {
    2: "Outlet Manager",
    3: "Waiter",
    4: "Kitchen Manager",
    5: "Inventory Manager"
  };

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await CallFor(
        'users/filter',
        'POST',
        JSON.stringify({
          name,
          status,
          role,
          pagination: { itemPerPage: pageSize, currentPage: page },
        }),
        'Auth'
      );

      if (!response.data || !response.data.status) {
        throw new Error('Failed to fetch roles');
      }

      const data = response.data.data.users || [];
      setTotalPages(Math.ceil(response.data.data.pagination.totalUsers / pageSize));
      setEmployees(data);
    } catch (error) {
      console.error(error);
      setError('Failed to fetch employee data.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    fetchEmployees();
  }, [page, pageSize]);

  const handleSearch = () => {
    setPage(1); // Reset to first page on search
    fetchEmployees();
  };

  const handleStatusToggle = async (uid, currentStatus) => {
    const newStatusValue = currentStatus ? 0 : 1; // 1 is Active, 0 is Inactive
    setLoading(true);

    try {
      await CallFor(`/users/${uid}/profile-status`, 'PATCH', JSON.stringify({
        profileStatus: newStatusValue,
      }), 'Auth');
      fetchEmployees(); // Refresh the data after updating status
    } catch (error) {
      console.error('Failed to update status:', error);
      setError('Failed to update status.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="p-6 bg-background dark:bg-black bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Employee Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Employee Name */}
          <div>
            <label className="block mb-1">Employee Name</label>
            <input
              type="text"
              placeholder="Employee Name"
              className="p-2 border border-border rounded w-full dark:bg-white dark:text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* Status */}
          <div>
            <label className="block mb-1">Status</label>
            <input
              type="text"
              placeholder="Enter Status"
              className="p-2 border border-border rounded w-full dark:bg-white dark:text-black"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          {/* Role */}
          <div>
            <label className="block mb-1">Role</label>
            <select
              className="p-2 border border-border rounded w-full dark:bg-white dark:text-black"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              {Object.keys(ROLES).map((roleKey) => (
                <option key={ROLES[roleKey]} value={ROLES[roleKey]}>
                  {roleKey.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="bg-black block mx-auto text-white p-2 px-9 rounded-full dark:bg-white dark:text-black"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Search' : 'Search'}
        </button>


        <div className="flex justify-between mb-4">
          <h3 className="text-xl font-semibold ">Employee List</h3>
          <button className="bg-black text-white p-2 rounded dark:bg-white dark:text-black">
            <Link to="/admin/employee/employeeadd"> + Add </Link>
          </button>
        </div>

        <table className="min-w-full bg-card">
          <thead>
            <tr className="border dark:border-white border-border">
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
            {employees.map((employee, index) => (
              <tr className="border-b border-border" key={employee.uid}>
                 <td className="p-2">#{employee.uid}</td>
                <td className="p-2">{employee.fullname}</td>
                <td className="p-2  ">  {Role[employee.roleid] || 'NA'} </td>
                <td className="p-2">
                  <Switch
                    onChange={() => handleStatusToggle(employee.uid, employee.profilestatus)}
                    checked={employee.profilestatus == 1} // Check if profile status is active
                    offColor="#ff4d4d"
                    onColor="#00e676"
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                </td>
                <td className="p-2">{employee.profilestatus ? 'Active' : 'Inactive'}</td>
                <td className="p-2">{new Date(employee.logintime).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>

                <td className="p-2">
                  <Link
                    to={`/admin/employee/employeeview/${employee.uid}`}
                    className="text-black dark:text-white border border-black dark:border-white rounded-full px-2 py-1 inline-flex items-center  hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition"
                  >
                    <Eye className="inline  h-4 w-5" />
                    <span>View</span>  {/* Using the Lucide Eye icon */}
                  </Link>
                </td>
              </tr>
            ))}
        {error && <p className="text-red-500 mt-4">{error}</p>}

          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </Layout>
  );
}
