import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import Login from "../components/Login/Login";
import Signup from "../components/Signup/Signup";
import Profile from "../components/Profile/Profile";
import Exam from "../components/Exam/Exam";
import ExamHistory from "../components/Exam History/ExamHistory";
import BundleQuestions from "../components/Bundle Question/BundleQuestions";
import PrivateRoute from "./PrivateRoute";
import EditProfile from "../components/Profile/EditProfile";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import Tutorials from "../components/Tutorials/Tutorials";
import LandingPage from "../components/LandingPage/LandingPage";
import FAQ from "../components/FAQ/FAQ";
import QuestionTypes from "../components/Questions/QuestionTypes";
import Packages from "../components/Packages/Packages";
import Questions from "../components/Questions/Questions";
import ReviewExam from "../components/ReviewExam/ReviewExam";
import AdminLogin from "../components/Admin/AdminLogin";

import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
// import ManageQuestions from "../components/Admin/ManageQuestions";
import ManagePackages from "../components/Admin/ManagePackages";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import CourseDetails from "../components/LandingPage/Courses/CourseDetails";
import Contact from "../components/LandingPage/Contact/Contact";
// import ManageBundles from "../components/Admin/ManageBundles";
// import ManageUsers from "../components/Admin/ManageUsers";
// import Analytics from "../components/Admin/Analytics";

const ProtectedAdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("admin") === "true";
  return isAdmin ? children : <Navigate to="/admin-login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>Route not found</h2>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        ),
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "manage-packages",
            element: <ManagePackages />,
          },
        ],
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile/:email",
        element: <Profile />,
      },
      {
        path: "/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/exam",
        element: <Exam />,
      },
      {
        path: "/review-exam",
        element: <ReviewExam />,
      },
      {
        path: "/exam-history",
        element: <ExamHistory />,
      },
      {
        path: "/question-types",
        element: <QuestionTypes />,
      },
      {
        path: "/packages",
        element: <Packages />,
      },
      {
        path: "/questions",
        element: <Questions />,
      },
      {
        path: "/bundle-questions",
        element: <BundleQuestions />,
      },
      {
        path: "/tutorials",
        element: <Tutorials />,
      },
      {
        path: "/faq",
        element: <FAQ />,
      },
      {
        path: "course-details",
        element: <CourseDetails />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
    ],
  },
]);
export default router;
