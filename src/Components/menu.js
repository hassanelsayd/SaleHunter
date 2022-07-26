import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/Images/Logo1.svg";
import downloadApp from "../Assets/Images/download-app.svg";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import "../styles/menu.css";

//import assets
import microsoft from "../Assets/Images/microsoftstore.png";

//local storage
const ar = localStorage.getItem("ar");

const Menu = (props) => {
  const expandMenu = () => {
    const menu = document.getElementById("menu");
    if (menu.classList.contains("expanded")) {
      menu.classList.remove("expanded");
    } else {
      menu.classList.add("expanded");
    }
  };

  return (
    <div className="menu" id="menu">
      <div className="menu-toggler">
        <svg
          onClick={expandMenu}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>

      <div className="menu-options">
        {/* First Menu Option "Home" */}
        <Link to="/">
          <div
            className={`menu-option ${props.from === "home" ? "active" : ""} ${
              ar ? "ar" : ""
            }`}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "الصفحة الرئيسيه" : "Home"}
            </h2>
          </div>
        </Link>

        {/* Second Menu Option "Dashboard" */}
        <Link to="/dashboard">
          {props.isLoggedIn && (
            <div
              className={`menu-option ${
                props.from === "dashboard" ? "active" : ""
              } ${ar ? "ar" : ""}`}
            >
              <div className="menu-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>
              <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "لوحة التحكم" : "Dashboard"}
              </h2>
            </div>
          )}
        </Link>

        {/* 3rd Menu Option "Profile" */}
        <Link to="/profile">
          <div
            className={`menu-option ${
              props.from === "profile" ? "active" : ""
            } ${ar ? "ar" : ""}`}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "الملف الشخصي" : "Profile"}
            </h2>
          </div>
        </Link>
        {/* forth Menu Option "sales" */}
        <Link to="/sales">
          {props.isLoggedIn && (
            <div
              className={`menu-option ${
                props.from === "sales" ? "active" : ""
              } ${ar ? "ar" : ""}`}
            >
              <div className="menu-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                  />
                </svg>
              </div>
              <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? " الخصومات" : "Sales"}
              </h2>
            </div>
          )}
        </Link>
        {/*  Menu Option "history" */}
        {props.isLoggedIn && (
          <Link to="/history">
            <div
              className={`menu-option ${
                props.from === "history" ? "active" : ""
              } ${ar ? "ar" : ""}`}
            >
              <div className="menu-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "السجل" : "History"}
              </h2>
            </div>
          </Link>
        )}

        {/* 4th Menu Option "Settings" */}
        <Link to="/settings">
          <div
            className={`menu-option ${
              props.from === "settings" ? "active" : ""
            } ${ar ? "ar" : ""}`}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "الإعدادات" : "Settings"}
            </h2>
          </div>
        </Link>

        {/* 5th Menu Option "about-us" */}
        <Link to="/about-us">
          <div
            className={`menu-option ${
              props.from === "about-us" ? "active" : ""
            } ${ar ? "ar" : ""}`}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? " معلومات عنا" : "About us"}
            </h2>
          </div>
        </Link>
        {/* 8th Menu Option "favourite" */}
        <Link to="/favourites" className="navbar-option">
          <div
            className={`menu-option  ${
              props.from === "favourites" ? "active" : ""
            } ${ar ? "ar" : ""}`}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "المفضلات" : "Favourites"}
            </h2>
          </div>
        </Link>

        {/* 9th Menu Option "Sales" */}
        <Link to="/sales" className="navbar-option">
          <div
            className={`menu-option  ${
              props.from === "sales" ? "active" : ""
            } ${ar ? "ar" : ""}`}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "العروض" : "Sales"}
            </h2>
          </div>
        </Link>

        {/* 11th Menu Option "Signup" */}

        {!props.isLoggedIn && (
          <Link to="/sign-up">
            <div
              className={`menu-option ${
                props.from === "signup" ? "active" : ""
              } ${ar ? "ar" : ""}`}
            >
              <div className="menu-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "انشاء حساب" : "Sign up"}
              </h2>
            </div>
          </Link>
        )}

        {/* 12th Menu Option "Login" */}
        {!props.isLoggedIn && (
          <Link to="sign-in">
            <div
              className={`menu-option ${
                props.from === "login" ? "active" : ""
              } ${ar ? "ar" : ""}`}
            >
              <div className="menu-option-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "تسجيل دخول" : "Login"}
              </h2>
            </div>
          </Link>
        )}
        {/* 13th Menu Option "Logout" */}
        {props.isLoggedIn && (
          <div
            className={`menu-option ${
              props.from === "logout" ? "active" : ""
            } ${ar ? "ar" : ""}`}
            onClick={() => {
              props.dispatch(logout());
              window.location.reload();
            }}
          >
            <div className="menu-option-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
            <h2 className={`menu-option-name ${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "تسجيل خروج" : "Logout"}
            </h2>
          </div>
        )}
      </div>
      <div className="adds">
        <img src={downloadApp} alt="download-app" />
        <img src={microsoft} alt="download-app" />
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
}
export default connect(mapStateToProps)(Menu);
