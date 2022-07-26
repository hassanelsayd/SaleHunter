import React from "react";

// Import internal components
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
import { Helmet } from "react-helmet";

// import image
import img from "../Assets/Images/Forgot_password.svg";
import saleLight from "../Assets/Images/sale-light.PNG";
import saleDark from "../Assets/Images/sale-dark.PNG";
import systemTheme from "../Assets/Images/system-theme.jpg";

// import stylesheets
import "../styles/settings.css";

// import external components
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");
const Settings = (props) => {
  if (dark) {
    document.documentElement.style.background = "#101010";
    document.getElementById("root").style.background = "#101010";
  } else {
    document.documentElement.style = "";
    document.getElementById("root").style = "";
  }

  const changeLanguage = (lang) => {
    if (lang === "ar") {
      localStorage.setItem("ar", true);
      window.location.reload();
    } else if (lang === "en") {
      if (localStorage.getItem("ar")) {
        localStorage.removeItem("ar");
        window.location.reload();
      }
    }
  };
  const logout = () => {
    localStorage.removeItem("JWT");
    window.location.reload();
  };
  const clearData = () => {
    if (
      localStorage.getItem("ar") ||
      localStorage.getItem("darkMode") ||
      localStorage.getItem("JWT")
    ) {
      localStorage.removeItem("ar");
      localStorage.removeItem("darkMode");
      localStorage.removeItem("JWT");
      window.location.reload();
    }
  };

  const systemDependTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("darkMode", true);
      window.location.reload();
    } else {
      if (localStorage.getItem("darkMode")) {
        localStorage.removeItem("darkMode", true);
        window.location.reload();
      }
    }
  };

  return (
    <div className={`settings ${dark ? "dark" : ""}`}>
      <Helmet>
        <title>Settings</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
          sizes="16x16"
        />
      </Helmet>
      <Navbar />
      <Menu from="settings" />
      <SignInPopUp />
      <SignUpPopUp />
      <div className="container">
        <div className="row align-vertical">
          <div className="col-md-7 image-side">
            <div className="form-main-image">
              <img src={img} alt="main-img" />
            </div>
          </div>

          <div className="col-md-5 form-side">
            <div className="settings-apperance">
              <span className={`settings-title ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "المظهر" : "Apperance"}
              </span>
              <div className="settings-apperance-options">
                <div
                  className={`settings-apperance-image ${
                    !dark ? "active" : ""
                  }`}
                  onClick={() => {
                    if (localStorage.getItem("darkMode")) {
                      localStorage.removeItem("darkMode");
                      window.location.reload();
                    }
                  }}
                >
                  <img src={saleLight} alt="light-mode" />
                  <span className={ar ? "ar" : ""}>
                    {ar ? "الوضع المضئ" : "Light mode"}
                  </span>
                </div>

                <div
                  className={`settings-apperance-image ${dark ? "active" : ""}`}
                  onClick={() => {
                    if (localStorage.getItem("darkMode")) {
                      return;
                    } else {
                      localStorage.setItem("darkMode", true);
                      window.location.reload();
                    }
                  }}
                >
                  <img src={saleDark} alt="dark-mode" />
                  <span className={ar ? "ar" : ""}>
                    {" "}
                    {ar ? "الوضع المظلم" : "Dark mode"}
                  </span>
                </div>

                <div
                  className={`settings-apperance-image`}
                  onClick={() => systemDependTheme()}
                >
                  <img src={systemTheme} alt="system-mode" />
                  <span className={ar ? "ar" : ""}>
                    {" "}
                    {ar ? "وضع النظام" : "System mode"}
                  </span>
                </div>
              </div>
            </div>

            <div className="settings-language">
              <span className={`settings-title ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "اللغه" : "Language"}
              </span>
              <div className="settings-language-options">
                <div
                  className="settings-language-option"
                  onClick={() => changeLanguage("en")}
                >
                  <input
                    id="English"
                    type="radio"
                    value="English"
                    name="language"
                    checked={!ar ? "checked" : ""}
                    readOnly
                  />
                  <label htmlFor="English">English</label>
                </div>

                <div
                  className="settings-language-option"
                  onClick={() => changeLanguage("ar")}
                >
                  <input
                    id="arabic"
                    type="radio"
                    value="arabic"
                    name="language"
                    checked={ar ? "checked" : ""}
                    readOnly
                  />
                  <label className="ar" htmlFor="arabic">
                    اللغة االعربيه
                  </label>
                </div>
              </div>
            </div>
            <div className="settings-data">
              <span className={`settings-title ${ar ? "ar" : ""}`}>
                {" "}
                {ar ? "بيانات المستخدم" : "User Data"}
              </span>
              <div className="settings-data-options">
                {props.isLoggedIn && (
                  <button
                    className={`settings-data-option bg-primary ${
                      ar ? "ar" : ""
                    }`}
                    onClick={() => logout()}
                  >
                    {ar ? "تسجيل الخروج" : "Logout"}
                  </button>
                )}
                {!props.isLoggedIn && (
                  <Link
                    to="/sign-in"
                    className={`settings-data-option bg-primary ${
                      ar ? "ar" : ""
                    }`}
                  >
                    {" "}
                    {ar ? "تسجيل الدخول" : "Login"}
                  </Link>
                )}
                <button
                  className={`settings-data-option bg-danger ${ar ? "ar" : ""}`}
                  onClick={() => clearData()}
                >
                  {ar ? "مسح بياناتي" : "Clear data"}
                </button>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(Settings);
