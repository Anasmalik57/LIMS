"use client";
import React, { useState, useEffect } from "react";
import { 
  FiArrowRight, 
  FiPlay, 
  FiCheck, 
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiShield
} from "react-icons/fi";
import { 
  FaFlask, 
  FaMicroscope, 
  FaHeartbeat, 
  FaUserMd,
  FaStar
} from "react-icons/fa";
import Link from "next/link";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-slide for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: FaFlask,
      title: "Advanced Testing",
      description: "State-of-the-art laboratory equipment with 99.9% accuracy"
    },
    {
      icon: FaMicroscope,
      title: "Expert Analysis",
      description: "Board-certified pathologists and experienced technicians"
    },
    {
      icon: FaHeartbeat,
      title: "Quick Results",
      description: "Get your test results within 24-48 hours"
    },
    {
      icon: FaUserMd,
      title: "Professional Care",
      description: "Dedicated healthcare professionals at your service"
    }
  ];

  const stats = [
    { number: "50K+", label: "Tests Completed", icon: FiTrendingUp },
    { number: "25K+", label: "Happy Patients", icon: FiUsers },
    { number: "15+", label: "Years Experience", icon: FiAward },
    { number: "99.9%", label: "Accuracy Rate", icon: FiShield }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      content: "Global Labs provides exceptional service with accurate results. Highly recommended!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Patient",
      content: "Quick, professional, and reliable. The staff is incredibly caring and knowledgeable.",
      rating: 5
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "General Physician",
      content: "I trust Global Labs for all my patients' diagnostic needs. Outstanding quality!",
      rating: 5
    }
  ];

  return (
    <div className="relative pt-12 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaFlask className="absolute top-2/12 -translate-x-4 translate-y-[19px] left-2/6 text-4xl text-blue-400/20  delay-300" />
        <FaMicroscope className="absolute top-1/3 right-1/3 text-5xl text-purple-400/20  delay-700" />
        <FaHeartbeat className="absolute bottom-1/3 left-1/5 text-4xl text-red-400/20  delay-1000" />
        <FaUserMd className="absolute bottom-1/4 right-1/4 text-5xl text-green-400/20  delay-1500" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16">
        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold">
              <FiAward className="text-lg" />
              <span>Trusted by 25,000+ Patients</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-transparent bg-clip-text">
                  Advanced
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">
                  Medical Testing
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  Solutions
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Experience precision healthcare with our state-of-the-art laboratory services. 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> Fast, Accurate, Reliable.</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/contact"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Book Test Now</span>
                <FiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              {/* <button className="group flex items-center gap-3 px-8 py-4 rounded-2xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlay className="text-white ml-1" />
                </div>
                <span>Watch Demo</span>
              </button> */}
            </div>

            {/* Quick Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              {["✓ 24/7 Support", "✓ Quick Results", "✓ Expert Analysis"].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <FiCheck className="text-green-500 font-bold" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 transform hover:scale-105 transition-all duration-500">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Test Results</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-4 mb-6">
                  {[
                    { label: "Blood Test", progress: 95, color: "bg-blue-500" },
                    { label: "Urine Analysis", progress: 88, color: "bg-purple-500" },
                    { label: "X-Ray Scan", progress: 92, color: "bg-green-500" }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</span>
                        <span className="text-gray-800 dark:text-white font-semibold">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full transition-all duration-1000 delay-${index * 200}`}
                          style={{ width: isVisible ? `${item.progress}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4 text-center">
                        <IconComponent className="text-2xl text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-800 dark:text-white">{stat.number}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4  delay-1000">
                <FaFlask className="text-3xl text-blue-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800 dark:text-white">Lab Ready</div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4  delay-1500">
                <FiCheck className="text-3xl text-green-500 mx-auto mb-2" />
                <div className="text-sm font-semibold text-gray-800 dark:text-white">Verified</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className={`mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Global Labs?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience world-class medical testing with cutting-edge technology and expert care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20 dark:border-gray-700/20"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Healthcare Professionals</h2>
                <p className="text-xl opacity-90">Numbers that speak for our excellence</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center group">
                      <IconComponent className="text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                      <div className="text-lg opacity-90">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <div className={`mt-20 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Clients Say</span>
            </h2>
          </div>

          <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20 dark:border-gray-700/20">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500 text-2xl" />
                ))}
              </div>
              <blockquote className="text-2xl lg:text-3xl font-medium text-gray-800 dark:text-white mb-6 italic">
                "{testimonials[currentSlide].content}"
              </blockquote>
              <div className="font-semibold text-xl text-gray-800 dark:text-white">
                {testimonials[currentSlide].name}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {testimonials[currentSlide].role}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;