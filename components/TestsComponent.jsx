"use client";
import React, { useState, useEffect, useMemo } from "react";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiShoppingCart,
  FiHeart,
  FiChevronDown,
  FiX,
  FiCheck,
  FiTrendingUp,
  FiClock,
  FiStar
} from "react-icons/fi";
import {
  FaFlask,
  FaMicroscope,
  FaHeartbeat,
  FaUserMd,
  FaDna,
  FaBrain,
  FaEye,
  FaLungs
} from "react-icons/fa";
import { testData } from "./TestsData";

const TestsComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Categorize tests based on their names - updated to match your test data
  const categories = [
    { 
      id: "all", 
      name: "All Tests", 
      icon: FaFlask, 
      color: "from-blue-500 to-cyan-500",
      count: testData.length 
    },
    { 
      id: "hematology", 
      name: "Hematology", 
      icon: FaHeartbeat, 
      color: "from-red-500 to-pink-500",
      keywords: ["blood", "cbc", "hemoglobin", "esr", "aec", "haeomgram", "complete blood count", "blood group", "hbtcdc"]
    },
    { 
      id: "biochemistry", 
      name: "Biochemistry", 
      icon: FaFlask, 
      color: "from-green-500 to-emerald-500",
      keywords: ["sugar", "glucose", "fasting", "random", "hba1c", "lipid", "liver", "kidney", "lft", "kft", "rft", "thyroid", "tft", "vitamin", "creatinine", "uric acid", "electrolytes", "bilirubin", "amylase", "sgot", "sgpt", "cholesterol", "protein", "calcium", "phosphorus", "tsh", "ferritin", "ammonia", "cpk", "alkaline", "urea", "sodium", "potassium", "chloride", "magnesium", "lipase", "d3", "b12", "fsh", "lh", "beta hcg"]
    },
    { 
      id: "serology", 
      name: "Serology", 
      icon: FaDna, 
      color: "from-purple-500 to-indigo-500",
      keywords: ["widal", "vdrl", "crp", "hiv", "typhi", "dengue", "scrub typhus", "hbsag", "igg", "igm", "aso", "hcv", "torch", "toxo"]
    },
    { 
      id: "microscopy", 
      name: "Microscopy", 
      icon: FaMicroscope, 
      color: "from-yellow-500 to-orange-500",
      keywords: ["urine", "stool", "sputum", "microalbumin", "albumin", "ear", "analysis"]
    },
    { 
      id: "cardiac", 
      name: "Cardiac", 
      icon: FaHeartbeat, 
      color: "from-pink-500 to-rose-500",
      keywords: ["ecg", "troponin", "cardiac", "heart"]
    },
    { 
      id: "imaging", 
      name: "Imaging", 
      icon: FaEye, 
      color: "from-indigo-500 to-purple-500",
      keywords: ["x-ray", "chest", "ultrasound", "ultra", "sonography"]
    },
    { 
      id: "infection", 
      name: "Infection", 
      icon: FaLungs, 
      color: "from-teal-500 to-cyan-500",
      keywords: ["covid", "malaria", "mp", "chikungunya", "culture", "sensitivity", "afb", "tuberculin", "tb"]
    },
    { 
      id: "specialty", 
      name: "Specialty Tests", 
      icon: FaUserMd, 
      color: "from-orange-500 to-red-500",
      keywords: ["prostate", "d-dimer", "antenatal", "anc", "semen", "prothrombin", "fluid", "allergy", "anaemia", "autoimmune", "csf", "coagulation", "tumor", "fertility", "pre-operative"]
    }
  ];

  // Calculate category counts
  const categoriesWithCounts = categories.map(category => {
    if (category.id === "all") return category;
    
    const count = testData.filter(test =>
      category.keywords.some(keyword =>
        test.name.toLowerCase().includes(keyword.toLowerCase())
      )
    ).length;
    
    return { ...category, count };
  });

  // Filter and sort tests
  const filteredTests = useMemo(() => {
    let filtered = testData.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.code.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        categoriesWithCounts.find(cat => cat.id === selectedCategory)?.keywords?.some(keyword =>
          test.name.toLowerCase().includes(keyword.toLowerCase())
        );
      
      const matchesPrice = test.price >= priceRange.min && 
                          (priceRange.max === 5000 ? test.price <= 5000 : test.price <= priceRange.max);
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort tests
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price_low":
          return a.price - b.price;
        case "price_high":
          return b.price - a.price;
        case "popular":
          return Math.random() - 0.5; // Random for demo
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  const addToCart = (test) => {
    setCart(prev => {
      const exists = prev.find(item => item.code === test.code && item.name === test.name);
      if (exists) {
        return prev.map(item =>
          item.code === test.code && item.name === test.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...test, quantity: 1 }];
    });
  };

  const toggleFavorite = (test) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.code === test.code && item.name === test.name);
      if (exists) {
        return prev.filter(item => !(item.code === test.code && item.name === test.name));
      }
      return [...prev, test];
    });
  };

  const isInCart = (test) => cart.some(item => item.code === test.code && item.name === test.name);
  const isFavorite = (test) => favorites.some(item => item.code === test.code && item.name === test.name);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="relative pt-20 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <FaFlask className="text-lg" />
            <span>Medical Tests</span>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Comprehensive
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Test Packages
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our wide range of medical tests with advanced technology and expert analysis
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search tests by name or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-white"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-200/50 dark:bg-gray-700/50 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? 'bg-white dark:bg-gray-600 shadow-md' : ''}`}
                >
                  <FiGrid className="text-xl" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" ? 'bg-white dark:bg-gray-600 shadow-md' : ''}`}
                >
                  <FiList className="text-xl" />
                </button>
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <FiFilter />
                <span>Filters</span>
              </button>

              {/* Cart */}
              {cart.length > 0 && (
                <div className="relative">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold">
                    Cart: ₹{cartTotal} ({cart.length})
                  </div>
                </div>
              )}
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="name">Name A-Z</option>
                      <option value="price_low">Price: Low to High</option>
                      <option value="price_high">Price: High to Low</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Price Range: ₹{priceRange.min} - ₹{priceRange.max === 5000 ? '5000+' : priceRange.max}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                        className="flex-1"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="flex items-end">
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-xl">
                      <span className="font-semibold">{filteredTests.length}</span> tests found
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex flex-wrap gap-3">
            {categoriesWithCounts.map((category) => {
              const IconComponent = category.icon;
              const isActive = selectedCategory === category.id;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 hover:scale-105 border border-white/20 dark:border-gray-700/20'
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span>{category.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isActive ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tests Grid/List */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test, index) => (
                <div
                  key={`${test.code}-${test.name}-${index}`}
                  className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <FaFlask className="text-white text-xl" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(test)}
                      className={`p-2 rounded-full transition-colors ${
                        isFavorite(test) ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      <FiHeart className={`text-lg ${isFavorite(test) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {test.name}
                  </h3>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    Code: {test.code}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      {test.price === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `₹${test.price}`
                      )}
                    </div>
                    
                    <button
                      onClick={() => addToCart(test)}
                      disabled={test.price === 0}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                        isInCart(test)
                          ? 'bg-green-500 text-white'
                          : test.price === 0
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                      }`}
                    >
                      {isInCart(test) ? (
                        <>
                          <FiCheck className="text-sm" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <FiShoppingCart className="text-sm" />
                          <span>Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTests.map((test, index) => (
                <div
                  key={`${test.code}-${test.name}-${index}`}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaFlask className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
                          {test.name}
                        </h3>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Code: {test.code}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {test.price === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `₹${test.price}`
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleFavorite(test)}
                          className={`p-2 rounded-xl transition-colors ${
                            isFavorite(test) ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <FiHeart className={`text-lg ${isFavorite(test) ? 'fill-current' : ''}`} />
                        </button>
                        
                        <button
                          onClick={() => addToCart(test)}
                          disabled={test.price === 0}
                          className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all ${
                            isInCart(test)
                              ? 'bg-green-500 text-white'
                              : test.price === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                          }`}
                        >
                          {isInCart(test) ? (
                            <>
                              <FiCheck />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <FiShoppingCart />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* No Results */}
        {filteredTests.length === 0 && (
          <div className="text-center py-12">
            <FaFlask className="text-6xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No tests found
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestsComponent;