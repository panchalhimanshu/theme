import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { toast, Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import CallFor from "../utilities/CallFor";
import { useNavigate } from '@remix-run/react';
import Switch from "react-switch";

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  role: Yup.string().required('Role is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
  userId: Yup.string().required('User ID is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default function Settings() {
  const navigate = useNavigate();
  const [remixdata, setRemixdata] = useState();
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    mobile: '',
    userId: '',
    password: '',
    confirmPassword: '',
  });
  const [profileStatus, setProfileStatus] = useState(false); // New profile status state
  const [errors, setErrors] = useState({});

  // Fetch roles from the server
  useEffect(() => {
    const remixdatas = JSON.parse(atob(sessionStorage.getItem("remixdata")));
    setRemixdata(remixdatas);

   

    const fetchRoles = async () => {
      try {
        const response = await CallFor('users/getsaveusermodal', 'get', '', 'Auth');
        if (!response.data.success) throw new Error('Failed to fetch roles');
        const data = await response.data.roles;
        setRoles(data);
      } catch (error) {
        toast.error('Error fetching roles');
      }
    };
    fetchRoles();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const userdata = {
        fullname: formData.firstName + " " + formData.lastName,
        firstname: formData.firstName,
        lastname: formData.lastName,
        emailid: formData.email,
        mobno: formData.mobile,
        employeeid: formData.userId,
        canlogin: true,
        password: formData.password,
        usercode: '',
        image: '',
        profilestatus: null, // 1 for active, 0 for inactive
        isapproved: true,
        accountstatus: profileStatus ? "1" : "0",
        roleid: formData.role,
        roleName: '',
        roleModels: [
          {
            uoid: remixdata.uoid,
            roleid: formData.role,
            roletypeid: null
          }
        ]
      };

      await validationSchema.validate(formData, { abortEarly: false });

      const response = await CallFor('users', 'post', userdata, 'Auth');
      if (response.data.success) {
        toast.success('Saved');
        navigate('/admin/employee');
      }
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    // Clear error message on change
    setErrors({ ...errors, [id]: '' });
  };

  const toggleProfileStatus = () => {
    setProfileStatus(!profileStatus);
  };

  return (
    <Layout>
      <div className="mx-auto p-6 rounded-lg shadow-md dark:bg-black bg-white">
        <h2 className="text-2xl font-semibold mb-6">Add Employee Info</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="firstName">
              First Name
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="role">
              Role
            </label>
            <select
              className="mt-1 dark:bg-black bg-white dark:text-white text-black block w-full border border-border rounded-md p-2"
              id="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="email">
              Email Id
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="email"
              id="email"
              placeholder="Enter Email Id"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="mobile">
              Mobile No.
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="tel"
              id="mobile"
              placeholder="Enter Mobile No"
              value={formData.mobile}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
          </div>

          {/* User ID */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="userId">
              User Id
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="text"
              id="userId"
              placeholder="Enter User Id"
              value={formData.userId}
              onChange={handleChange}
            />
            {errors.userId && <p className="text-red-500 text-sm">{errors.userId}</p>}
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="dark:bg-black bg-white dark:text-white text-black mt-1 block w-full border border-border rounded-md p-2"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Profile Status */}
          <div className="flex items-center mt-4">
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="profileStatus">
              Profile Status
            </label>
            <Switch
              id="profileStatus"
              onChange={toggleProfileStatus}
              checked={profileStatus}
              className="ml-4"
              onColor="#4CAF50"
              offColor="#CCCCCC"
              onHandleColor="#FFFFFF"
              offHandleColor="#FFFFFF"
              checkedIcon={false}
              uncheckedIcon={false}
            />
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            className="bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg"
            onClick={handleClick}
          >
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
}
