import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../contexts/authContext";
import bgImage from "../../../src/assets/login.jpeg";

export default function Signup() {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const signUpHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const dateOfBirth = form.date_of_birth.value;
    const address = form.address.value;
    const gender = form.gender.value;
    const password = form.password.value;
    const confirm_password = form.confirm_password.value;

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirm_password === ""
    ) {
      return toast.error("Required field must be given");
    }

    if (phone.length !== 11) {
      return toast.error("Phone number must contain 11 digits");
    }

    if (password.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (password !== confirm_password) {
      return toast.error("Password doesn't match!");
    }

    setLoading(true);

    try {
      // Upload user to backend
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("address", address);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("confirm_password", confirm_password);
      if (photo) {
        formData.append("photo", photo);
      }

      const response = await fetch(
        "https://language-learning-platform-server.onrender.com/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        const userCredential = await createUser(email, password);
        toast.success("Registration successful!");
        navigate("/login", {
          state: {
            successMessage:
              "Registration successful. Please login to continue.",
          },
        });
      } else {
        toast.error(data.message || "Server error");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col w-full min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="max-w-2xl mx-auto rounded-xl bg-black bg-opacity-30 shadow-lg backdrop-blur-2xl p-16">
        <div className="flex flex-col items-center">
          <img
            className="rounded-full"
            src="/Resource/logo (1).png"
            width={350}
            alt=""
            srcSet=""
          />
        </div>
        <form onSubmit={signUpHandler}>
          <div className="flex justify-center mb-4"></div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="text"
                name="name"
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg w-full p-3"
                placeholder="name"
              />
            </div>
            <div>
              <label
                htmlFor="profile_photo"
                className="block mb-2 text-sm font-medium text-white"
              >
                Profile Photo
              </label>
              <input
                type="file"
                name="profile_photo"
                onChange={handlePhotoChange}
                // onChange={getBase64}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2 "
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                placeholder="email"
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-white"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg p-2.5"
                  placeholder="+88"
                  disabled
                />
                <input
                  type="number"
                  name="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm  rounded-r-lg w-full p-2.5 "
                  placeholder="phone-no"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-white"
              >
                Gender
              </label>
              <select
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm p-[11px] w-full rounded-lg"
                name="gender"
              >
                <option value="">Choose Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block mb-2 text-sm font-medium text-white"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-3 "
                placeholder="•••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm password <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="password"
                name="confirm_password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3 "
                placeholder="•••••••••"
              />
            </div>
          </div>

          <div className="flex justify-between items-center gap-12">
            <div className="my-4 w-full">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-white"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-3"
                placeholder="address"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4 gap-2 justify-between ">
            {loading ? (
              <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                <span className="loading loading-spinner loading-sm text-[#fff]"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Register
              </button>
            )}

            <label
              htmlFor="remember"
              className="ml-2 text-sm font-medium text-white"
            >
              Already registered?{" "}
              <Link to={`/login`} className="text-blue-400">
                Login
              </Link>
            </label>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
