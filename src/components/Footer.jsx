// components/Footer.jsx
import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Developer Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Developer
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              <span className="font-medium">Aditya Srivastava</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
              Full Stack Developer & AI Enthusiast
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/adityasrivastava29"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                title="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/adityakumar29"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                title="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:adityasri.in@gmail.com"
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                title="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Project Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About This Project
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              AI Persona Chat Application
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
              Built with React, Node.js, MongoDB & OpenAI
            </p>
            <div className="flex justify-center items-center space-x-1 text-xs text-gray-500 dark:text-gray-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>in India</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </h3>
            <div className="space-y-2">
              <div className="flex justify-center md:justify-end flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                  React
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                  Node.js
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                  MongoDB
                </span>
              </div>
              <div className="flex justify-center md:justify-end flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                  OpenAI
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                  Tailwind CSS
                </span>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
                  Express
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2025 Aditya Srivastava. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
