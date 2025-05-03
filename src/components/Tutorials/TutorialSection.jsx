import React from "react";

const TutorialSection = ({ title, videos }) => {
  return (
    <div className="mb-16 p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-800">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((videoId, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-xl transition-transform duration-300 hover:scale-[1.03]"
          >
            <figure className="aspect-video overflow-hidden rounded-t-xl">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`YouTube video player ${index}`}
                frameBorder="0"
                allowFullScreen
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="text-sm text-gray-600 text-center">
                Video {index + 1}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialSection;
