import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { toast, Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import CallFor from '../utilities/CallFor';
import { Link,useNavigate, useParams } from '@remix-run/react';
import Switch from "react-switch";
import axios from 'axios';


// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  roleid: Yup.string().required('Role is required'),
  emailid: Yup.string().email('Invalid email').required('Email is required'),
  mobno: Yup.string()
    .matches(/^\d{10}$/, 'Mobile No. must be exactly 10 digits')
    .required('Mobile No. is required'),
  employee_id: Yup.string().required('Employee ID is required'),
  password: Yup.string().required('Password is required'),
});

export default function Settings() {

 const {id} = useParams()
 const navigate = useNavigate()

  const [roles, setRoles] = useState([]);
  const [profileStatus, setProfileStatus] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    roleid: '',
    emailid: '',
    mobno: '',
    employee_id: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [token, settoken] = useState({});


  // Fetch roles and user data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch roles

        const user = sessionStorage.getItem('token') || null;
        const data = user ? JSON.parse(user) : null;
        settoken(data)
        const rolesResponse = await CallFor('users/getsaveusermodal', 'get', '', 'Auth');
        if (!rolesResponse.data.success) throw new Error('Failed to fetch roles');
        setRoles(rolesResponse.data.roles);

        // Fetch user data
        const userResponse = await CallFor(`users/${id}`, 'get', '', 'Auth');
        const userData = userResponse.data.data.user;

        // Setting form data with the fetched user information
        setFormData({
          ...userData,
          lastname: userData.lastname,
          emailid: userData.emailid,
          mobno: userData.mobno,
          employee_id: userData.employee_id, // Updated to match userData structure
          password: userData.password, // Be cautious with password handling
          roleid: userData.roleModels[0]?.roleid || '', // Optional chaining in case roleModels is empty 
          
        });

        setProfileStatus(userData.profilestatus); // Adjusted for profile status
      } catch (error) {
        toast.error('Error fetching data');
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  


  const handleDelete = async () => {
      // try {
      //   const deleteResponse = await CallFor(`users/delete/${id}`, 'delete','df', 'Auth');
      //   if (deleteResponse.data.status) {
      //     toast.success('User deleted successfully');
      //     navigate('/admin/employee');
      //   } else {
      //     toast.error('Failed to delete user');
      //   }
      // } catch (error) {
      //   toast.error('Error deleting user');
      // }
     

      axios.delete(`http://192.168.16.252:5000/api/users/delete/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if(response)
        {
          toast.success('User deleted successfully');
        navigate('/admin/employee');
        }
      })
      .catch(error => {
        toast.error(error);
      });

  };


 

  // Handle profile status toggle
  const handleStatusChange = () => {
    setProfileStatus((prevStatus) => !prevStatus);
  };

  return (
    <Layout>
      <Toaster />
      <div className="mx-auto p-6 rounded-lg shadow-md dark:bg-black bg-white">
        <h2 className="text-2xl font-semibold mb-6">View Employee Info</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="firstname">
              First Name
            </label>
            <input
            disabled
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="firstname"
              placeholder="Enter First Name"
              value={formData.firstname}
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="lastname">
              Last Name
            </label>
            <input
            disabled
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="lastname"
              placeholder="Enter Last Name"
              value={formData.lastname}
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="roleid">
              Role
            </label>
            <select
              className="mt-1 block w-full border border-border rounded-md p-2 dark:bg-black dark:text-white "
              id="roleid"
              value={formData.roleid}
              disabled
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleid && <p className="text-red-500 text-sm">{errors.roleid}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="emailid">
              Email Id
            </label>
            <input
            disabled
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="email"
              id="emailid"
              placeholder="Enter Email Id"
              value={formData.emailid}
            />
            {errors.emailid && <p className="text-red-500 text-sm">{errors.emailid}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="mobno">
              Mobile No.
            </label>
            <input
            disabled
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="tel"
              id="mobno"
              placeholder="Enter Mobile No"
              value={formData.mobno}
              maxLength="10"
            />
            {errors.mobno && <p className="text-red-500 text-sm">{errors.mobno}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="employee_id">
              User Id
            </label>
            <input
            disabled
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="employee_id"
              placeholder="Enter User Id"
              value={formData.employee_id}
            />
            {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="password">
              Password
            </label>
            <input
            disabled
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex items-center mt-4">
  <label className="block text-sm font-medium text-muted-foreground" htmlFor="profileStatus">
    Profile Status
  </label>
  <div className="ml-4">
  <Switch
              checked={profileStatus}
              onChange={() => setProfileStatus(!profileStatus)}
               offColor="#ff4d4d"
               onColor="#00e676"
              uncheckedIcon={false}
              checkedIcon={false}
              className="ml-4"
              disabled
            />
  </div>  
</div>
          {/* <div className="flex justify-end mt-6">
            <button
              className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg"
              onClick={handleClick}
            >
              Update
            </button>
          </div> */}

          

        </form>

        <div className="flex justify-end mt-6">
          <button className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg mr-2">
            <Link to={`/admin/employee/employeeedit/${id}`}>Edit</Link>{" "}
          </button>
          <button onClick={handleDelete} className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg">
            Delete
          </button>
        </div>

      </div>
    </Layout>
  );
}
