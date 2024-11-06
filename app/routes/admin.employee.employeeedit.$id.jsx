import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { toast, Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import CallFor from '../utilities/CallFor';
import { useNavigate, useParams } from '@remix-run/react';
import Switch from "react-switch";

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

 const navigate = useNavigate()

  // Fetch roles and user data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch roles
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
  const handleClick = async (e) => {
    e.preventDefault();

    // Validate formData using Yup
    try {
      await validationSchema.validate(formData, { abortEarly: false });

      // Prepare the data for the PUT request
      const updateData = {
        ...formData,
        firstname: formData.firstname,
        lastname: formData.lastname,
        emailid: formData.emailid,
        mobno: formData.mobno,
        password: formData.password, // Ensure this is handled securely
        profilestatus: profileStatus ? 1 : 0,
        roleid: formData.roleid,
        employee_id:formData.employee_id,
        roleModels: [{ ...formData.roleModels[0], roleid: formData.roleid }], // Wrap roleid inside roleModels
      };

      // Send update request
      const response = await CallFor(`users/updateusers/${id}`, 'put', updateData, 'Auth');

      if (response.data.success) {
        toast.success('User information updated successfully');
        navigate("/admin/employee")
      } else {
        throw new Error('Failed to update user information');
      }
    } catch (validationErrors) {
      if (validationErrors.inner) {
        const formattedErrors = {};
        validationErrors.inner.forEach((error) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
        toast.error('Please fix the errors in the form');
      } else {
        toast.error(validationErrors.message);
      }
    }
  };

  // Handle individual field change
  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update form data
    setFormData({ ...formData, [id]: value });

    // Validate field on change
    Yup.reach(validationSchema, id)
      .validate(value)
      .then(() => {
        setErrors((prev) => ({ ...prev, [id]: '' }));
      })
      .catch((error) => {
        setErrors((prev) => ({ ...prev, [id]: error.message }));
      });
  };

  // Handle profile status toggle
  const handleStatusChange = () => {
    setProfileStatus((prevStatus) => !prevStatus);
  };

  return (
    <Layout>
      <Toaster />
      <div className="mx-auto p-6 rounded-lg shadow-md dark:bg-black bg-white dark:text-white text-black">
        <h2 className="text-2xl font-semibold mb-6">Edit Employee Info</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="firstname">
              First Name
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2 "
              type="text"
              id="firstname"
              placeholder="Enter First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="lastname"
              placeholder="Enter Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="roleid">
              Role
            </label>
            <select
              className="mt-1 block w-full border border-border rounded-md p-2 dark:bg-black dark:text-white"
              id="roleid"
              value={formData.roleid}
              onChange={handleChange}
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
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="email"
              id="emailid"
              placeholder="Enter Email Id"
              value={formData.emailid}
              onChange={handleChange}
            />
            {errors.emailid && <p className="text-red-500 text-sm">{errors.emailid}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="mobno">
              Mobile No.
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="tel"
              id="mobno"
              placeholder="Enter Mobile No"
              value={formData.mobno}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.mobno && <p className="text-red-500 text-sm">{errors.mobno}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="employee_id">
              User Id
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="employee_id"
              placeholder="Enter User Id"
              value={formData.employee_id}
              onChange={handleChange}
            />
            {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="password">
              Password
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="flex items-center mt-4">
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="profileStatus">
              Profile Status
            </label>
            <Switch
              checked={profileStatus}
              onChange={() => setProfileStatus(!profileStatus)}
               offColor="#ff4d4d"
  onColor="#00e676"
              uncheckedIcon={false}
              checkedIcon={false}
              className="ml-4"
            />
          </div>

         
        </form>
        <div className="flex justify-end mt-6">
            <button
              className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg"
              onClick={handleClick}
            >
              Update
            </button>
          </div>
      </div>
    </Layout>
  );
}
