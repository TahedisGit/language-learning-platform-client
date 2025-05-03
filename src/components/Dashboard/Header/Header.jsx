import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../contexts/authContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const { logOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const logoutHandler = () => {
    logOutUser()
      .then(() => {
        navigate("/", {
          state: { successMessage: "Successfully logged out." },
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong! Please try again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUser?.email) return;

      try {
        const res = await axios.get(
          `https://language-learning-platform-server.onrender.com/profile?email=${currentUser.email}`
        );
        setUserData(res.data);
      } catch (error) {
        console.error("Failed to fetch header user data", error);
      }
    };

    fetchUserData();
  }, [currentUser]);
  // console.log("userData", userData);

  return (
    <div className="fixed w-full flex items-center shadow-blue-800 justify-between h-14 text-white z-10">
      <div className="flex items-center justify-start pl-3 w-14 md:w-80 h-14 bg-blue-800">
        <img
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover mr-2"
          src={
            userData?.photoURL
              ? `https://language-learning-platform-server.onrender.com${userData.photoURL}`
              : "https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
          }
          alt="profile"
        />
        <span className="hidden md:block">{userData?.name || "USER"}</span>
      </div>

      <div className="flex justify-end h-14 bg-blue-800 w-full">
        <a
          onClick={logoutHandler}
          className="flex items-center mr-4 cursor-pointer hover:text-blue-100"
        >
          <span className="inline-flex mr-1">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </span>
          Logout
        </a>
      </div>
    </div>
  );
}
