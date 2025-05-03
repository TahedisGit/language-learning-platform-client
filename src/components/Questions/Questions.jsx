import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Dashboard/Header/Header";
import SideBar from "../Dashboard/SideBar/SideBar";

export default function Questions() {
  const [packageData, setPackageData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPackageData = localStorage.getItem("packageData");
    if (storedPackageData) {
      setPackageData(JSON.parse(storedPackageData));
    }
  }, []);

  useEffect(() => {
    if (packageData) {
      setQuestions(packageData.questions);
      setLoading(false);
    }
  }, [packageData]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-blue-500 font-semibold text-lg animate-pulse">
          Loading Questions...
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <SideBar />
      <div className="flex flex-col">
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
          <div className="flex flex-col justify-center my-10 items-center">
            <div className="bg-blue-100 w-10/12 rounded-lg p-4">
              <h1 className="text-3xl text-gray-800">
                {packageData.name} - Questions
              </h1>
              <div className="flex gap-2">
                <h1 className="text-xs text-gray-700">Home -</h1>
                <h1 className="text-xs text-gray-700">
                  {packageData.name} - Questions
                </h1>
              </div>
            </div>
            <div className="flex flex-col w-10/12 mt-4 lg:flex-row justify-around">
              <div>
                <p className="text-2xl bg-teal-100 p-2 my-2 rounded-lg text-center">
                  {packageData.name} - {questions.length} questions
                </p>
                <div className="flex flex-col gap-4 shadow-md p-4">
                  {questions.map((question, index) => (
                    <Link
                      key={index}
                      to={`/exam`}
                      state={{
                        questions: questions,
                        questionIndex: index,
                        package_name: packageData.name,
                        package_id: packageData.package_id,
                      }} // Pass the question and index to the exam page
                    >
                      <div className="flex gap-2 md:gap-4 cursor-pointer p-3 bg-blue-100 hover:bg-teal-300 rounded-lg">
                        <p className="text-lg font-semibold">
                          {index + 1}. {question.questionText}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
