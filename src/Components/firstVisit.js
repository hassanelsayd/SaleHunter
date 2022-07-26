import React from "react";
import img from "../Assets/Images/sign_in_pop_up.png";
import googleButton from "../Assets/Images/download-app.svg";
import "../styles/first-visit.css";
import desktop from "../Assets/Images/microsoftstore.png";
const ar = localStorage["ar"];
const dark = localStorage["darkMode"];
const FirstVisit = () => {
  const closeFirstVisit = () => {
    document.querySelector(".first-visit").classList.remove("active");
  };

  return (
    <div className={`first-visit ${dark ? "dark" : ""}`}>
      <div className="first-visit-overlay"></div>

      <div className="first-visit-box">
        <svg
          onClick={() => closeFirstVisit()}
          xmlns="http://www.w3.org/2000/svg"
          className="first-visit-close"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h2 className={`first-visit-title t-center ${ar ? "ar" : ""}`}>
          {ar ? "يمكنك تحميل تطبيقاتنا الآن" : "You can download our app now!"}
        </h2>

        <img
          className="first-visit-main-img"
          src={img}
          alt="download our app"
          title="download our app"
        />
        <a
          href="https://dl.dropbox.com/s/ngpkzr4al8xx6ul/SaleHunter%20v0.7.5%20Pre-Alpha.apk"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="first-visit-store-img"
            src={googleButton}
            alt="get on google play"
            title="get on google play"
            style={{ width: "80%" }}
          />
        </a>

        <a
          href="https://github.com/Abdelhadyelsaid/Desktop_App"
          target="_blank"
          rel="noreferrer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="first-visit-store-img"
            src={desktop}
            alt="get on microsoft store"
            title="get on microsoft store"
            style={{ width: "70%" }}
          />
        </a>
      </div>
    </div>
  );
};

export default FirstVisit;
