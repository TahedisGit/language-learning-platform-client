import React from "react";
import HeaderLand from "../HeaderLand/HeaderLand.jsx";
import FooterLand from "../FooterLand/FooterLand.jsx";
import { Link } from "react-router-dom";

const courseDetails = {
  courseName: "Communicative English",
  Classes: 12,
  Videos: 48,
  Exams: 4,
  "Reading Questions": 120,
  "Listening Questions": 80,
  "Course Price": "$49.99",
  "Success Rate": "92%",
};

const CourseDetails = () => {
  return (
    <>
      <HeaderLand></HeaderLand>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-4xl mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
          {/* Course Name */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            {courseDetails.courseName}
          </h2>

          {/* Course Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            {Object.entries(courseDetails).map(([label, value]) => {
              if (label === "courseName") return null; // skip showing courseName here
              return (
                <div key={label} className="bg-base-200 p-4 rounded-lg shadow">
                  <p className="font-semibold">{label}</p>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>

          {/* Enroll Button */}
          <div className="mt-8 text-center">
            <Link>
              <button className="btn bg-green-700 hover:bg-green-800 text-white px-8">
                Enroll Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <FooterLand></FooterLand>
    </>
  );
};

export default CourseDetails;
