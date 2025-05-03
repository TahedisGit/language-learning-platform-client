import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logoh.png";
import AuthContext from "../../../contexts/authContext";

const HeaderLand = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  return (
    <header className="bg-blue-500 px-8 py-4 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between">
        <NavLink className="flex items-center gap-2" to="/">
          <img className="w-8 h-8 rounded-full" src={logo} alt="logo" />
          <h1 className="text-white text-xl font-semibold">
            Online English Learning
          </h1>
        </NavLink>

        <div className="flex items-center text-white">
          <ul className="menu-horizontal gap-4 px-1 items-center">
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
              <>
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                >
                  Dashboard
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderLand;
