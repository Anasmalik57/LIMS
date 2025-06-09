"use client";
import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaFlask,
  FaMicroscope,
  FaStethoscope,
  FaAward,
  FaGraduationCap,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaShieldAlt,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { BiDna } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";

const AboutComponent = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const owners = [
    {
      name: "Imran Tyagi",
      degree: "Bachelor of Medical Laboratory Technology (BMLT)",
      specialization: "Clinical Pathology & Research",
      image: "/imranprofile.jpg", // Replace with actual image
      bio: "Renowned pathologist and researcher dedicated to advancing medical diagnostics through cutting-edge technology and precise analysis.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        instagram: "#",
      },
      achievements: [
        "Clinical Excellence Award",
        "Research Pioneer",
        "Healthcare Innovation",
      ],
    },
    {
      name: "Javead Malik",
      degree: "Bachelor of Science in Nursing",
      specialization: "Laboratory Technology & Diagnostics",
      image: "/javeadmalik.png", // Replace with actual image
      bio: "Leading expert in molecular diagnostics with over 15 years of experience in laboratory management and innovative testing solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#",
        instagram: "#",
      },
      achievements: [
        "500+ Research Papers",
        "Medical Innovation Award",
        "Industry Leader 2023",
      ],
    },
  ];

  const stats = [
    { number: "50K+", label: "Tests Conducted", icon: FaFlask },
    { number: "15+", label: "Years Experience", icon: FaAward },
    { number: "99.9%", label: "Accuracy Rate", icon: FaShieldAlt },
    { number: "24/7", label: "Support Available", icon: FaGlobe },
  ];

  const values = [
    {
      icon: FaHeart,
      title: "Compassionate Care",
      description:
        "Every test we conduct is driven by our commitment to improving lives and health outcomes.",
    },
    {
      icon: FaRocket,
      title: "Innovation First",
      description:
        "Leveraging cutting-edge technology to deliver the most accurate and efficient diagnostic solutions.",
    },
    {
      icon: FaLightbulb,
      title: "Scientific Excellence",
      description:
        "Our team of experts ensures every analysis meets the highest standards of scientific rigor.",
    },
    {
      icon: FaShieldAlt,
      title: "Trust & Reliability",
      description:
        "Building lasting relationships through consistent, reliable results and transparent communication.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div
              id="hero-badge"
              data-animate
              className={`inline-flex items-center gap-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 mb-8 transition-all duration-1000 ${
                isVisible["hero-badge"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <HiSparkles className="text-blue-600 animate-spin-slow" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Welcome to Global Labs
              </span>
            </div>

            <h1
              id="hero-title"
              data-animate
              className={`text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 transition-all duration-1000 delay-200 ${
                isVisible["hero-title"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-transparent bg-clip-text">
                About Us
              </span>
            </h1>

            <p
              id="hero-subtitle"
              data-animate
              className={`text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
                isVisible["hero-subtitle"]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Pioneering the future of medical diagnostics through innovative
              technology, scientific excellence, and unwavering commitment to
              healthcare advancement.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div
            id="stats-grid"
            data-animate
            className={`grid grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 ${
              isVisible["stats-grid"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl">
                    <IconComponent className="text-4xl text-blue-600 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-4xl font-black text-gray-800 dark:text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              id="mission-content"
              data-animate
              className={`transition-all duration-1000 ${
                isVisible["mission-content"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 rounded-full px-4 py-2 mb-6">
                <BiDna className="text-blue-600" />
                <span className="text-blue-700 dark:text-blue-300 font-medium">
                  Our Mission
                </span>
              </div>
              <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-6">
                Revolutionizing Healthcare Through
                <span className="text-blue-600"> Precision</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                At Global Labs, we believe that accurate diagnostics are the
                foundation of effective healthcare. Our mission is to provide
                cutting-edge laboratory services that empower healthcare
                providers with the precise information they need to make
                life-changing decisions.
              </p>
              <div className="space-y-4">
                {[
                  "Advanced molecular diagnostics",
                  "Real-time result delivery",
                  "Comprehensive health analytics",
                  "Personalized medicine solutions",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="mission-visual"
              data-animate
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible["mission-visual"]
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 shadow-2xl">
                <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm"></div>
                <div className="relative text-center text-white">
                  <FaMicroscope className="text-6xl mx-auto mb-6 opacity-80" />
                  <h3 className="text-2xl font-bold mb-4">
                    Scientific Excellence
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Every test we perform is backed by rigorous scientific
                    methodology and validated through extensive quality control
                    measures.
                  </p>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div
            id="values-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["values-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-6">
              Our Core <span className="text-purple-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              The principles that guide every decision we make and every service
              we provide
            </p>
          </div>

          <div
            id="values-grid"
            data-animate
            className={`grid md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-1000 delay-300 ${
              isVisible["values-grid"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group cursor-pointer"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-2xl h-full">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-2xl text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Owners Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div
            id="owners-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible["owners-header"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-6 py-3 mb-6">
              <FaStar className="text-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Meet Our Leaders
              </span>
            </div>
            <h2 className="text-5xl font-black text-gray-800 dark:text-white mb-6">
              Visionary <span className="text-blue-600">Founders</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Leading medical professionals dedicated to advancing healthcare
              through innovation and excellence
            </p>
          </div>

          <div
            id="owners-grid"
            data-animate
            className={`grid lg:grid-cols-2 gap-12 transition-all duration-1000 delay-300 ${
              isVisible["owners-grid"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            {owners.map((owner, index) => (
              <div
                key={index}
                className="group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>

                  <div className="relative">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all duration-300 shadow-xl">
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            {/* <FaGraduationCap className="text-white text-4xl" /> */}
                            <Image src={owner.image} width={500} height={500} alt="owners" className="object-top-right" />
                          </div>
                        </div>
                        <div className="absolute -bottom-2 -right-1 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>

                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
                          {owner.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                          {owner.degree}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 font-medium">
                          {owner.specialization}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {owner.bio}
                    </p>
{/* acheivements */}
                    {/* <div className="grid grid-cols-3 gap-4 mb-6">
                      {owner.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-3"
                        >
                          <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            {achievement}
                          </div>
                        </div>
                      ))}
                    </div> */}

                    {/* <div className="flex justify-center gap-4">
                      {Object.entries(owner.social).map(([platform, url]) => {
                        const iconMap = {
                          linkedin: FaLinkedin,
                          twitter: FaTwitter,
                          github: FaGithub,
                          instagram: FaInstagram,
                        };
                        const IconComponent = iconMap[platform];
                        const colorMap = {
                          linkedin: "hover:text-blue-600",
                          twitter: "hover:text-sky-500",
                          github: "hover:text-gray-800 dark:hover:text-white",
                          instagram: "hover:text-pink-600",
                        };

                        return (
                          <a
                            key={platform}
                            href={url}
                            className={`w-12 h-12 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 dark:border-gray-600/30 text-gray-600 dark:text-gray-300 ${colorMap[platform]} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                          >
                            <IconComponent className="text-lg" />
                          </a>
                        );
                      })}
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div
            id="cta-content"
            data-animate
            className={`transition-all duration-1000 ${
              isVisible["cta-content"]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-5xl font-black text-white mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of healthcare providers who trust Global Labs for
              their diagnostic needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"contact"} className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl">
                Get Started Today
              </Link>
              {/* <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105">
                Learn More
              </button> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutComponent;
