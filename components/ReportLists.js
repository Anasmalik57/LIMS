"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  FaFileAlt,
  FaUser,
  FaCalendarAlt,
  FaSearch,
  FaChevronDown,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaPen,
} from "react-icons/fa";

const ReportLists = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    right: 0,
  });
  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/report"); // Assuming your API endpoint
      const data = await response.json();

      if (data.success) {
        // Sort reports by createdAt in descending order (most recent first)
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

  const handleReportClick = (reportId) => {
    router.push(`/report/${reportId}`);
  };
  const handleEditClick = (reportId) => {
    router.push(`/editreport/${reportId}`);
  };

  const handleDropdownToggle = (e) => {
    if (!dropdownOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setDropdownOpen(!dropdownOpen);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.mobile.includes(searchTerm) ||
      report.refBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.collectedBy?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <FaSpinner className="animate-spin text-6xl text-blue-400 mx-auto mb-6" />
            <div className="absolute inset-0 animate-ping">
              <FaSpinner className="text-6xl text-blue-400/30 mx-auto" />
            </div>
          </div>
          <p className="text-white text-xl font-medium">Loading Reports...</p>
          <div className="mt-4 w-32 h-1 bg-blue-400/20 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 animate-pulse"></div>
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
          <h1 className="text-3xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h1>
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
    <div className="min-h-screen pt-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-3">
                <FaFileAlt className="text-blue-400 text-3xl" />
                Medical Reports
              </h1>
              <p className="text-blue-200 mt-2 text-lg">
                Total Reports:{" "}
                <span className="font-semibold text-white">
                  {reports.length}
                </span>
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search Bar */}
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  placeholder="Search by patient, mobile, doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent w-full sm:w-72 text-white placeholder:text-[13px] placeholder-blue-200 transition-all duration-300 group-hover:bg-white/15"
                />
              </div>

              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={handleDropdownToggle}
                  className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <FaSearch />
                  Filter Reports
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        {filteredReports.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-16 text-center">
            <div className="relative">
              <FaFileAlt className="text-8xl text-blue-400/30 mx-auto mb-6" />
              <div className="absolute inset-0 animate-pulse">
                <FaFileAlt className="text-8xl text-blue-400/10 mx-auto" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              {searchTerm ? "No reports found" : "No reports available"}
            </h2>
            <p className="text-blue-200 text-lg">
              {searchTerm
                ? "Try adjusting your search criteria"
                : "Reports will appear here once created"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <div
                key={report._id}
                onClick={() => handleReportClick(report._id)}
                className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-300 cursor-pointer border-l-4 border-l-blue-400 group hover:scale-[1.02] hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaUser className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                          {report.patientName.toUpperCase()}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-blue-200">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">
                              Age/Gender:
                            </span>
                            <span className="text-white">
                              {report.age} Yrs, {report.gender}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">
                              Mobile:
                            </span>
                            <span className="text-white">{report.mobile}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">
                              Ref. By:
                            </span>
                            <span className="text-white">
                              {report.refBy || "Self"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">
                              Collected By:
                            </span>
                            <span className="text-white">
                              {report.collectedBy || "Main Branch"}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">
                              Tests:
                            </span>
                            <span className="text-white font-medium">
                              {report.tests.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-blue-300">
                              Amount:
                            </span>
                            <span className="text-green-400 font-bold">
                              ₹{report.totalPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Status */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-blue-300 mb-2 font-medium">
                        {formatDate(report.createdAt)}{" "}
                        {formatTime(report.createdAt)}
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

                    <div className="flex gap-4 flex-col *:cursor-pointer">
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                        <FaEye />
                        View Report
                      </button>
                      <button onClick={()=> handleEditClick} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-700 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
                        <FaPen />
                        Edit Report
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tests Summary */}
                <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="flex flex-wrap gap-3">
                    {report.tests.slice(0, 3).map((test, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 rounded-full text-sm font-medium border border-blue-400/30 backdrop-blur-sm"
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

      {/* Portal Dropdown */}
      {dropdownOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[9999]" onClick={handleDropdownClose}>
            <div
              className="absolute w-56 bg-white/10 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20"
              style={{
                top: dropdownPosition.top,
                right: dropdownPosition.right,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-3">
                <Link
                  href="/report/findbydoctor"
                  onClick={handleDropdownClose}
                  className="w-full text-left px-6 py-3 hover:bg-white/10 flex items-center gap-3 text-white transition-all duration-200 group"
                >
                  <FaUser className="text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Find by Doctor</span>
                </Link>
                <Link
                  href="/report/findbyagent"
                  onClick={handleDropdownClose}
                  className="w-full text-left px-6 py-3 hover:bg-white/10 flex items-center gap-3 text-white transition-all duration-200 group"
                >
                  <FaUser className="text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Find by Agent</span>
                </Link>
                <Link
                  href="/report/findbydate"
                  onClick={handleDropdownClose}
                  className="w-full text-left px-6 py-3 hover:bg-white/10 flex items-center gap-3 text-white transition-all duration-200 group"
                >
                  <FaCalendarAlt className="text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Find by Date</span>
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ReportLists;
