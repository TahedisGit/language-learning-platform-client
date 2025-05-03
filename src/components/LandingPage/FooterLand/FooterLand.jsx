import React from "react";
import fb from "../../../assets/fb.png";
import insta from "../../../assets/insta.png";
import group from "../../../assets/Group.png";
import linkedin from "../../../assets/Linkedin.png";

const FooterLand = () => {
  return (
    <div>
      <footer className="w-full flex flex-col items-center text-center mt-10  bg-blue-400 text-primary-content p-10">
        <aside>
          <p className="font-bold">
            Online English Language
            <br />
            Providing Quality Education since 2025
          </p>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-5 mt-4">
            <a href="">
              <img src={fb} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="">
              <img src={insta} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="">
              <img src={group} alt="Group" className="w-6 h-6" />
            </a>
            <a href="">
              <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
            </a>
          </div>
        </aside>
      </footer>
    </div>
  );
};

export default FooterLand;
