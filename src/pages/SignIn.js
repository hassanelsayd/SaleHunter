// Importing React
import React, { Component } from "react";

// Importing React Router
import { Link } from "react-router-dom";

// Importing Components
import SignWith from "../Components/forms/signWith/sign-with";
import Menu from "../Components/menu";
import Navbar from "../Components/Navbar";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
import AlreadyLogged from "../Components/alreadyLogged";
// Importing Validations
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// Importing Redux
import { connect } from "react-redux";
import { login } from "../actions/auth";

// Importing Styles

import "../styles/signin.css";

// Importing Helmet
import { Helmet } from "react-helmet";

// Importing Assets
import img from "../Assets/Images/Sign_in_large.svg";

// Importing FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
const show = <FontAwesomeIcon icon={faEye} />;
const hide = <FontAwesomeIcon icon={faEyeSlash} />;
const pageTitle = "Sign in";

const email = (value) => {
  if (!value) {
    return (
      <div className="error email">
        {ar ? (
          <span className="ar">البريد الإليكتروني مطلوب</span>
        ) : (
          <span>The Email is required!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (!isEmail(value)) {
    return (
      <div className="error email">
        {ar ? (
          <span className="ar">البريد الإليكتروني غير صحيح</span>
        ) : (
          <span>This is not a valid email.</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const password = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">الرقم السري مطلوب</span>
        ) : (
          <span>The Password is required!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (value.length < 8) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">علي الأقل 8 خانات</span>
        ) : (
          <span>At least 8 digits</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (
    !value.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    )
  ) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">علي الأقل حرف ورقم وعلامه مميزه</span>
        ) : (
          <span>At least 1 number and 1 char and special sign</span>
        )}
        <span></span>
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const ar = localStorage.getItem("ar");
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = async (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          history.replace("/profile");
        })
        .catch(() => {
          this.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const dark = localStorage.getItem("darkMode");
    if (dark) {
      document.documentElement.style.background = "#101010";
      document.getElementById("root").style.background = "#101010";
    } else {
      document.documentElement.style = "";
      document.getElementById("root").style = "";
    }
    const { message, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <AlreadyLogged />;
    }

    let loaderStyle = {
      display: "none",
    };

    if (this.state.loading) {
      loaderStyle = {
        display: "flex",
      };
    }

    return (
      <div className={`sign-in ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>{pageTitle}</title>
          <link
            rel="icon"
            type="image/png"
            href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
            sizes="16x16"
          />
        </Helmet>
        <div className="loader-box" style={loaderStyle}>
          <div className="loader"></div>
        </div>
        <Navbar />
        <Menu from="login" />
        <SignUpPopUp />
        <SignInPopUp />
        <div className="container">
          <div className="row align-vertical">
            <div className="col-md-7 image-side">
              <div className="form-main-image">
                <img src={img} alt="MainImage" />
              </div>
            </div>
            <div className="col-md-5 form-side">
              <div className="row">
                <h1 className={`main-title ${ar ? "ar" : ""}`}>
                  {ar ? "مرحبًا بعودتك!" : "Welcome Back!"}{" "}
                </h1>
                <p
                  style={{ marginBottom: "40px" }}
                  className={`main-paragraph ${ar ? "ar" : ""}`}
                >
                  {" "}
                  {ar ? "سجل دخول إلي حسابك" : "Sign in your account"}
                </p>

                <Form
                  onSubmit={this.handleLogin}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  <div>
                    <div className="form-group mb-4">
                      <Input
                        type="email"
                        className={` form-control data-input ${ar ? "ar" : ""}`}
                        name="email"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        validations={[email]}
                        placeholder={ar ? "البريد الإلكتروني" : "Email Address"}
                      />
                    </div>

                    <div className="password-input">
                      <div className="form-group mb-4">
                        <Input
                          type={this.state.showPassword ? "text" : "password"}
                          className={` form-control data-input ${
                            ar ? "ar" : ""
                          }`}
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          validations={[password]}
                          placeholder={ar ? "الرقم السري" : "Password"}
                        />
                        <div
                          className={`password-toggler ${ar ? "ar" : ""}`}
                          onClick={() =>
                            this.setState({
                              showPassword: !this.state.showPassword,
                            })
                          }
                        >
                          {this.state.showPassword ? show : hide}
                        </div>
                      </div>
                    </div>

                    <div className="checker">
                      <div className="form-check mb-3">
                        <Input
                          type="checkbox"
                          className="form-check-input"
                          id="validationFormCheck1"
                          checked
                          required
                        />
                        <label
                          className={`form-check-label ${ar ? "ar" : ""}`}
                          htmlFor="validationFormCheck1"
                        >
                          {ar ? "تذكرني" : "Check Me Out"}
                        </label>
                      </div>

                      <span className="forgot">
                        <Link
                          to="/forgot"
                          className={`link-route ${ar ? "ar" : ""}`}
                        >
                          {ar
                            ? "نسيت الرقم السري ؟"
                            : " Forgot your password ?"}
                        </Link>
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="submitting mb-3">
                      <div className="form-floating">
                        <input
                          type="submit"
                          className={`form-control ${ar ? "ar" : ""}`}
                          id="submit"
                          value={ar ? "تسجيل الدخول" : " Sign In"}
                        />
                      </div>
                    </div>

                    {message && (
                      <div className="error backend">
                        <span>{message}</span>
                        <div className="icon">
                          <FontAwesomeIcon icon={faExclamationTriangle} />
                        </div>
                      </div>
                    )}
                  </div>

                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                  <SignWith
                    type="sign-in"
                    oppsite="sign-up"
                    from="page"
                    description={
                      ar ? "ليس لديك حساب؟" : "Don,t have an Account ?"
                    }
                    oppsite_text={ar ? "انشأ حساب" : "Sign Up"}
                  />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { message } = state.message;
  const { isLoggedIn } = state.authReducer;
  return {
    message,
    isLoggedIn,
  };
}
export default connect(mapStateToProps)(Login);
