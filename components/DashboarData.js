"use client";
import React, { useState, useEffect } from "react";
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
  FiRefreshCw,
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
import Link from "next/link";

const DashboardData = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    patients: [],
    doctors: [],
    users: [],
    stats: {
      totalPatients: 0,
      totalTests: 0,
      pendingReports: 0,
      totalRevenue: 0,
      completedTests: 0,
      pendingTests: 0
    },
    recentPatients: [],
    testDistribution: [],
    chartData: []
  });

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedPeriod]);

  // Generate stats cards based on fetched data
  const statsCards = [
    {
      title: "Total Patients",
      value: dashboardData.stats.totalPatients.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: FiUsers,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
      darkBgGradient: "from-blue-900/20 to-cyan-900/20",
    },
    {
      title: "Tests Completed",
      value: dashboardData.stats.completedTests.toLocaleString(),
      change: "+23.1%",
      trend: "up",
      icon: FaFlask,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-800 to-emerald-50",
      darkBgGradient: "from-green-900/20 to-emerald-900/20",
    },
    {
      title: "Pending Reports",
      value: dashboardData.stats.pendingTests.toLocaleString(),
      change: "-8.2%",
      trend: "down",
      icon: FiClock,
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-900 to-amber-50",
      darkBgGradient: "from-orange-900/20 to-amber-900/20",
    },
    {
      title: "Revenue",
      value: `₹${dashboardData.stats.totalRevenue.toLocaleString()}`,
      change: "+18.7%",
      trend: "up",
      icon: FiTrendingUp,
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-800 to-pink-50",
      darkBgGradient: "from-purple-900/20 to-pink-900/20",
    },
  ];

  const quickActions = [
    {
      name: "New Patient",
      icon: FiPlus,
      color: "blue",
      action:  '/addreport',
    },
    {
      name: "Add Doctor",
      icon: FaUserMd,
      color: "green",
      action:'/addDoctor',
    },
    {
      name: "View Reports",
      icon: FiEye,
      color: "purple",
      action:'/report',
    },
    {
      name: "Doctors List",
      icon: FaStethoscope,
      color: "orange",
      action: "doctorlist"
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Pending":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter recent patients based on search term
  const filteredRecentPatients = dashboardData.recentPatients.filter(patient =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobile.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center gap-3">
              <FiRefreshCw className="animate-spin text-2xl text-blue-600" />
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Loading dashboard data...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Error Loading Dashboard
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <FiRefreshCw />
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20 pt-40 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 text-transparent bg-clip-text mb-2">
                LIMS Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Laboratory Information Management System - Real-time Overview
              </p>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search patients, tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 placeholder:text-white pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-72"
                />
              </div>

              {/* Refresh Button */}
              <button 
                onClick={fetchDashboardData}
                className="p-3 cursor-pointer bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <FiRefreshCw className="text-gray-600 dark:text-gray-400" />
              </button>

              {/* Notification Bell */}
              <button className="relative p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                <FiBell className="text-gray-600 dark:text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Period Selector */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-3 cursor-pointer text-white  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
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
                className={`cursor-pointer bg-gradient-to-r  ${card.bgGradient} dark:${card.darkBgGradient} p-6 rounded-2xl border border-white/50 dark:border-gray-700/30 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 group`}
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
          {/* Analytics Chart */}
          <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Patient & Test Analytics
              </h3>
              {/* <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <FiFilter className="text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <FiDownload className="text-gray-500" />
                </button>
              </div> */}
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData.chartData}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
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
                    data={dashboardData.testDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dashboardData.testDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {dashboardData.testDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
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
                  <Link
                    key={index}
                    href={action.action}
                    className="w-full cursor-pointer flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                  >
                    <IconComponent className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {action.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Patients */}
          <div className="xl:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Patients
              </h3>
              <Link 
                href={"/report"}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Patient Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Mobile
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Age/Gender
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Tests
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Total Amount
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Date
                    </th>
                    {/* <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th> */}
                  </tr>
                </thead>
                <tbody className="">
                  {filteredRecentPatients.map((patient, index) => {
                    const completedTests = patient.tests?.filter(test => test.status === 'Completed').length || 0;
                    const totalTests = patient.tests?.length || 0;
                    const overallStatus = completedTests === totalTests ? 'Completed' : 'Pending';
                    
                    return (
                      <tr
                        key={patient._id || index}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {patient.patientName}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 dark:text-gray-300">
                            {patient.mobile}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 dark:text-gray-300">
                            {patient.age}Y / {patient.gender}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 dark:text-gray-300">
                            {completedTests}/{totalTests}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900 dark:text-white">
                            ₹{patient.totalPrice?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(overallStatus)}`}
                          >
                            {overallStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-600 dark:text-gray-400 text-sm">
                            {formatDate(patient.createdAt)}
                          </span>
                        </td>
                        {/* <td className="py-4 px-4">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors">
                            <FiMoreVertical className="text-gray-500" />
                          </button>
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredRecentPatients.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-6xl mb-4">📋</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm ? 'No patients found matching your search.' : 'No recent patients found.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardData;