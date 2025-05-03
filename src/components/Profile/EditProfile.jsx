import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function EditProfile() {
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null); // Store currentUser in state
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [photoFile, setPhotoFile] = useState(null);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Fetch profile data when currentUser is available
  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(
          `https://language-learning-platform-server.onrender.com/profile?email=${currentUser.email}`
        )
        .then((res) => {
          setFormData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("email", currentUser.email);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);

    if (photoFile) {
      formDataToSend.append("photo", photoFile);
    }

    try {
      const response = await axios.put(
        "https://language-learning-platform-server.onrender.com/profile/update",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("Profile updated successfully!");
        navigate(-1);
      } else {
        alert("Profile update failed.");
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Update Your Profile
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            name="name"
            placeholder="Name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            name="phone"
            placeholder="Phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            id="dateOfBirth"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium" htmlFor="gender">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            name="address"
            placeholder="Address"
            value={formData.address || ""}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium" htmlFor="photo">
            Profile Photo
          </label>
          <input
            id="photo"
            type="file"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-300"
            onChange={handleFileChange}
          />
        </div>

        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded w-full sm:w-auto"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
