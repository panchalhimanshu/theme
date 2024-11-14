import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "@remix-run/react";
import { toast, Toaster } from 'react-hot-toast'; 
import loginpage from '../../public/loginpage.png';
import CallFor from "../utilities/CallFor";
import respos from '../../public/respos.png';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem('remixdata');
    if (!data) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:5000/api/auth/loginuser', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email: email,
      //     password: password,
      //   }),
      // });


     const response = await CallFor('auth/login','post', JSON.stringify({
      email: email,
      password: password,
    }),'withoutAuth')

      if (response.data.success) {
        sessionStorage.setItem('token', JSON.stringify(response.data.data.token));
        sessionStorage.setItem('remixdata', btoa(JSON.stringify(response.data.data)));

        const roleId = response.data.data.roleid;

        // console.log(roleId,"roleod")
        if (roleId == '2') {
          navigate('/admin/dashboard');
        } else if (roleId == '1') {
          navigate('/station/dashboard');
        } else if (roleId == '3') {
          navigate('/waiter/dashboard');
        } else {
          toast.error('Unknown role, unable to redirect.');
        }

        toast.success('Login successful...');

      } else {
        // console.error('Login failed');
        toast.error('Login failed. Please check your credentials.');

      }
    } catch (error) {
      // console.error('Error during login', error);
      toast.error('An error occurred during login. Please try again.');

    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2 bg-gray-100">
       <Toaster />
      {/* Left side - Illustration */}
      <div className="hidden items-center justify-center  p-8 lg:flex">
        <div className="relative h-full max-h-[500px] w-full">
          <img
            src={loginpage}
            alt="Login illustration showing a person interacting with a large device"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex items-center justify-center ">
        <div className="mx-auto w-full max-w-xl space-y-12 shadow-md p-8 bg-white">
          <div className="space-y-2 ">
            {/* <h1 className="text-[50px] font-bold tracking-tight">
              Res<span className="text-gray-500">POS</span>
            </h1> */}
            <img src={respos} className="my-5" />
            <p className="text-3xl text-gray-500 -tracking-tight">Welcome Back</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
