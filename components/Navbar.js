"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronDown,
} from "react-icons/fi";
import { IoReceiptSharp } from "react-icons/io5";
import {
  FaGithub,
  FaFlask,
  FaUserMd,
  FaTachometerAlt,
  FaFeatherAlt,
  FaStethoscope,
} from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { data: session, status } = useSession();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tests", href: "/tests" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const dropdownLinks = [
    { name: "Dashboard", href: "/dashboard", icon: FaTachometerAlt },
    { name: "Add Report", href: "/addreport", icon: FaFeatherAlt },
    { name: "Add Doctor", href: "/addDoctor", icon: FaUserMd },
    { name: "All Reports", href: "/report", icon: IoReceiptSharp },
    { name: "Doctor List", href: "/doctorlist", icon: FaStethoscope },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // User Profile Component with Premium Dropdown
  const UserProfile = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center cursor-pointer gap-3 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-2xl px-4 py-2.5 border border-white/20 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300 group"
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all">
            {session?.user?.image ? (
              <Image
              width={500}
              height={500}
                src={session.user.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">
                <FiUser className="text-white text-sm" />
              </div>
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
        </div>

        <div className="hidden sm:block text-left">
          <p className="text-gray-800 dark:text-gray-200 font-semibold text-sm">
            {session?.user?.name || session?.user?.email?.split("@")[0]}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-xs">
            {session?.user?.email}
          </p>
        </div>

        <FiChevronDown
          className={`text-gray-600 dark:text-gray-400 transition-transform duration-200 ${
            showDropdown ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Premium Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200/20 dark:border-gray-700/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                {session?.user?.image ? (
                  <Image
                  width={500}
                  height={500}
                    src={session.user.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">
                    <FiUser className="text-white" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-semibold">
                  {session?.user?.name || "User"}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="py-2">
            {dropdownLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 group"
                  onClick={() => setShowDropdown(false)}
                >
                  <IconComponent className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Sign Out Button */}
          <div className="border-t border-gray-200/20 dark:border-gray-700/20 pt-2">
            <button
              onClick={() => {
                signOut();
                setShowDropdown(false);
              }}
              className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group"
            >
              <FiLogOut className="text-lg group-hover:scale-110 transition-transform" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Premium Login Button
  const LoginButton = ({ isMobile = false }) => (
    <button
      onClick={() => signIn("github")}
      className={`relative cursor-pointer overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group ${
        isMobile ? "w-full" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <FaGithub className="text-xl group-hover:rotate-12 transition-transform duration-300 relative z-10" />
      <span className="font-semibold relative z-10">Sign in with GitHub</span>
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
    </button>
  );

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-xl border-b border-white/10 dark:border-gray-700/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Premium Logo */}
          <Link href="/" className="group">
            <div className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-violet-700 text-transparent bg-clip-text hover:scale-105 transition-all duration-300 relative">
              Global Labs
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 py-2 px-1"
                >
                  {link.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-600 group-hover:w-full transition-all duration-300 rounded-full"></span>
              </li>
            ))}
          </ul>

          {/* Desktop Auth Section */}
          <div className="hidden lg:block">
            {status === "loading" ? (
              <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <UserProfile />
            ) : (
              <LoginButton />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 hover:bg-white/20 dark:hover:bg-gray-700/40 transition-all duration-300"
          >
            {isOpen ? (
              <FiX size={24} className="text-gray-900 dark:text-white" />
            ) : (
              <FiMenu size={24} className="text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Premium Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-t border-gray-200/20 dark:border-gray-700/20 shadow-2xl">
          <div className="px-6 py-6 space-y-6">
            {/* Mobile Navigation Links */}
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="block text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 py-3 px-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200/20 dark:border-gray-700/20 pt-6">
              {status === "loading" ? (
                <div className="flex justify-center">
                  <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : session ? (
                <div className="space-y-4">
                  {/* Mobile User Info */}
                  <div className="flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                      {session?.user?.image ? (
                        <Image
                        width={500}
                        height={500}
                          src={session.user.image}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center">
                          <FiUser className="text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-800 dark:text-gray-200 font-semibold">
                        {session?.user?.name ||
                          session?.user?.email?.split("@")[0]}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>

                  {/* Mobile Quick Links */}
                  <div className="grid grid-cols-2 gap-3">
                    {dropdownLinks.slice(0, 4).map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="flex flex-col items-center gap-2 p-4 bg-white/50 dark:bg-gray-800/30 rounded-xl border border-white/20 hover:bg-white/70 dark:hover:bg-gray-700/50 transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <IconComponent className="text-xl text-blue-600" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {link.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Mobile Sign Out */}
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FiLogOut className="text-lg" />
                    <span className="font-semibold">Sign Out</span>
                  </button>
                </div>
              ) : (
                <LoginButton isMobile={true} />
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
