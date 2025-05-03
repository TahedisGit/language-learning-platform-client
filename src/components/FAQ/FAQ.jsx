import React, { useEffect, useState } from "react";
import FooterLand from "../LandingPage/FooterLand/FooterLand";
import HeaderLand from "../LandingPage/HeaderLand/HeaderLand";
import axios from "axios";

const FAQ = () => {
  const [faqData, setFaqData] = useState([]); // State to hold FAQ data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(
          "https://language-learning-platform-server.onrender.com/get-faqs"
        );
        if (Array.isArray(response.data)) {
          setFaqData(response.data);
        } else {
          console.error(
            "Expected an array of FAQs, but received:",
            response.data
          );
        }
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        console.error("Error fetching FAQs:", error); // Log any errors
        setLoading(false); // Stop loading if there's an error
      }
    };

    fetchFaqs(); // Call the function to fetch data
  }, []); // Empty dependency array to run the effect only once on component mount

  if (loading) {
    return <p className="text-center text-gray-600">Loading FAQs...</p>;
  }

  return (
    <>
      <HeaderLand />
      <div className="bg-gray-100 min-h-screen flex justify-center mt-7 py-10 px-6">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Frequently Asked Questions - FAQs
            </h1>
          </div>

          <div className="mt-6 space-y-6">
            {Array.isArray(faqData) && faqData.length > 0 ? (
              faqData.map((faq, index) => (
                <div
                  key={index}
                  className="collapse collapse-plus bg-white shadow-md p-4 rounded-lg"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-semibold text-gray-800">
                    {faq.question}
                  </div>
                  <div className="collapse-content text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No FAQs available</p>
            )}
          </div>
        </div>
      </div>
      <FooterLand />
    </>
  );
};

export default FAQ;
