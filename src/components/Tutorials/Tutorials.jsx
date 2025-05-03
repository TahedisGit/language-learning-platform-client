import React from "react";
import Header from "../Dashboard/Header/Header";
import SideBar from "../Dashboard/SideBar/SideBar";
import TutorialSection from "./TutorialSection";

const Tutorials = () => {
  const grammarVideos = [
    "3hdrnI8ZeE8?si=SWym-yaYtHioSmir",
    "gSI_SVQf1H4?si=HaTvj1mXj4dnhIbl",
    "FMuSq6aZMkc?si=NNkMFB9oNHWKs0A7",
    "pECzOYjVeaI?si=C6zceHNkG2zmKpdh",
  ];
  const vocabularyVideos = [
    "v9mbKrx0OS8?si=TMIWzppE_GNA2CXZ",
    "OMQkGdEZ3r8?si=nS7n6V2cfMm8tkcI",
    "NqYCRWxoQLA?si=V3wgKDAjqT2ujz0Q",
  ];
  const pronunciationVideos = [
    "hMbL3PoQJ_0?si=MsDKcYjfR-rowgtm",
    "QrRyrHFEmEE?si=MvOfp-sM2yQj9tuf",
    "EeToarNceeM?si=6frDZLDlCiLyY-jy",
  ];

  return (
    <>
      <Header></Header>
      <SideBar></SideBar>
      <div className="flex flex-col">
        <div className="h-full ml-14 mt-14 mb-10 md:ml-64">
          <h1 className="text-4xl font-bold mt-4 mb-14 text-center text-blue-900">
            English Learning Tutorials
          </h1>

          <TutorialSection title="Grammar" videos={grammarVideos} />
          <TutorialSection title="Vocabulary" videos={vocabularyVideos} />
          <TutorialSection title="Pronunciation" videos={pronunciationVideos} />
        </div>
      </div>
    </>
  );
};

export default Tutorials;
