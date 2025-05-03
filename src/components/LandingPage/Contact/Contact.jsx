import React from "react";
import HeaderLand from "../HeaderLand/HeaderLand";
import FooterLand from "../FooterLand/FooterLand";

const Contact = () => {
  return (
    <>
        <HeaderLand></HeaderLand>
        <div className="bg-gray-100 min-h-screen flex justify-center items-center mt-8 px-4">
            <div className="w-full max-w-4xl bg-white shadow-md p-8 rounded-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact us</h2>
              <p className="text-gray-600 text-lg mb-2">
                Use this form to send us a question, suggestion, or comment.
              </p>
              <p className="text-gray-700 font-semibold">
                You may also send an email to{" "}
                <a
                  href="mailto:onlinelearning@hotmail.com"
                  className="text-blue-600 underline"
                >
                  onlinelearning@hotmail.com
                </a>{" "}
                for a faster response.
              </p>

              <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Your email"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium text-gray-700">Message</label>
                  <textarea
                    className="textarea textarea-bordered w-full h-40 resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <div className="md:col-span-2 flex justify-center">
                  <button
                    type="submit"
                    className="btn bg-blue-600 hover:bg-blue-800 text-white shadow-md px-6"
                  >
                    SUBMIT MESSAGE
                  </button>
                </div>
              </form>
            </div>
        </div>

        <FooterLand></FooterLand>
    
    
    
    </>
    
  );
};

export default Contact;
