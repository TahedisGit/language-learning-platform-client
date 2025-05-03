import React, { useEffect, useState } from "react";
import Header from "../Dashboard/Header/Header";
import SideBar from "../Dashboard/SideBar/SideBar";
import { Link, useLocation } from "react-router-dom";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const selectedType = location.state?.type;
  const [filteredPackages, setFilteredPackages] = useState([]);

  useEffect(() => {
    fetch(
      "https://language-learning-platform-server.onrender.com/get-all-packages"
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log("raw fetched response:", data);

        const allPackages = data.flatMap((doc) => doc.packages || []);
        // console.log("all packages:", allPackages);
        setPackages(allPackages || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedType && packages.length > 0) {
      const filtered = packages.filter((pkg) => pkg.type === selectedType);
      setFilteredPackages(filtered);
    }
  }, [packages]);

  return (
    <>
      <Header />
      <SideBar />
      <div className="flex flex-col">
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
          {/* plans */}
          <div className="flex flex-col items-center justify-center ">
            <h1 className="text-4xl text-center p-4">Reading Packages</h1>
            <div className=" bg-white flex justify-center w-1/2">
              <button className=" rounded-none rounded-l-lg p-2 md:p-4 bg-blue-700 text-white hover:bg-blue-400 active:bg-teal-600">
                Basic
              </button>
              <button className=" rounded-none border border-x-lime-600 p-2 md:p-4 bg-blue-700 text-white hover:bg-blue-400 active:bg-teal-600">
                Intermediate
              </button>
              <button className=" rounded-none rounded-r-lg p-2 md:p-4  bg-blue-700 text-white hover:bg-blue-400 active:bg-teal-600">
                Advance
              </button>
            </div>
          </div>
          {/* questions */}
          <div className="p-4 flex flex-col gap-4 justify-center items-center">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-[300px]">
                <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-500 font-semibold text-lg animate-pulse">
                  Loading Packages...
                </p>
              </div>
            ) : filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <div
                  key={pkg.package_id}
                  className="w-10/12 hover:scale-105 duration-500 p-4 rounded-lg bg-green-100 shadow-indigo-300 shadow-md"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-gray-900 text-lg font-bold">
                        {pkg.name}
                      </h2>
                      <p className="text-sm text-gray-600 capitalize">
                        Total {pkg.questions.length} questions
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* <h3 className="mt-2 md:text-xl font-bold text-yellow-500 text-left">
                        BDT 150
                      </h3> */}
                      <Link to={`/questions`}>
                        <button
                          className="text-sm p-2 bg-blue-700 text-white rounded-lg hover:bg-yellow-300 transition-all"
                          onClick={() => {
                            localStorage.setItem(
                              "packageData",
                              JSON.stringify(pkg)
                            );
                          }}
                        >
                          View Questions
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No packages available for the selected type.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
