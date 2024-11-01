import React, { useEffect, useState } from 'react';
import { Bar, BarChart } from "recharts";
import { ArrowDownIcon, ArrowUpIcon, MoreHorizontal } from "lucide-react";
import Layout from '../components/Layout';

const salesData = [
  { month: "JAN", value: 100 },
  { month: "FEB", value: 120 },
  { month: "MAR", value: 115 },
  { month: "APR", value: 180 },
  { month: "MAY", value: 200 },
  { month: "JUN", value: 180 },
  { month: "JUL", value: 190 },
  { month: "AUG", value: 120 },
  { month: "SEP", value: 200 },
  { month: "OCT", value: 250 },
  { month: "NOV", value: 280 },
  { month: "DEC", value: 300 },
];

const recentOrders = [
  { id: "123", amount: "₹9.99", status: "Completed" },
  { id: "123", amount: "₹9.99", status: "Completed" },
  { id: "123", amount: "₹9.99", status: "Completed" },
  { id: "123", amount: "₹9.99", status: "Completed" },
];

const inventory = [
  { name: "Coffee Beans", qty: 45, status: "In Stock" },
  { name: "Coffee Beans", qty: 0, status: "Out Stock" },
  { name: "Coffee Beans", qty: 5, status: "Low Stock" },
  { name: "Coffee Beans", qty: 45, status: "In Stock" },
];

export default function Component() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Today's sale"
            value="$24,064"
            change={27.4}
            trend="up"
            period="From last 1d ago"
          />
          <MetricCard
            title="This Week"
            value="$8,064"
            change={27.4}
            trend="up"
            period="From last 1d ago"
          />
          <MetricCard
            title="Canceled Order"
            value="100"
            change={27.4}
            trend="down"
            period="From last 1d ago"
          />
          <MetricCard
            title="Total Revenue"
            value="$24,064"
            change={27.4}
            trend="up"
            period="From last 1d ago"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex flex-row items-center justify-between border-b">
              <h2 className="text-lg font-semibold">Sales Activity</h2>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreHorizontal className="w-4 h-4 " />
              </button>
            </div>
            <div className="p-4">
              <div className="h-[300px]  ">
                <BarChart width={500} height={300} data={salesData}>
                  <Bar
        dataKey="value"
        fill={isDarkMode ? 'white' : 'hsl(var(--primary))'}
        radius={[4, 4, 0, 0]}
      />
                </BarChart>
              </div>
            </div>
          </div>

          <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex flex-row items-center justify-between border-b">
              <h2 className="text-lg font-semibold">Trending menu</h2>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800" />
                      <span className="font-medium">Kopag Benedict</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">27.4%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex flex-row items-center justify-between border-b">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View More</button>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2">Order #</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, i) => (
                    <tr key={i}>
                      <td className="py-2">{order.id}</td>
                      <td className="py-2">{order.amount}</td>
                      <td className="py-2">{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex flex-row items-center justify-between border-b">
              <h2 className="text-lg font-semibold">Inventory Management</h2>
              <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {inventory.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.status}</div>
                      </div>
                      <div className="text-xl font-bold">{item.qty}</div>
                    </div>
                  ))}
                </div>
                <div className="relative flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="16" fill="none" className="text-gray-200 dark:text-gray-800" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="16" fill="none" className="text-blue-500 dark:text-blue-400" strokeDasharray="352" strokeDashoffset="35.2" />
                  </svg>
                  <span className="absolute text-xl font-bold">90%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({
  title,
  value,
  change,
  trend,
  period,
}) {
  return (
    <div className="bg-white text-black dark:bg-black dark:text-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-2 border-b">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-xs text-gray-500 dark:text-gray-400">{period}</span>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1">
          {trend === "up" ? (
            <ArrowUpIcon className="w-4 h-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-red-500" />
          )}
          <span className={trend === "up" ? "text-green-500" : "text-red-500"}>{change}%</span>
        </div>
      </div>
    </div>
  );
}
