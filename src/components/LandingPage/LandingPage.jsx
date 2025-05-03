import React from "react";
import { NavLink } from "react-router-dom";
import HeaderLand from "./HeaderLand/HeaderLand";
import FooterLand from "./FooterLand/FooterLand";
import Reviews from "./Reviews/Reviews";
import Courses from "./Courses/Courses";
import banner from "../../../src/assets/banner.jpeg";

import {
  HiCheck,
  HiUserGroup,
  HiPlay,
  HiExclamation,
  HiChartBar,
  HiUpload,
  HiClock,
  HiSupport,
} from "react-icons/hi";

const features = [
  {
    icon: <HiCheck className="h-6 w-6 text-gray-500" />,
    text: "Personalized learning paths based on your goals",
  },
  {
    icon: <HiUserGroup className="h-6 w-6 text-gray-500" />,
    text: "Interactive reading and listening exercises",
  },
  {
    icon: <HiPlay className="h-6 w-6 text-gray-500" />,
    text: "Engaging video tutorials to support your lessons",
  },
  {
    icon: <HiExclamation className="h-6 w-6 text-gray-500" />,
    text: "Timed exams to simulate real test conditions",
  },
  {
    icon: <HiChartBar className="h-6 w-6 text-gray-500" />,
    text: "Instant results to track your progress",
  },
  {
    icon: <HiUpload className="h-6 w-6 text-gray-500" />,
    text: "Performance dashboard to monitor improvement",
  },
  {
    icon: <HiClock className="h-6 w-6 text-gray-500" />,
    text: "Learn anytime, anywhere at your own pace",
  },
  {
    icon: <HiSupport className="h-6 w-6 text-gray-500" />,
    text: "Guidance from real teachers when needed",
  },
];

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <HeaderLand />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 mt-24 text-black">
        {/* banner section */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <img
              className="w-full md:w-1/2 rounded-lg object-cover"
              src={banner}
              alt="banner"
            />
            <div className="flex flex-col justify-center text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-4">
                Speak with Confidence,
                <br /> Learn with Ease!
              </h2>
              <p className="text-gray-600 text-base mt-4">
                IMPROVE YOUR ENGLISH
              </p>
              <p className="text-gray-600 text-sm">
                Reading, Writing, Listening, Speaking
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="p-6 mt-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Why Learn With Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-3xl">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start bg-white p-4 rounded-lg shadow-sm"
              >
                {feature.icon}
                <span className="ml-3 text-sm sm:text-base">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <Courses />

        {/* Review Section */}
        <Reviews />
      </main>

      {/* Footer */}
      <FooterLand />
    </div>
  );
};

export default LandingPage;
