"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  FiUsers, 
  FiTarget, 
  FiHeart, 
  FiAward,
  FiTrendingUp,
  FiShield,
  FiGlobe,
  FiZap,
  FiCheckCircle,
  FiArrowRight
} from "react-icons/fi";
import { 
  FaFlask, 
  FaMicroscope, 
  FaHeartbeat, 
  FaUserMd,
  FaAtom,
  FaDna,
  FaStethoscope,
  FaBrain
} from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    experience: 0,
    patients: 0,
    tests: 0,
    accuracy: 0
  });
  const [activeTab, setActiveTab] = useState('mission');
  const observerRef = useRef();

  // Animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startCounters();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Counter animation
  const startCounters = () => {
    const targets = { experience: 15, patients: 25000, tests: 50000, accuracy: 99.9 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    Object.keys(targets).forEach(key => {
      let current = 0;
      const increment = targets[key] / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targets[key]) {
          current = targets[key];
          clearInterval(timer);
        }
        setCounters(prev => ({
          ...prev,
          [key]: key === 'accuracy' ? current.toFixed(1) : Math.floor(current)
        }));
      }, stepTime);
    });
  };

  const values = [
    {
      icon: FiTarget,
      title: "Precision",
      description: "Every test performed with meticulous attention to detail and accuracy",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FiHeart,
      title: "Compassion",
      description: "Caring for patients with empathy and understanding at every step",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FiShield,
      title: "Integrity",
      description: "Maintaining the highest ethical standards in all our practices",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: FiZap,
      title: "Innovation",
      description: "Embracing cutting-edge technology for better healthcare outcomes",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const milestones = [
    {
      year: "2008",
      title: "Foundation",
      description: "Global Labs established with a vision to revolutionize medical testing",
      icon: FaFlask
    },
    {
      year: "2012",
      title: "First Expansion",
      description: "Opened 5 new branches across major cities",
      icon: FiGlobe
    },
    {
      year: "2016",
      title: "Technology Upgrade",
      description: "Implemented AI-powered diagnostic systems",
      icon: FaBrain
    },
    {
      year: "2020",
      title: "Digital Revolution",
      description: "Launched online booking and digital report system",
      icon: FiTrendingUp
    },
    {
      year: "2023",
      title: "25K+ Milestone",
      description: "Served over 25,000 satisfied patients",
      icon: FiUsers
    }
  ];

  const tabContent = {
    mission: {
      title: "Our Mission",
      content: "To provide world-class medical testing services that empower healthcare professionals and patients with accurate, timely, and reliable diagnostic information. We strive to bridge the gap between advanced medical technology and accessible healthcare.",
      icon: FiTarget
    },
    vision: {
      title: "Our Vision",
      content: "To become the leading global provider of innovative diagnostic solutions, setting new standards in medical testing accuracy, speed, and patient care. We envision a future where every individual has access to precise medical diagnostics.",
      icon: FiGlobe
    },
    values: {
      title: "Our Values",
      content: "Excellence, Innovation, Integrity, and Compassion form the cornerstone of everything we do. These values guide our decisions, shape our culture, and drive us to continuously improve our services for better patient outcomes.",
      icon: FiHeart
    }
  };

  const stats = [
    { key: 'experience', label: 'Years Experience', suffix: '+', icon: FiAward },
    { key: 'patients', label: 'Happy Patients', suffix: '+', icon: FiUsers },
    { key: 'tests', label: 'Tests Completed', suffix: '+', icon: FaFlask },
    { key: 'accuracy', label: 'Accuracy Rate', suffix: '%', icon: FiShield }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Medical Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FaDna className="absolute top-1/6 left-1/6 text-4xl text-blue-400/20 animate-bounce delay-300" />
        <FaAtom className="absolute top-1/3 right-1/5 text-5xl text-purple-400/20 animate-bounce delay-700" />
        <FaStethoscope className="absolute bottom-1/3 left-1/4 text-4xl text-pink-400/20 animate-bounce delay-1000" />
        <FaMicroscope className="absolute bottom-1/4 right-1/3 text-5xl text-green-400/20 animate-bounce delay-1500" />
      </div>

      <div ref={observerRef} className="relative max-w-7xl mx-auto px-6 py-20">
        
        {/* Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 px-6 py-3 rounded-full text-sm font-semibold mb-6">
            <FiHeart className="text-lg" />
            <span>About Global Labs</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
              Pioneering
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              Healthcare Excellence
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
            For over 15 years, we've been at the forefront of medical diagnostics, 
            <span className="font-semibold text-purple-600 dark:text-purple-400"> transforming lives through precision and care.</span>
          </p>
        </div>

        {/* Stats Section */}
        <div className={`mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20 dark:border-gray-700/20">
                  <IconComponent className="text-4xl text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
                    {counters[stat.key]}{stat.suffix}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission, Vision, Values Tabs */}
        <div className={`mb-20 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 overflow-hidden">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200/20 dark:border-gray-700/20">
              {Object.keys(tabContent).map((tab) => {
                const IconComponent = tabContent[tab].icon;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-3 py-6 px-4 font-semibold text-lg transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <IconComponent className="text-xl" />
                    <span className="hidden sm:inline">{tabContent[tab].title}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-8 lg:p-12">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  {React.createElement(tabContent[activeTab].icon, { className: "text-2xl text-white" })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tabContent[activeTab].content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className={`mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Our Core <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 border border-white/20 dark:border-gray-700/20"
                >
                  <div className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Section */}
        <div className={`mb-20 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Milestones that shaped our path to excellence
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const IconComponent = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/20 group hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                        <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Center Icon */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="text-2xl text-white" />
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Ready to Experience Excellence?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of satisfied patients who trust Global Labs for their healthcare needs
              </p>
              <button className="group bg-white text-gray-800 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
                <span>Book Your Test Today</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;