import Header from "./Header/Header";
import SideBar from "./SideBar/SideBar";
import { TbSum, TbSquareRoot, TbMathAvg } from "react-icons/tb";
import { FaPercentage } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getAuth } from "firebase/auth";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const location = useLocation();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      if (!currentUser || !currentUser.email) return;
      try {
        const response = await axios.get(
          `https://language-learning-platform-server.onrender.com/get-exam-history`,
          {
            params: {
              studentId: currentUser.email,
            },
          }
        );
        setStudentData(response.data);
      } catch (error) {
        // console.error("Failed to fetch student data:", error);
        setStudentData({ student_id: currentUser.email, exams: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [currentUser]);

  useEffect(() => {
    if (location.state?.successMessage) {
      toast.success(location.state.successMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  const totalExams = studentData?.exams?.length || 0;
  const passedExams =
    studentData?.exams?.filter((e) => e.status === "passed").length || 0;
  const failedExams =
    studentData?.exams?.filter((e) => e.status === "failed").length || 0;
  const successRate = totalExams
    ? ((passedExams / totalExams) * 100).toFixed(0)
    : 0;

  const lineChartData =
    studentData?.exams?.map((exam, index) => ({
      name: `Exam ${index + 1}`,
      score: exam.score,
    })) || [];

  const pieChartData = totalExams
    ? [
        { name: "Passed", value: passedExams },
        { name: "Failed", value: failedExams },
      ]
    : [];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <>
      <Header />
      <SideBar />
      <div className="flex flex-col">
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64 px-4">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
            <StatCard icon={<TbSum />} title="Total Exams" value={totalExams} />
            <StatCard
              icon={<TbSquareRoot />}
              title="Passed Exams"
              value={passedExams}
            />
            <StatCard
              icon={<TbMathAvg />}
              title="Failed Exams"
              value={failedExams}
            />
            <StatCard
              icon={<FaPercentage />}
              title="Success Rate"
              value={successRate + "%"}
            />
          </div>

          {/* Latest Exams Section */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Your Latest Exams
            </h2>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-200">
              {studentData?.exams?.length === 0 ? (
                <li className="text-red-900">No exams taken yet.</li>
              ) : (
                studentData?.exams
                  ?.slice(-3)
                  .reverse()
                  .map((exam) => (
                    <li key={exam.exam_id}>
                      📘 {exam.package_name} -{" "}
                      <span
                        className={`font-medium ${
                          exam.status === "passed"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {exam.status.charAt(0).toUpperCase() +
                          exam.status.slice(1)}
                      </span>
                    </li>
                  ))
              )}
            </ul>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
            {/* Line Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Performance History
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Pass vs Fail
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Motivation Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-6 shadow text-center">
            <h3 className="text-xl font-semibold mb-2">
              “Learning never exhausts the mind.”
            </h3>
            <p className="text-sm">– Leonardo da Vinci</p>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-blue-500 dark:bg-gray-800 shadow-lg rounded-md flex items-center justify-between p-4 border-b-4 border-blue-600 dark:border-gray-600 text-white font-medium group">
      <div className="flex justify-center items-center w-14 h-14 bg-white text-black text-3xl rounded-full transition-all duration-300 transform group-hover:rotate-12">
        {icon}
      </div>
      <div className="text-right">
        <p className="text-2xl font-extrabold">{value}</p>
        <p>{title}</p>
      </div>
    </div>
  );
}
