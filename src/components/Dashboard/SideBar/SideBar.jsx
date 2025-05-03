import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";

export default function SideBar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  return (
    <div className="fixed flex flex-col top-14 left-0 w-14 md:w-64 bg-blue-900 h-full text-black transition-all duration-300 border-none z-10 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-3">
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-blue-800 border-l-4 border-blue-500 pr-6" : ""
            }
            to={`/dashboard`}
          >
            <li>
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 border-l-4 border-transparent hover:border-blue-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>

                <span className="ml-2 text-white text-sm tracking-wide truncate">
                  Dashboard
                </span>
              </p>
            </li>
          </NavLink>
          <NavLink
            to={`/question-types`}
            className={({ isActive }) =>
              isActive ? "bg-blue-800 border-l-4 border-blue-500 pr-6" : ""
            }
          >
            <li>
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 border-l-4 border-transparent hover:border-blue-500  pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </span>

                <span className="ml-2 text-sm tracking-wide truncate text-white">
                  Questions
                </span>
              </p>
            </li>
          </NavLink>
          <NavLink
            to={`/bundle-questions`}
            className={({ isActive }) =>
              isActive ? "bg-blue-800 border-l-4 border-blue-500 pr-6" : ""
            }
          >
            <li>
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 border-l-4 border-transparent hover:border-blue-500  pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-white">
                  Bundle Question
                </span>
              </p>
            </li>
          </NavLink>
          {/* <NavLink
            to={`/exam-history`}
            className={({ isActive }) =>
              isActive ? "bg-blue-800 border-l-4 border-blue-500 pr-6" : ""
            }
          >
            <li>
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800  border-l-4 border-transparent hover:border-blue-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-white">
                  Exam History
                </span>
              </p>
            </li>
          </NavLink> */}
          <NavLink
            to={`/tutorials`}
            className={({ isActive }) =>
              isActive ? "bg-blue-800 border-l-4 border-blue-500 pr-6" : ""
            }
          >
            <li>
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 border-l-4 border-transparent hover:border-blue-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-white">
                  Tutorials
                </span>
              </p>
            </li>
          </NavLink>
          <NavLink
            to={`/profile/${user ? encodeURIComponent(user.email) : ""}`}
            className={({ isActive }) =>
              isActive ? "bg-blue-800 border-l-4 border-blue-500 pr-6" : ""
            }
          >
            <li>
              <p className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 border-l-4 border-transparent hover:border-blue-500 pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate text-white">
                  Profile
                </span>
              </p>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
