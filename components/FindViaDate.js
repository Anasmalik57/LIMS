"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaSearch,
  FaArrowLeft,
  FaFileAlt,
  FaUser,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaFilter,
  FaClock,
  FaCalendarDay,
  FaCalendarWeek,
} from "react-icons/fa";

const FindViaDate = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickFilter, setQuickFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (startDate || endDate || quickFilter) {
      handleSearch();
    } else {
      setFilteredReports([]);
    }
  }, [startDate, endDate, quickFilter, reports]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/report");
      const data = await response.json();

      if (data.success) {
        const sortedReports = data.reports.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReports(sortedReports);
      } else {
        setError(data.message || "Failed to fetch reports");
      }
    } catch (err) {
      setError("Failed to fetch reports");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setSearching(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Smooth UX delay
    
    let filtered = reports;

    if (quickFilter) {
      const today = new Date();
      const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      switch (quickFilter) {
        case "today":
          filtered = reports.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate >= startOfToday;
          });
          break;
        case "yesterday":
          const yesterday = new Date(startOfToday);
          yesterday.setDate(yesterday.getDate() - 1);
          filtered = reports.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate >= yesterday && reportDate < startOfToday;
          });
          break;
        case "last7days":
          const last7Days = new Date(startOfToday);
          last7Days.setDate(last7Days.getDate() - 7);
          filtered = reports.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate >= last7Days;
          });
          break;
        case "last30days":
          const last30Days = new Date(startOfToday);
          last30Days.setDate(last30Days.getDate() - 30);
          filtered = reports.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate >= last30Days;
          });
          break;
        case "thismonth":
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          filtered = reports.filter(report => {
            const reportDate = new Date(report.createdAt);
            return reportDate >= startOfMonth;
          });
          break;
      }
    } else if (startDate || endDate) {
      filtered = reports.filter(report => {
        const reportDate = new Date(report.createdAt);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate + "T23:59:59") : null;
        
        if (start && end) {
          return reportDate >= start && reportDate <= end;
        } else if (start) {
          return reportDate >= start;
        } else if (end) {
          return reportDate <= end;
        }
        return true;
      });
    }
    
    setFilteredReports(filtered);
    setSearching(false);
  };

  const handleReportClick = (reportId) => {
    router.push(`/report/${reportId}`);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setQuickFilter("");
    setFilteredReports([]);
  };

  const setTodayDate = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
    setEndDate(today);
    setQuickFilter("");
  };

  const quickFilterOptions = [
    { value: "today", label: "Today", icon: FaCalendarDay },
    { value: "yesterday", label: "Yesterday", icon: FaClock },
    { value: "last7days", label: "Last 7 Days", icon: FaCalendarWeek },
    { value: "last30days", label: "Last 30 Days", icon: FaCalendarAlt },
    { value: "thismonth", label: "This Month", icon: FaCalendarAlt },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <FaSpinner className="animate-spin text-6xl text-orange-400 mx-auto mb-6" />
            <div className="absolute inset-0 animate-ping">
              <FaSpinner className="text-6xl text-orange-400/30 mx-auto" />
            </div>
          </div>
          <p className="text-white text-xl font-medium">Loading Date Reports...</p>
          <div className="mt-4 w-32 h-1 bg-orange-400/20 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-400 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center backdrop-blur-sm bg-white/10 p-8 rounded-2xl border border-white/20">
          <FaExclamationTriangle className="text-8xl text-red-400 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-bold text-white mb-4">Error Loading Reports</h1>
          <p className="text-red-200 mb-6 text-lg">{error}</p>
          <button
            onClick={fetchReports}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/report"
              className="p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent flex items-center gap-3">
                <FaCalendarAlt className="text-orange-400 text-3xl" />
                Find Reports by Date
              </h1>
              <p className="text-orange-200 mt-2 text-lg">
                Search and filter medical reports by date range
              </p>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <FaClock className="text-orange-400" />
              Quick Filters
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {quickFilterOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => {
                      setQuickFilter(option.value);
                      setStartDate("");
                      setEndDate("");
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg ${
                      quickFilter === option.value
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                        : "bg-white/10 text-orange-200 hover:bg-white/20"
                    }`}
                  >
                    <IconComponent className="text-sm" />
                    <span className="text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date Range Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Start Date */}
            <div className="relative group">
              <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 z-10" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setQuickFilter("");
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent text-white transition-all duration-300 group-hover:bg-white/15"
              />
              <label className="absolute -top-2 left-3 bg-gradient-to-r from-slate-900 to-orange-900 px-2 text-xs text-orange-200 font-medium">
                Start Date
              </label>
            </div>

            {/* End Date */}
            <div className="relative group">
              <FaCalendarAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 z-10" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setQuickFilter("");
                }}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-transparent text-white transition-all duration-300 group-hover:bg-white/15"
              />
              <label className="absolute -top-2 left-3 bg-gradient-to-r from-slate-900 to-orange-900 px-2 text-xs text-red-200 font-medium">
                End Date
              </label>
            </div>

            {/* Today Button */}
            <button
              onClick={setTodayDate}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              <FaCalendarDay />
              Today
            </button>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              <FaFilter />
              Clear Filters
            </button>
          </div>

          {/* Stats */}
          {(startDate || endDate || quickFilter) && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-4 rounded-xl border border-orange-400/30">
                <div className="text-2xl font-bold text-white">{filteredReports.length}</div>
                <div className="text-orange-200">Reports Found</div>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30">
                <div className="text-2xl font-bold text-white">
                  {filteredReports.filter(r => r.done).length}
                </div>
                <div className="text-green-200">Completed</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-4 rounded-xl border border-yellow-400/30">
                <div className="text-2xl font-bold text-white">
                  {filteredReports.filter(r => !r.done).length}
                </div>
                <div className="text-yellow-200">Pending</div>
              </div>
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30">
                <div className="text-2xl font-bold text-white">
                  ₹{filteredReports.reduce((sum, r) => sum + (r.totalPrice || 0), 0)}
                </div>
                <div className="text-purple-200">Total Amount</div>
              </div>
            </div>
          )}

          {searching && (
            <div className="mt-4 flex items-center justify-center">
              <FaSpinner className="animate-spin text-orange-400 mr-2" />
              <span className="text-orange-200">Searching reports...</span>
            </div>
          )}
        </div>

        {/* Results */}
        {!startDate && !endDate && !quickFilter ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-16 text-center">
            <div className="relative">
              <FaCalendarAlt className="text-8xl text-orange-400/30 mx-auto mb-6" />
              <div className="absolute inset-0 animate-pulse">
                <FaCalendarAlt className="text-8xl text-orange-400/10 mx-auto" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Search Reports by Date</h2>
            <p className="text-orange-200 text-lg mb-8">
              Select a date range or use quick filters to view reports
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setQuickFilter("today")}
                className="px-6 py-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-200 rounded-xl border border-orange-400/30 hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-300 font-medium"
              >
                View Today's Reports
              </button>
              <button
                onClick={() => setQuickFilter("last7days")}
                className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-200 rounded-xl border border-blue-400/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300 font-medium"
              >
                Last 7 Days
              </button>
            </div>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-16 text-center">
            <FaExclamationTriangle className="text-8xl text-orange-400/50 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">No Reports Found</h2>
            <p className="text-orange-200 text-lg">
              No reports found for the selected date range
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <div
                key={report._id}
                onClick={() => handleReportClick(report._id)}
                className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-300 cursor-pointer border-l-4 border-l-orange-400 group hover:scale-[1.02] hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaUser className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                          {report.patientName.toUpperCase()}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-blue-200">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-orange-300">Age/Gender:</span>
                            <span className="text-white">{report.age} Yrs, {report.gender}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">Mobile:</span>
                            <span className="text-white">{report.mobile}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">Ref. By:</span>
                            <span className="text-white">{report.refBy || "Self"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">Collected By:</span>
                            <span className="text-white">{report.collectedBy || "Main Branch"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">Tests:</span>
                            <span className="text-white font-medium">{report.tests.length}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">Amount:</span>
                            <span className="text-green-400 font-bold">₹{report.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Status */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-orange-300 mb-2 font-medium">
                        {formatDate(report.createdAt)} {formatTime(report.createdAt)}
                      </div>
                      <div
                        className={`inline-flex px-4 py-2 rounded-full text-xs font-bold shadow-lg ${
                          report.done
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                        }`}
                      >
                        {report.done ? "✓ Completed" : "⏳ Pending"}
                      </div>
                    </div>

                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                      <FaEye />
                      View Report
                    </button>
                  </div>
                </div>

                {/* Tests Summary */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex flex-wrap gap-3">
                    {report.tests.slice(0, 3).map((test, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-200 rounded-full text-sm font-medium border border-orange-400/30 backdrop-blur-sm"
                      >
                        {test.testName}
                      </span>
                    ))}
                    {report.tests.length > 3 && (
                      <span className="px-4 py-2 bg-gradient-to-r from-gray-500/20 to-gray-600/20 text-gray-300 rounded-full text-sm font-medium border border-gray-400/30 backdrop-blur-sm">
                        +{report.tests.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindViaDate;