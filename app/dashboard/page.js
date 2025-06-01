"use client";
import React, { useState } from "react";
import {
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiCalendar,
  FiSearch,
  FiBell,
  FiMoreVertical,
  FiEye,
  FiDownload,
  FiFilter,
  FiPlus,
  FiArrowUp,
  FiArrowDown,
  FiClock,
} from "react-icons/fi";
import {
  FaFlask,
  FaUserMd,
  FaChartLine,
  FaHospital,
  FaMicroscope,
  FaHeartbeat,
  FaVial,
  FaStethoscope,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const statsCards = [
    {
      title: "Total Patients",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: FiUsers,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
    },
    {
      title: "Tests Completed",
      value: "18,329",
      change: "+23.1%",
      trend: "up",
      icon: FaFlask,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
      darkBgGradient: "from-green-900/20 to-emerald-900/20",
    },
    {
      title: "Pending Reports",
      value: "127",
      change: "-8.2%",
      trend: "down",
      icon: FiClock,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      darkBgGradient: "from-orange-900/20 to-amber-900/20",
    },
    {
      title: "Revenue",
      value: "₹8,92,340",
      change: "+18.7%",
      trend: "up",
      icon: FiTrendingUp,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
    },
  ];

  const chartData = [
    { name: "Mon", patients: 45, tests: 89, revenue: 12400 },
    { name: "Tue", patients: 52, tests: 95, revenue: 15600 },
    { name: "Wed", patients: 48, tests: 87, revenue: 13200 },
    { name: "Thu", patients: 61, tests: 102, revenue: 18900 },
    { name: "Fri", patients: 55, tests: 98, revenue: 16800 },
    { name: "Sat", patients: 67, tests: 115, revenue: 21300 },
    { name: "Sun", patients: 43, tests: 78, revenue: 11200 },
  ];

  const testTypeData = [
    { name: "Blood Test", value: 35, color: "#3B82F6" },
    { name: "Urine Test", value: 25, color: "#10B981" },
    { name: "X-Ray", value: 20, color: "#F59E0B" },
    { name: "MRI", value: 12, color: "#8B5CF6" },
    { name: "Others", value: 8, color: "#EF4444" },
  ];

  const recentTests = [
    {
      id: "TST001",
      patient: "Rahul Sharma",
      test: "Complete Blood Count",
      status: "Completed",
      date: "2025-05-30",
      doctor: "Dr. Priya Singh",
      priority: "Normal",
    },
    {
      id: "TST002",
      patient: "Meera Patel",
      test: "Lipid Profile",
      status: "In Progress",
      date: "2025-05-30",
      doctor: "Dr. Amit Kumar",
      priority: "High",
    },
    {
      id: "TST003",
      patient: "Arjun Gupta",
      test: "Liver Function Test",
      status: "Pending",
      date: "2025-05-29",
      doctor: "Dr. Sunita Rao",
      priority: "Normal",
    },
    {
      id: "TST004",
      patient: "Kavya Reddy",
      test: "Thyroid Profile",
      status: "Completed",
      date: "2025-05-29",
      doctor: "Dr. Rajesh Mehta",
      priority: "Low",
    },
    {
      id: "TST005",
      patient: "Vikram Singh",
      test: "Chest X-Ray",
      status: "In Progress",
      date: "2025-05-28",
      doctor: "Dr. Neha Agarwal",
      priority: "High",
    },
  ];

  const quickActions = [
    {
      name: "New Patient",
      icon: FiPlus,
      color: "blue",
      action: () => console.log("New patient"),
    },
    {
      name: "Schedule Test",
      icon: FaFlask,
      color: "green",
      action: () => console.log("Schedule test"),
    },
    {
      name: "View Reports",
      icon: FiEye,
      color: "purple",
      action: () => console.log("View reports"),
    },
    {
      name: "Generate Bill",
      icon: FiDownload,
      color: "orange",
      action: () => console.log("Generate bill"),
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Normal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Low":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-transparent bg-clip-text mb-2">
                  Dashboard Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Welcome back! Here's what's happening at Global Labs today.
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients, tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-72"
                  />
                </div>

                {/* Notification Bell */}
                <button className="relative p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  <FiBell className="text-gray-600 dark:text-gray-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* Period Selector */}
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 3 Months</option>
                  <option value="1y">Last Year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-r ${card.bgGradient} dark:${card.darkBgGradient} p-6 rounded-2xl border border-white/50 dark:border-gray-700/30 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 group`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 bg-gradient-to-r ${card.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="text-white text-xl" />
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                        card.trend === "up"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {card.trend === "up" ? <FiArrowUp /> : <FiArrowDown />}
                      {card.change}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {card.value}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {card.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Patient Flow Chart */}
            <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Patient Flow Analytics
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FiFilter className="text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <FiDownload className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorPatients"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorTests"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      opacity={0.3}
                    />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "none",
                        borderRadius: "12px",
                        color: "#F3F4F6",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="patients"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="url(#colorPatients)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="tests"
                      stackId="2"
                      stroke="#10B981"
                      fill="url(#colorTests)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Test Distribution */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Test Distribution
              </h3>
              <div className="h-64 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={testTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {testTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {testTypeData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={action.action}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 border-${action.color}-200 dark:border-${action.color}-800 hover:bg-${action.color}-50 dark:hover:bg-${action.color}-900/20 transition-all duration-200 group`}
                    >
                      <IconComponent
                        className={`text-${action.color}-600 dark:text-${action.color}-400 group-hover:scale-110 transition-transform`}
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {action.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Tests */}
            <div className="xl:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Recent Tests
                </h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View All
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Test ID
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Patient
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Test Type
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Doctor
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Priority
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTests.map((test, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm font-medium text-blue-600 dark:text-blue-400">
                            {test.id}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {test.patient}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 dark:text-gray-300">
                            {test.test}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 dark:text-gray-300">
                            {test.doctor}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              test.status
                            )}`}
                          >
                            {test.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              test.priority
                            )}`}
                          >
                            {test.priority}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {test.date}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <FiMoreVertical className="text-gray-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
