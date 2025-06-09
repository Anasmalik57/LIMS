"use client";

import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiCalendar,
  FiUser,
  FiPhone,
  FiDollarSign,
  FiFileText,
  FiRefreshCw,
} from "react-icons/fi";
import { BiReceipt } from "react-icons/bi";
import { MdFilterList } from "react-icons/md";

const AllBillsComponent = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [billsPerPage] = useState(10);

  // Fetch bills from database
  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bills");
      if (response.ok) {
        const data = await response.json();
        setBills(data.bills || []);
      } else {
        console.error("Failed to fetch bills");
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Filter and sort bills
  const filteredBills = bills
    .filter((bill) => {
      const matchesSearch =
        bill.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.mobile?.includes(searchTerm) ||
        bill._id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterBy === "all" ||
        (filterBy === "high" && bill.finalAmount > 5000) ||
        (filterBy === "medium" &&
          bill.finalAmount >= 1000 &&
          bill.finalAmount <= 5000) ||
        (filterBy === "low" && bill.finalAmount < 1000);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.generatedAt) - new Date(a.generatedAt);
        case "oldest":
          return new Date(a.generatedAt) - new Date(b.generatedAt);
        case "amount-high":
          return b.finalAmount - a.finalAmount;
        case "amount-low":
          return a.finalAmount - b.finalAmount;
        case "name":
          return a.patientName.localeCompare(b.patientName);
        default:
          return 0;
      }
    });

  // Pagination
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = filteredBills.slice(indexOfFirstBill, indexOfLastBill);
  const totalPages = Math.ceil(filteredBills.length / billsPerPage);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <FiRefreshCw className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-slate-300 font-medium">Loading bills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-b border-slate-700/50 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <BiReceipt className="text-blue-500" />
                All Bills Here
              </h1>
              {/* <p className="text-slate-400 mt-1 text-sm">
                Total {filteredBills.length} bills found
              </p> */}
            </div>
            <button
              onClick={fetchBills}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <FiRefreshCw className="text-sm" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 mb-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, mobile, or bill ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none backdrop-blur-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount: High to Low</option>
                <option value="amount-low">Amount: Low to High</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* Filter */}
            <div className="relative">
              <MdFilterList className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none backdrop-blur-sm"
              >
                <option value="all">All Bills</option>
                <option value="high">High Amount (more than ₹5,000)</option>
                <option value="medium">Medium Amount (₹1,000-₹5,000)</option>
                <option value="low">Low Amount (less than ₹1,000)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bills Grid */}
        {currentBills.length === 0 ? (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-12 text-center shadow-xl">
            <FiFileText className="text-6xl text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Bills Found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {currentBills.map((bill) => (
              <div
                key={bill._id}
                className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-slate-600/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-105"
              >
                {/* Bill Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 p-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-50"></div>
                  <div className="relative flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm opacity-90 font-medium">Bill ID</p>
                      <p className="font-mono text-sm font-bold bg-white/20 px-2 py-1 rounded-lg mt-1">
                        #{bill._id?.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">
                        {formatCurrency(bill.finalAmount)}
                      </p>
                      {bill.rupeesDiscount > 0 && (
                        <p className="text-sm opacity-90 bg-green-500/20 px-2 py-1 rounded-lg mt-1">
                          Discount: ₹{bill.rupeesDiscount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bill Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FiUser className="text-blue-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-lg">
                        {bill.patientName}
                      </p>
                      <p className="text-sm text-slate-400 flex items-center gap-2">
                        <FiPhone className="text-xs" />
                        {bill.mobile}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FiCalendar className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Generated
                      </p>
                      <p className="text-sm text-slate-400">
                        {formatDate(bill.generatedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FiFileText className="text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Tests</p>
                      <p className="text-sm text-slate-400">
                        {bill.tests?.length || 0} test(s)
                      </p>
                    </div>
                  </div>

                  {/* Tests Summary */}
                  {bill.tests && bill.tests.length > 0 && (
                    <div className="mt-4 p-4 bg-slate-700/50 rounded-xl border border-slate-600/30">
                      <p className="text-xs font-semibold text-slate-300 mb-3">
                        Tests Included:
                      </p>
                      <div className="space-y-2">
                        {bill.tests.slice(0, 2).map((test, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-slate-400 truncate">
                              {test.testName}
                            </span>
                            <span className="text-white font-medium">
                              {formatCurrency(test.price)}
                            </span>
                          </div>
                        ))}
                        {bill.tests.length > 2 && (
                          <p className="text-xs text-blue-400 font-medium bg-blue-500/20 px-2 py-1 rounded-lg inline-block">
                            +{bill.tests.length - 2} more tests
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                Showing {indexOfFirstBill + 1} to{" "}
                {Math.min(indexOfLastBill, filteredBills.length)} of{" "}
                {filteredBills.length} bills
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded-xl border transition-all duration-200 backdrop-blur-sm ${
                      currentPage === index + 1
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg"
                        : "bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 backdrop-blur-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBillsComponent;