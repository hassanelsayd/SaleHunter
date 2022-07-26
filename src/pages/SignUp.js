// Importing React
import React, { Component } from "react";

// Importing Components
import SignWith from "../Components/forms/signWith/sign-with";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";

// Importing Validations
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// Importing Helmet
import { Helmet } from "react-helmet";

// Importing Redux
import { connect } from "react-redux";
import { register } from "../actions/auth";
import { login } from "../actions/auth";

// Importing Styles

import "../styles/signup.css";

// Importing Assets
import img from "../Assets/Images/Sign_up_large.svg";

// Importing FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import AlreadyLogged from "../Components/alreadyLogged";
const show = <FontAwesomeIcon icon={faEye} />;
const hide = <FontAwesomeIcon icon={faEyeSlash} />;
const pageTitle = "Sign up";

const name = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">الاسم مطلوب</span>
        ) : (
          <span>The name is required!</span>
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
          <span className="ar">الأسم قصير جداً</span>
        ) : (
          <span>This name too short</span>
        )}

        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (value.length > 15) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">الأسم طويل جداً</span>
        ) : (
          <span>This name too long</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

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
          <span className="ar">علي الأقل حروف ورقم وعلامه مميزه</span>
        ) : (
          <span>At least 1 number and 1 char and 1 special sign</span>
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
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      profile_img: null,
      successful: false,
      loading: false,
      showPassword: false,
      showConfirmPass: false,
    };
  }

  confirmPassword = (value) => {
    if (!value) {
      return (
        <div className="error">
          {ar ? (
            <span className="ar">تأكيد الرقم السري مطلوب</span>
          ) : (
            <span>The Confrim password is required!</span>
          )}
          <div className="icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
        </div>
      );
    } else if (value !== this.state.password) {
      return (
        <div className="error">
          {ar ? (
            <span className="ar">تأكيد الرقم السري غير مطابق</span>
          ) : (
            <span>Confirm password not matches</span>
          )}
          <div className="icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
        </div>
      );
    }
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
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

  onChangePasswordConfirm = (e) => {
    this.setState({
      passwordConfirm: e.target.value,
    });
  };
  handleRegister = (e) => {
    e.preventDefault();

    this.form.validateAll();

    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        successful: false,
        loading: true,
      });

      dispatch(
        register(
          this.state.username,
          this.state.email,
          this.state.password,
          this.state.passwordConfirm
        )
      )
        .then(() => {
          this.setState({
            successful: true,
            loading: false,
          });
          dispatch(login(this.state.email, this.state.password)).then(() => {
            history.push("/");
            window.location.reload();
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
            loading: false,
          });
        });
    }
  };
  render() {
    const dark = localStorage.getItem("darkMode");
    const { message } = this.props;

    if (dark) {
      document.documentElement.style.background = "#101010";
      document.getElementById("root").style.background = "#101010";
    } else {
      document.documentElement.style = "";
      document.getElementById("root").style = "";
    }

    let loaderStyle = {
      display: "none",
    };

    if (this.state.loading) {
      loaderStyle = {
        display: "flex",
      };
    }
    if (this.props.isLoggedIn) {
      return <AlreadyLogged />;
    }
    return (
      <div className={`sign-up ${dark ? "dark" : ""}`}>
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
        <Menu from="signup" />
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
                  {" "}
                  {ar
                    ? "مرحباً بك في صائد التخفيضات"
                    : "Welcome to Sale Hunter!"}
                </h1>
                <p
                  style={{ marginBottom: "40px" }}
                  className={`main-paragraph ${ar ? "ar" : ""}`}
                >
                  {ar
                    ? "انشأ حسابك لتتاح لك مميزات عظيمه"
                    : "Sign up to unlock the great features!"}
                </p>

                <Form
                  onSubmit={this.handleRegister}
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                    <div>
                      <div className="form-group mb-4">
                        <Input
                          type="text"
                          className={`form-control data-input ${
                            ar ? "ar" : ""
                          }`}
                          name="username"
                          value={this.state.username}
                          onChange={this.onChangeUsername}
                          validations={[name]}
                          placeholder={ar ? "اسم المستخدم" : "Username"}
                        />
                      </div>

                      <div className="form-group mb-4">
                        <Input
                          type="email"
                          className={`form-control data-input ${
                            ar ? "ar" : ""
                          }`}
                          name="email"
                          value={this.state.email}
                          onChange={this.onChangeEmail}
                          validations={[email]}
                          placeholder={
                            ar ? "االبريد الإليكتروني" : "Email Address"
                          }
                        />
                      </div>

                      <div className="password-input">
                        <div className="form-group mb-4">
                          <Input
                            type={this.state.showPassword ? "text" : "password"}
                            className={`form-control data-input ${
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
                      <div className="password-input">
                        <div className="form-group mb-4">
                          <Input
                            type={
                              this.state.showConfirmPass ? "text" : "password"
                            }
                            className={`form-control data-input ${
                              ar ? "ar" : ""
                            }`}
                            name="passwordConfirm"
                            value={this.state.passwordConfirm}
                            onChange={this.onChangePasswordConfirm}
                            validations={[this.confirmPassword]}
                            placeholder={
                              ar ? "تأكيد الرقم السري" : "Confirm Password"
                            }
                          />
                          <div
                            className={`password-toggler ${ar ? "ar" : ""}`}
                            onClick={() =>
                              this.setState({
                                showConfirmPass: !this.state.showConfirmPass,
                              })
                            }
                          >
                            {this.state.showConfirmPass ? show : hide}
                          </div>
                        </div>
                      </div>
                      {/* Submit Button */}
                      <div className="form-floating mb-3">
                        <input
                          type="submit"
                          className={`form-control ${ar ? "ar t-center" : ""}`}
                          id="submit"
                          value={ar ? "انشاء حساب" : "Sign Up"}
                        />
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
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                  <SignWith
                    type="sign-up"
                    oppsite="sign-in"
                    description={
                      ar ? "بالفعل لدي حساب" : "Already have account?"
                    }
                    oppsite_text={ar ? "سجل دخول" : "Sign in"}
                    from="page"
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
export default connect(mapStateToProps)(Register);
