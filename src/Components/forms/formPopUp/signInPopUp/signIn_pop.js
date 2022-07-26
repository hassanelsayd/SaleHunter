// Importig React Libiraries
import React, { Component } from "react";
// Importing React-Router
import { Link } from "react-router-dom";

// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// Importing React-Redux
import { connect } from "react-redux";
import { login } from "../../../../actions/auth";
import { clearMessage } from "../../../../actions/message";
// Importing Components
import SignWith from "../../../../Components/forms/signWith/sign-with";

// Importing Assets
import signInImg from "../../../../Assets/Images/Sign_in_small.svg";

// Importing Styles
import "../../../../styles/sign-popup.css";

// FontAwesome
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const show = <FontAwesomeIcon icon={faEye} />;
const hide = <FontAwesomeIcon icon={faEyeSlash} />;

// Validations
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
class SignInPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isVisable: false,
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
    const { dispatch } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.email, this.state.password))
        .then(() => {
          document.querySelector(".sign-in-popup").style.display = "none";
          document.getElementById("profileBtn").click();
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
  closePopup = () => {
    document.querySelector(".sign-in-popup").setAttribute("hidden", true);
  };
  showSignUp = () => {
    this.closePopup();
    const { dispatch } = this.props;
    dispatch(clearMessage());
    document.querySelector(".sign-up-popup").removeAttribute("hidden");
  };
  render() {
    let loaderStyle = {
      display: "none",
    };

    if (this.state.loading) {
      loaderStyle = {
        display: "flex",
      };
    }
    const dark = localStorage.getItem("darkMode");
    const { message } = this.props;
    return (
      <div className={`sign-in-popup ${dark ? "dark" : ""}`} hidden>
        <div className="loader-box" style={loaderStyle}>
          <div className="loader"></div>
        </div>
        <div
          className="ui dimmer modals visible active"
          onClick={this.closePopup}
        ></div>
        <div className="popup-box">
          <div className="popup-form">
            <div className="close-popup" onClick={this.closePopup}>
              &times;
            </div>
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <h2 className={`main-title ${ar ? "ar t-center" : ""}`}>
                {ar ? "تسجيل دخول" : "Sign-in"}
              </h2>
              <div className="img">
                <img src={signInImg} alt="sign-in" />
              </div>

              <div>
                <div className="form-element">
                  <Input
                    type="email"
                    className={` form-control input-field ${ar ? "ar" : ""}`}
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[email]}
                    autoComplete="off"
                    placeholder={ar ? "البريد الإلكتروني" : "Email"}
                  />
                </div>
                <div className="password-input">
                  <div className="form-element">
                    <Input
                      type={this.state.isVisable ? "text" : "password"}
                      className={` form-control input-field ${ar ? "ar" : ""}`}
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[password]}
                      autoComplete="off"
                      placeholder={ar ? "كلمة السر" : "Password"}
                    />
                    <div
                      className={`password-toggler ${ar ? "ar" : ""}`}
                      onClick={() =>
                        this.setState({ isVisable: !this.state.isVisable })
                      }
                    >
                      {this.state.isVisable ? show : hide}
                    </div>
                  </div>
                </div>
                {/* Checker */}
                <div className="checker">
                  <div className="form-check mb-3">
                    <label
                      className={`form-check-label ${ar ? "ar" : ""}`}
                      htmlFor="validationFormCheck1"
                    >
                      <Input
                        type="checkbox"
                        className={`form-check-input `}
                        id="validationFormCheck1"
                        checked
                        required
                      />
                      {ar ? "تذكرني" : "Check Me Out"}
                    </label>

                    <span className="forgot">
                      <Link
                        to="/forgot"
                        className={`link-route ${ar ? "ar" : ""}`}
                      >
                        {ar ? "نسيت كلمة السر ؟" : "Forgot your password ?"}
                      </Link>
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <div className="submitting ">
                  <div className="form-floating">
                    <input
                      type="submit"
                      className={`form-control ${ar ? "ar t-center" : ""}`}
                      value={ar ? "تسجيل دخول" : "Sign In"}
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

                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
                <Link
                  style={{ display: "none" }}
                  id="profileBtn"
                  to="/profile"
                ></Link>
                <SignWith
                  type="sign-in"
                  oppsite="sign-up"
                  oppsite_text={ar ? "انشأ حساب" : "Sign in"}
                  from="pop"
                />
                <h4 className={`sign-in-route ${ar ? "ar t-center" : ""}`}>
                  {ar ? "ليس لديك حساب؟" : "Don't have an account?"}
                  <span className={ar ? "ar" : ""} onClick={this.showSignUp}>
                    {" "}
                    {ar ? "انشأ حساب" : "Sign Up"}
                  </span>
                </h4>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  const { message } = state.message;

  return {
    isLoggedIn,
    message,
  };
}
export default connect(mapStateToProps)(SignInPopUp);
