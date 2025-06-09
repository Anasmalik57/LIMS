"use client";
import React, { useState } from "react";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader,
} from "react-icons/fi";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: "Message sent successfully! We'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(result.error || "Something went wrong");
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: error.message || "Failed to send message. Please try again.",
      });
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email",
      value: "imrantyagi201@gmail.com",
      link: "mailto:imrantyagi201@gmail.com",
    },
    {
      icon: FiPhone,
      title: "Phone",
      value: "+91 9084648712",
      link: "tel:+919084648712",
    },
    {
      icon: FiMapPin,
      title: "Location",
      value: "Shekpuri Roorkee  Haridwar (U.K)",
      link: "https://maps.app.goo.gl/CoQ7Co9PXTx7S6dJ8",
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "#", color: "hover:text-gray-800" },
    { icon: FaLinkedin, href: "#", color: "hover:text-blue-600" },
    { icon: FaTwitter, href: "#", color: "hover:text-blue-400" },
    { icon: FaInstagram, href: "#", color: "hover:text-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-violet-700 text-transparent bg-clip-text">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? We&#39;d love to hear from
            you. Send us a message and we&#39;ll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information Card */}
          <div className="space-y-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.link}
                      className="flex items-center gap-4 p-4 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-violet-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-white text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {info.title}
                        </p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className={`w-12 h-12 bg-white/50 dark:bg-gray-700/50 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                      >
                        <IconComponent className="text-lg" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/30">
                  <div className="text-center">
                    <FaPaperPlane className="text-4xl text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Quick Response
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Send Message
              </h2>

              {/* Status Messages */}
              {(status.success || status.error) && (
                <div
                  className={`p-4 rounded-2xl flex items-center gap-3 ${
                    status.success
                      ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                      : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                  }`}
                >
                  {status.success ? (
                    <FiCheckCircle className="text-xl" />
                  ) : (
                    <FiAlertCircle className="text-xl" />
                  )}
                  <span className="font-medium">{status.message}</span>
                </div>
              )}

              {/* Name Input */}
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Email Input */}
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Subject Input */}
              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative group">
                <FiMessageSquare className="absolute left-4 top-6 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-3 font-semibold">
                  {status.loading ? (
                    <FiLoader className="text-xl animate-spin" />
                  ) : (
                    <FiSend className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                  <span>{status.loading ? "Sending..." : "Send Message"}</span>
                </div>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
