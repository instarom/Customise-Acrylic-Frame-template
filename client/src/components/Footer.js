import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-500 mb-4">🎨 TuragStudio</h3>
            <p className="text-gray-400">
              Premium custom photo frames, acrylic frames, and home decor products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-amber-500">Home</a></li>
              <li><a href="/products" className="hover:text-amber-500">Products</a></li>
              <li><a href="/products?category=photo-frames" className="hover:text-amber-500">Photo Frames</a></li>
              <li><a href="/products?category=home-decor" className="hover:text-amber-500">Home Decor</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@turagstudio.com</li>
              <li>Phone: +91 XXXXX XXXXX</li>
              <li>Address: India</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 text-2xl">
                <FiFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 text-2xl">
                <FiInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 text-2xl">
                <FiTwitter />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-800" />
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2026 TuragStudio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
