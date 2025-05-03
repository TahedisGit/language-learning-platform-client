import React from "react";
import { Link } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import SideBar from "../Dashboard/SideBar/SideBar";
import { FcReading } from "react-icons/fc";
import { FcReadingEbook } from "react-icons/fc";

export default function QuestionTypes() {
  return (
    <>
      <Header />
      <SideBar />
      <div className="flex flex-col">
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
          <h1 className="text-2xl text-center font-bold uppercase mt-10  p-8">
            Choose package type
          </h1>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to={`/packages`} state={{ type: "reading" }}>
              <div className="flex items-center justify-center ">
                <div className=" w-60 md:w-80 rounded-2xl border border-[#1E40AF] shadow py-12 px-8 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">
                  <div className="flex justify-center">
                    <FcReading className="w-1/2 h-1/2" />
                  </div>
                  <p className="mt-10 w-full py-3 text-center bg-[#1E40AF] rounded-xl text-white ">
                    Reading Packages
                  </p>
                </div>
              </div>
            </Link>
            <Link to={`/packages`} state={{ type: "listening" }}>
              <div className="flex items-center justify-center ">
                <div className=" w-60 md:w-80 rounded-2xl border border-[#1E40AF] shadow py-12 px-8 hover:-translate-y-1 hover:shadow-2xl delay-75 duration-100">
                  <div className="flex justify-center">
                    <FcReadingEbook className="w-1/2 h-1/2" />
                  </div>
                  <p className="mt-10 w-full py-3 text-center bg-[#1E40AF] rounded-xl   text-white">
                    Listening Packages
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
