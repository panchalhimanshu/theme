// app/routes/$catchall.tsx
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader = async () => {
  return json({ message: "Page Not Found" }, { status: 404 });
};

const Catchall = () => {
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-700">404 - Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 text-indigo-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Catchall;
