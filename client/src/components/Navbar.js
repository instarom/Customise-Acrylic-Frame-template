import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiShoppingCart, FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-amber-700">🎨 TuragStudio</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-amber-700">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-amber-700">
              Products
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-gray-700 hover:text-amber-700">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <FiShoppingCart className="text-2xl text-gray-700 hover:text-amber-700" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hi, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="turag-btn text-sm"
                >
                  <FiLogOut className="inline mr-2" /> Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link to="/login" className="turag-btn-secondary text-sm">
                  Login
                </Link>
                <Link to="/register" className="turag-btn text-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" className="block text-gray-700 hover:text-amber-700">
              Home
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-amber-700">
              Products
            </Link>
            <Link to="/cart" className="block text-gray-700 hover:text-amber-700">
              Cart ({cart.length})
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="turag-btn w-full text-left"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="block turag-btn-secondary text-center">
                  Login
                </Link>
                <Link to="/register" className="block turag-btn text-center">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
