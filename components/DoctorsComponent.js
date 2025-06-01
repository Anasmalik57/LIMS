"use client";

import { useState, useEffect } from "react";
import {
  FaUserMd,
  FaGraduationCap,
  FaRupeeSign,
  FaSearch,
  FaFilter,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaShieldAlt,
  FaPhoneAlt,
} from "react-icons/fa";
// import { BiLoading } from "react-icons/bi";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";

const DoctorsComponent = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [error, setError] = useState(null);

  // Fetch doctors data from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/doctors");
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching doctors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter and sort doctors
  useEffect(() => {
    let filtered = doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.degree.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort doctors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "degree":
          return a.degree.localeCompare(b.degree);
        case "commission":
          return b.commission - a.commission;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, sortBy]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
        {/* Epic Loading Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative text-center z-10">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full p-1 ">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <FaUserMd className="text-4xl text-white animate-pulse" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Loading Premium Doctors
          </h2>
          <p className="text-xl text-gray-300 mb-2">
            Connecting to our medical experts...
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <HiLightningBolt className="text-yellow-400 " />
            <span>Powered by AI Healthcare</span>
            <HiLightningBolt className="text-yellow-400  delay-200" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900/50 via-black to-purple-900/50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center bg-gray-900/80 backdrop-blur-xl p-12 rounded-3xl border border-red-500/30 shadow-2xl max-w-md">
          <div className="text-6xl mb-6 ">💔</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Connection Failed
          </h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full hover:from-red-600 hover:to-pink-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden pt-24">
      {/* Epic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-gradient-to-r from-orange-500/15 to-red-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, cyan 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 bg-black/40 backdrop-blur-2xl border-b border-gray-800/50 sticky top-0">
        <div className="max-w-8xl mx-auto px-6 py-8">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
            {/* Epic Title */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <FaUserMd className="text-3xl text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-ping"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400  to-pink-400 bg-clip-text text-transparent mb-2">
                  ELITE DOCTORS
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-4 py-2 rounded-full border border-yellow-400/30">
                    <HiSparkles className="text-yellow-400 " />
                    <span className="text-yellow-400 font-bold">
                      {filteredDoctors.length}
                    </span>
                    <span className="text-gray-300">Premium Specialists</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-400">
                    <FaShieldAlt className="animate-pulse" />
                    <span className="text-sm font-semibold">
                      Verified & Trusted
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Controls */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Epic Search */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-1">
                  <div className="flex items-center bg-black/50 rounded-xl">
                    <FaSearch className="ml-4 text-cyan-400 text-lg" />
                    <input
                      type="text"
                      placeholder="Search medical experts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full lg:w-96 px-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Epic Filter */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-1">
                  <div className="flex items-center bg-black/50 rounded-xl">
                    <FaFilter className="ml-4 text-purple-400 text-lg" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-4 bg-transparent text-white focus:outline-none cursor-pointer text-lg appearance-none"
                    >
                      <option value="name" className="bg-gray-900">
                        Sort by Name
                      </option>
                      <option value="degree" className="bg-gray-900">
                        Sort by Degree
                      </option>
                      <option value="commission" className="bg-gray-900">
                        Sort by Commission
                      </option>
                      <option value="newest" className="bg-gray-900">
                        Sort by Newest
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="relative z-10 max-w-8xl mx-auto px-6 py-12">
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6 filter grayscale opacity-50">👨‍⚕️</div>
            <h3 className="text-4xl font-bold text-white mb-4">
              No Doctors Found
            </h3>
            <p className="text-xl text-gray-400">
              Try different search terms or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor._id}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>

                {/* Main Card */}
                <div className="relative cursor-pointer bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-6 hover:border-cyan-400/50 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:scale-105">
                  {/* Premium Badge */}
                  {/* <div className="absolute -top-3 -right-3 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full shadow-lg ">
                      <Fa className="text-white text-lg" />
                    </div>
                  </div> */}

                  {/* Doctor Avatar */}
                  <div className="relative mb-6 flex justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <FaUserMd className="text-3xl text-white" />
                      </div>
                      {/* Status Indicator */}
                      <div className="absolute -bottom-2 -right-2">
                        <div className="w-8 h-8 bg-green-400 rounded-full border-4 border-gray-900 flex items-center justify-center animate-pulse">
                          <FaHeart className="text-gray-900 text-sm" />
                        </div>
                      </div>
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                      Dr. {doctor.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
                      <FaGraduationCap className="text-purple-400" />
                      <span className="text-sm font-medium">
                        {doctor.degree}
                      </span>
                    </div>
                  </div>

                  {/* Commission Display */}
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-2xl p-4 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 animate-pulse"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {/* <FaRupeeSign className="text-green-400 text-lg" /> */}
                        <span className="text-gray-300 font-semibold">
                          Commission
                        </span>
                      </div>
                      <span className="text-2xl font-black text-green-400">
                        {formatCurrency(doctor.commission)}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaCalendarAlt className="text-blue-400" />
                      <span className="text-sm">
                        Joined {formatDate(doctor.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                      <FaMapMarkerAlt className="text-red-400" />
                      <span className="text-sm">Available 24/7</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {/* <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r cursor-pointer from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                      <FaPhoneAlt className="animate-pulse" />
                      <span>Call Now</span>
                    </button>
                    <button className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-400 rounded-2xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                      <FaEnvelope className="text-lg" />
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Epic Footer Stats */}
      {filteredDoctors.length > 0 && (
        <div className="relative z-10 bg-black/60 backdrop-blur-2xl border-t border-gray-800/50 mt-16">
          <div className="max-w-8xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Total Doctors */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center">
                  <div className="text-6xl font-black text-cyan-400 mb-4">
                    {filteredDoctors.length}
                  </div>
                  <div className="text-xl text-gray-300 font-bold">
                    Elite Doctors
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Ready to serve you
                  </div>
                </div>
              </div>

              {/* Average Commission */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center">
                  <div className="text-4xl font-black text-green-400 mb-4">
                    {formatCurrency(
                      filteredDoctors.reduce(
                        (sum, doc) => sum + doc.commission,
                        0
                      ) / filteredDoctors.length
                    )}
                  </div>
                  <div className="text-xl text-gray-300 font-bold">
                    Avg. Commission
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Competitive rates
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 text-center">
                  <div className="text-6xl font-black text-purple-400 mb-4">
                    24/7
                  </div>
                  <div className="text-xl text-gray-300 font-bold">
                    Premium Support
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Always available
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsComponent;
