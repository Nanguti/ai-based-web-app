"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LucideIcon, Globe, BookOpen, Zap } from "lucide-react";

interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  icon: LucideIcon;
  iconColor: string;
  detail: string;
  tags: string[];
}

const News: React.FC = () => {
  const [activeNews, setActiveNews] = useState<number>(0);

  const newsItems: NewsItem[] = [
    {
      title: "AI Revolutionizing Healthcare",
      excerpt: "Breakthrough AI algorithms transforming patient diagnostics",
      date: "January 2024",
      icon: Globe,
      iconColor: "text-teal-400",
      detail:
        "Our advanced machine learning models are achieving unprecedented accuracy in early disease detection, reducing diagnostic errors and improving patient outcomes.",
      tags: ["Healthcare", "Machine Learning", "Innovation"],
    },
    {
      title: "Machine Learning in Finance",
      excerpt: "Predictive analytics reshaping investment strategies",
      date: "December 2023",
      icon: BookOpen,
      iconColor: "text-blue-500",
      detail:
        "Leveraging deep learning algorithms to analyze market trends, predict stock movements, and provide data-driven investment recommendations.",
      tags: ["Finance", "Predictive Analytics", "AI"],
    },
    {
      title: "Ethical AI Development",
      excerpt: "Our commitment to responsible and transparent AI",
      date: "November 2023",
      icon: Zap,
      iconColor: "text-purple-500",
      detail:
        "Implementing robust frameworks to ensure AI systems are unbiased, transparent, and aligned with human values and societal benefits.",
      tags: ["Ethics", "AI Governance", "Transparency"],
    },
  ];

  const handleNewsChange = (index: number): void => {
    setActiveNews(index);
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-black to-blue-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-transparent opacity-50" />

      <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* News Details */}
        <motion.div
          key={activeNews}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-4 mb-4">
            <h2 className="text-4xl font-bold text-white">
              {newsItems[activeNews].title}
            </h2>
          </div>

          <p className="text-xl text-blue-200 mb-4">
            {newsItems[activeNews].excerpt}
          </p>

          <p className="text-blue-300">{newsItems[activeNews].detail}</p>

          <div className="flex space-x-2 mt-4">
            {newsItems[activeNews].tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-4 mt-6">
            <span className="text-gray-400">{newsItems[activeNews].date}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700"
            >
              <span>Read More</span>
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* News Navigation */}
        <div className="space-y-4">
          {newsItems.map((news, index) => (
            <motion.div
              key={news.title}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => handleNewsChange(index)}
              className={`cursor-pointer p-6 rounded-xl transition-all duration-300 
                ${
                  activeNews === index
                    ? "bg-blue-900/60 border-2 border-teal-500"
                    : "bg-gray-900/40 hover:bg-blue-900/50"
                }
                backdrop-blur-sm flex items-center space-x-4`}
            >
              <div
                className={`p-3 rounded-full ${news.iconColor} bg-opacity-20`}
              >
                <news.icon size={32} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {news.title}
                </h3>
                <p className="text-blue-200 text-sm">{news.excerpt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
