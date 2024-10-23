import Button from '~/components/Button';
import Layout from '~/components/Layout';
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default function Index() {
  const [users, setUsers] = useState<User[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sort, setSort] = useState({ column: '', order: '' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        const chartData = data.map((user, index) => {
          return {
            name: user.name,
            email: user.email,
            phone: user.phone,
            website: user.website,
            pv: Math.random() * 100,
            amt: Math.random() * 100,
          };
        });
        setData(chartData);
        setSortedData(chartData);
      });
  }, []);

  const handleSort = (column: string) => {
    const sorted = [...sortedData];
    if (sort.column === column) {
      sorted.reverse();
      setSort({ column, order: sort.order === 'asc' ? 'desc' : 'asc' });
    } else {
      sorted.sort((a, b) => a[column].localeCompare(b[column]));
      setSort({ column, order: 'asc' });
    }
    setSortedData(sorted);
  };

  return (
    <Layout>
   <div className="container mx-auto p-4 pt-2 mt-5">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full xl:w-6/12 p-4">
          <LineChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="w-full xl:w-6/12 p-4">
          <BarChart width={400} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="amt" fill="#82ca9d" />
          </BarChart>
        </div>
        <div className="w-full xl:w-6/12 p-4">
          <PieChart width={400} height={250}>
            <Pie data={data} dataKey="pv" nameKey="name" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
            <Pie data={data} dataKey="amt" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" />
            <Tooltip />
          </PieChart>
        </div>
        <div className="w-full xl:w-6/12 p-4">
          <RadarChart width={400} height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="pv" dataKey="pv" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="amt" dataKey="amt" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </div>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full xl:w-12/12 p-4">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2" onClick={() => handleSort('name')}>Name {sort.column === 'name' ? (sort.order === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2" onClick={() => handleSort('email')}>Email {sort.column === 'email' ? (sort.order === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2" onClick={() => handleSort('phone')}>Phone {sort.column === 'phone' ? (sort.order === 'asc' ? '↑' : '↓') : ''}</th>
                <th className="px-4 py-2" onClick={() => handleSort('website')}>Website {sort.column === 'website' ? (sort.order === 'asc' ? '↑' : '↓') : ''}</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((user, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.phone}</td>
                  <td className="border px-4 py-2">{user.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </Layout>
  );
}










  



