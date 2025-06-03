"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaCode,
  FaRocket,
  FaFlask,
  FaUserMd,
  FaTachometerAlt,
  FaStethoscope,
  FaChevronUp,
  FaPaperPlane,
  FaHome,
  FaInfo,
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa";
import { IoReceiptSharp } from "react-icons/io5";
import { BiWorld } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };


  const quickLinks = [
    { name: "Home", href: "/", icon: FaHome },
    { name: "Reports", href: "/report", icon: IoReceiptSharp },
    { name: "About", href: "/about", icon: FaInfo },
    { name: "Contact", href: "/contact", icon: FaPhoneAlt },
  ];

  const services = [
    { name: "Lab Management", icon: FaFlask },
    { name: "Report Generation", icon: IoReceiptSharp },
    { name: "Doctor Portal", icon: FaStethoscope },
    { name: "Patient Records", icon: FaUserMd },
    { name: "Analytics", icon: FaTachometerAlt },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "#",
      color: "hover:text-blue-500",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "#",
      color: "hover:text-sky-400",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "#",
      color: "hover:text-pink-500",
    },
    {
      name: "Whatsapp",
      icon: FaWhatsapp,
      href: "#",
      color: "hover:text-green-500",
    },
  ];

  return (
    <footer className="relative  bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="absolute right-6 bottom-24 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 hover:scale-110 transition-all duration-300 group z-50 cursor-pointer"
      >
        <FaChevronUp className="text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div className="group">
                <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 text-transparent bg-clip-text group-hover:scale-105 transition-all duration-300">
                  Global Labs
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 group-hover:w-24 transition-all duration-300"></div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Revolutionizing laboratory management with cutting-edge
                technology and innovative solutions for healthcare professionals
                worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                  <FaMapMarkerAlt className="text-blue-500 group-hover:scale-110 transition-transform" />
                  <span>Roorkee, Uttarakhand, India</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                  <FaEnvelope className="text-purple-500 group-hover:scale-110 transition-transform" />
                  <Link href={"mailto:imrantyagi201@gmail.com"}>imrantyagi201@gmail.com</Link>
                </div>
                <div className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors group">
                  <FaPhoneAlt className="text-green-500 group-hover:scale-110 transition-transform" />
                  <span><Link href={"tel:+919084648712"}>+91 9084648712</Link></span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Quick Links
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group py-1"
                      >
                        {IconComponent && (
                          <IconComponent className="text-sm group-hover:scale-110 group-hover:text-blue-500 transition-all" />
                        )}
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Our Services
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              </h3>
              <ul className="space-y-3">
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <li key={service.name}>
                      <div className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-all duration-300 group py-1 cursor-pointer">
                        <IconComponent className="text-sm group-hover:scale-110 group-hover:text-purple-500 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {service.name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white relative">
                Stay Updated
                <div className="absolute -bottom-1 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
              </h3>

              <p className="text-gray-300 text-sm">
                Get the latest updates on new features and lab management
                insights.
              </p>

              {/* Newsletter Form */}
              {/* <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubscribed ? (
                    <>
                      <HiSparkles className="group-hover:rotate-12 transition-transform" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                      Subscribe
                    </>
                  )}
                </button>
              </form> */}

              {/* Social Links */}
              <div className="pt-4">
                <p className="text-gray-400 text-sm mb-4">Follow Us</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <Link
                        key={social.name}
                        href={social.href}
                        className={`p-3 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 group ${social.color} hover:scale-110 hover:shadow-lg`}
                      >
                        <IconComponent className="text-lg group-hover:scale-110 transition-transform" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span>© 2024 Global Labs. Crafted with</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>by</span>
                <Link
                  href="#"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Mohd Anas
                </Link>
              </div>

              {/* Tech Stack Badge */}
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FaCode className="text-green-500" />
                <span>Built with Next.js</span>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <FaRocket className="text-blue-500" />
                <span>Powered by Innovation</span>
              </div>

              {/* Additional Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
                <div className="flex items-center gap-1 text-gray-400">
                  <BiWorld className="text-xs" />
                  <span className="text-xs">Global</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute bottom-10 right-10 opacity-20">
        <div className="animate-bounce">
          <HiSparkles className="text-4xl text-yellow-400" />
        </div>
      </div>
      <div className="absolute top-20 right-20 opacity-20 animate-pulse">
        <FaFlask className="text-3xl text-blue-400" />
      </div>
    </footer>
  );
};

export default Footer;
