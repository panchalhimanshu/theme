import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import { Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { toast, Toaster } from "react-hot-toast";

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
          <script        />
        <Scripts />
      </body>
    </html>
  );
}


export const ErrorBoundary = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
    <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#4b5563' }}>404 - Not Found</h1>
    <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#6b7280' }}>The page you're looking for doesn't exist.</p>
    <Link to="/" style={{ marginTop: '1.5rem', color: '#4f46e5', textDecoration: 'underline' }}>
      Go back to Home
    </Link>
  </div> 
  );
};

export default function App() {
  return (<><Toaster/> <Outlet /></>);
}
