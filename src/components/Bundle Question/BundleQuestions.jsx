import Header from "../Dashboard/Header/Header";
import SideBar from "../Dashboard/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function BundleQuestions() {
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBundle, setSelectedBundle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBundles = async () => {
      try {
        const res = await fetch(
          "https://language-learning-platform-server.onrender.com/get-all-bundles"
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        const allBundles = data[0]?.bundles || [];
        // console.log("Extracted Bundles:", allBundles);

        const storedPurchases =
          JSON.parse(localStorage.getItem("purchasedBundles")) || [];

        const updatedBundles = allBundles.map((bundle) => ({
          ...bundle,
          isPurchased: storedPurchases.includes(bundle.bundleId),
        }));

        setBundles(updatedBundles);
      } catch (error) {
        console.error("🔥 Failed to fetch bundles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBundles();
  }, []);

  const handlePurchaseClick = (bundle) => {
    setSelectedBundle(bundle);
    setShowModal(true);
  };

  const confirmPayment = () => {
    setBundles((prev) =>
      prev.map((b) =>
        b.bundleId === selectedBundle.bundleId ? { ...b, isPurchased: true } : b
      )
    );

    const storedPurchases =
      JSON.parse(localStorage.getItem("purchasedBundles")) || [];
    if (!storedPurchases.includes(selectedBundle.bundleId)) {
      storedPurchases.push(selectedBundle.bundleId);
      localStorage.setItem("purchasedBundles", JSON.stringify(storedPurchases));
    }

    setShowModal(false);
    alert(`You have successfully purchased "${selectedBundle.bundleName}"!`);
  };

  const handleViewQuestions = (packageId) => {
    const fetchPackage = async () => {
      try {
        const res = await fetch(
          `https://language-learning-platform-server.onrender.com/packages/${packageId}`
        );
        const data = await res.json();

        // console.log("Fetched packageData:", data);
        localStorage.setItem("packageData", JSON.stringify(data));

        navigate("/questions");
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackage();
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="flex flex-col">
        <div className="h-full my-20 flex justify-center ml-14 md:ml-64">
          <div className="w-10/12">
            <p className="font-semibold text-4xl text-center">
              Choose your favorite bundle
            </p>
            <div className="py-5 flex flex-col gap-4">
              {loading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <p>Loading...</p>
                </div>
              ) : (
                bundles.map((bundle, index) => (
                  <details className="group" key={index}>
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <div className="w-full rounded-none p-4 bg-green-100 shadow-md">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                          <div>
                            <h2 className="text-lg font-bold text-gray-900">
                              {bundle.bundleName}
                            </h2>
                            <h2 className="text-xs font-semibold text-gray-600">
                              {bundle.packages.length} question set
                            </h2>
                          </div>
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {bundle.currency} {bundle.price}
                              </h3>
                              <h1 className="text-xs text-green-700">
                                One-time purchase
                              </h1>
                            </div>
                            {bundle.isPurchased ? (
                              <button className="text-sm p-2 bg-gray-500 text-white rounded-lg cursor-not-allowed">
                                Purchased
                              </button>
                            ) : (
                              <button
                                className="text-sm p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-500"
                                onClick={() => handlePurchaseClick(bundle)}
                              >
                                Purchase Now
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </summary>

                    <div className="flex flex-col justify-center items-center gap-4 mt-4">
                      {bundle.packages.map((pkg, pkgIndex) => (
                        <div
                          key={pkgIndex}
                          className="w-10/12 p-4 rounded-lg bg-gray-100 shadow-md flex justify-between items-center"
                        >
                          <h2 className="text-md font-semibold text-gray-900">
                            {pkg.packageName}
                          </h2>
                          {bundle.isPurchased && (
                            <button
                              onClick={() => handleViewQuestions(pkg.packageId)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-sm"
                            >
                              View Questions
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && selectedBundle && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Confirm Purchase
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to purchase{" "}
              <span className="font-semibold text-blue-700">
                {selectedBundle.bundleName}
              </span>{" "}
              for{" "}
              <span className="font-semibold">
                {selectedBundle.currency} {selectedBundle.price}
              </span>
              ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={confirmPayment}
              >
                Confirm & Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
