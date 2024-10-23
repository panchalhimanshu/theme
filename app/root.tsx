import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { ErrorBoundaryComponent } from "@remix-run/react";
import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

import { Link, ErrorBoundaryComponent } from "@remix-run/react";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-700">404 - Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 text-indigo-600 hover:underline">
        Go back to Home
      </Link>
    </div>
    </div>
  );
};

export default function App() {
  return <Outlet />;
}
