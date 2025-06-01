"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaUserTie,
  FaSearch,
  FaArrowLeft,
  FaFileAlt,
  FaUser,
  FaEye,
  FaSpinner,
  FaExclamationTriangle,
  FaUsers,
  FaFilter,
} from "react-icons/fa";

const FindViaAgent = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const router = useRouter();

  // useCallback se handleSearch function को memoize karo
  const handleSearch = useCallback(async () => {
    setSearching(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Smooth UX delay
    
    const filtered = reports.filter(report => {
      const agentMatch = searchTerm 
        ? report.collectedBy?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      const selectedMatch = selectedAgent 
        ? report.collectedBy?.toLowerCase() === selectedAgent.toLowerCase()
        : true;
      
      return agentMatch && selectedMatch && report.collectedBy && report.collectedBy.toLowerCase() !== 'main branch';
    });
    
    setFilteredReports(filtered);
    setSearching(false);
  }, [reports, searchTerm, selectedAgent]);

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    if (searchTerm || selectedAgent) {
      handleSearch();
    } else {
      setFilteredReports([]);
    }
  }, [searchTerm, selectedAgent, handleSearch]);

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
        
        // Extract unique agents
        const uniqueAgents = [...new Set(
          sortedReports
            .map(report => report.collectedBy)
            .filter(agent => agent && agent.toLowerCase() !== 'main branch')
        )].sort();
        setAgents(uniqueAgents);
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
    setSearchTerm("");
    setSelectedAgent("");
    setFilteredReports([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <FaSpinner className="animate-spin text-6xl text-purple-400 mx-auto mb-6" />
            <div className="absolute inset-0 animate-ping">
              <FaSpinner className="text-6xl text-purple-400/30 mx-auto" />
            </div>
          </div>
          <p className="text-white text-xl font-medium">Loading Agent Reports...</p>
          <div className="mt-4 w-32 h-1 bg-purple-400/20 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
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
    <div className="min-h-screen pt-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/report"
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <FaArrowLeft />
            </Link>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                <FaUserTie className="text-purple-400 text-3xl" />
                Find Reports by Agent
              </h1>
              <p className="text-purple-200 mt-2 text-lg">
                Search and filter medical reports by collection agent
              </p>
            </div>
          </div>

          {/* Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
            {/* Search Input */}
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 z-10" />
              <input
                type="text"
                placeholder="Search agent name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200 transition-all duration-300 group-hover:bg-white/15"
              />
              {searching && (
                <FaSpinner className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 animate-spin" />
              )}
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="flex items-center cursor-pointer justify-center gap-2 px-6 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold"
            >
              <FaFilter />
              Clear Filters
            </button>
          </div>

          {/* Stats */}
          {(searchTerm || selectedAgent) && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-4 rounded-xl border border-purple-400/30">
                <div className="text-2xl font-bold text-white">{filteredReports.length}</div>
                <div className="text-purple-200">Reports Found</div>
              </div>
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-4 rounded-xl border border-green-400/30">
                <div className="text-2xl font-bold text-white">
                  {filteredReports.filter(r => r.done).length}
                </div>
                <div className="text-green-200">Completed</div>
              </div>
              <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 p-4 rounded-xl border border-orange-400/30">
                <div className="text-2xl font-bold text-white">
                  {filteredReports.filter(r => !r.done).length}
                </div>
                <div className="text-orange-200">Pending</div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {!searchTerm && !selectedAgent ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-16 text-center">
            <div className="relative">
              <FaUserTie className="text-8xl text-purple-400/30 mx-auto mb-6" />
              <div className="absolute inset-0 animate-pulse">
                <FaUserTie className="text-8xl text-purple-400/10 mx-auto" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Search for Agent Reports</h2>
            <p className="text-purple-200 text-lg">
              Enter an agent&#39;s name to view their collected reports
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-2xl border border-white/10 p-16 text-center">
            <FaExclamationTriangle className="text-8xl text-orange-400/50 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">No Reports Found</h2>
            <p className="text-orange-200 text-lg">
              No reports found for the selected agent criteria
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredReports.map((report) => (
              <div
                key={report._id}
                onClick={() => handleReportClick(report._id)}
                className="backdrop-blur-xl bg-gradient-to-r from-white/10 to-white/5 rounded-2xl shadow-2xl border border-white/20 p-6 hover:shadow-3xl transition-all duration-300 cursor-pointer border-l-4 border-l-pink-400 group hover:scale-[1.02] hover:bg-gradient-to-r hover:from-white/15 hover:to-white/10"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {/* Patient Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaUser className="text-white text-lg" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-300 transition-colors">
                          {report.patientName.toUpperCase()}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-purple-200">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-pink-300">Collected By:</span>
                            <span className="text-white font-medium">{report.collectedBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-purple-300">Age/Gender:</span>
                            <span className="text-white">{report.age} Yrs, {report.gender}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-purple-300">Mobile:</span>
                            <span className="text-white">{report.mobile}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-purple-300">Ref. By:</span>
                            <span className="text-white">{report.refBy || "Self"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-purple-300">Tests:</span>
                            <span className="text-white font-medium">{report.tests.length}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-purple-300">Amount:</span>
                            <span className="text-green-400 font-bold">₹{report.totalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date and Status */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-pink-300 mb-2 font-medium">
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

                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold">
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
                        className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-full text-sm font-medium border border-purple-400/30 backdrop-blur-sm"
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

export default FindViaAgent;