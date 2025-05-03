import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logoh.png";
import AuthContext from "../../../contexts/authContext";
import { Menu, X } from "lucide-react"; // optional: lucide icons for hamburger/close

const HeaderLand = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-blue-500 px-4 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        <NavLink className="flex items-center gap-2" to="/">
          <img className="w-8 h-8 rounded-full" src={logo} alt="logo" />
          <h1 className="text-white text-lg md:text-xl font-semibold whitespace-nowrap">
            Online English Learning
          </h1>
        </NavLink>

        {/* Hamburger Icon */}
        <button
          className="text-white md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center text-white">
          <ul className="flex gap-4 items-center">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-blue-200"
                }
                to="/faq"
              >
                FAQ's
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-blue-200"
                }
                to="/contact-us"
              >
                CONTACT US
              </NavLink>
            </li>

            {!user ? (
              <>
                <li>
                  <NavLink
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                    to="/signup"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 text-white">
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-blue-200"
                }
                to="/faq"
                onClick={toggleMenu}
              >
                FAQ's
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "font-bold" : "hover:text-blue-200"
                }
                to="/contact-us"
                onClick={toggleMenu}
              >
                CONTACT US
              </NavLink>
            </li>

            {!user ? (
              <>
                <li>
                  <NavLink
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded block text-center"
                    to="/login"
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded block text-center"
                    to="/signup"
                    onClick={toggleMenu}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded block text-center"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default HeaderLand;
