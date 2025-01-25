"use client";

import React from "react";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      icon: Twitter,
      href: "https://twitter.com",
      color: "text-blue-400",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com",
      color: "text-blue-600",
    },
    {
      icon: Github,
      href: "https://github.com",
      color: "text-gray-300",
    },
    {
      icon: Mail,
      href: "mailto:contact@example.com",
      color: "text-red-500",
    },
  ];

  return (
    <footer className="bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">AI Solutions</h3>
            <p className="text-gray-300">
              Transforming industries through intelligent technology and
              innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`${social.color} hover:opacity-80`}
                >
                  <social.icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          © {new Date().getFullYear()} AI Solutions. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
