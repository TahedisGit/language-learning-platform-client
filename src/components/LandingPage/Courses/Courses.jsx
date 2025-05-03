import React from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow p-10 mt-8 text-black">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-semibold mt-4">Our Courses</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Kids & Teens", lessons: 39 },
            { title: "Communicative English", lessons: 21 },
            { title: "IELTS", lessons: 21 },
            { title: "Corporate English", lessons: 21 },
          ].map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold">{course.title}</h3>
              <p className="mt-2">{course.lessons} Free lessons</p>
              <p className="mt-2">
                Read and listen to English at the same time
              </p>
              <p className="mt-2">Earn a certificate upon completion</p>
              <Link className="" to={"/course-details"}>
                <button className="btn btn-accent w-1/2 mt-3">Explore</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
