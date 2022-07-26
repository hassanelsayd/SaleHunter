/* eslint-disable no-undef */
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
import { login, register } from "../../../../actions/auth";
import { clearMessage } from "../../../../actions/message";
// Importing Components
import SignWith from "../../../../Components/forms/signWith/sign-with";

// Importing Assets
import signUpImg from "../../../../Assets/Images/Sign_up_small.svg";

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

class SignUpPopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      profile_img: null,
      isVisable: false,
      confirmVisible: false,
      loading: false,
      successful: false,
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
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
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
  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();

    this.form.validateAll();
    const { dispatch } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        successful: false,
        loading: true,
      });
      dispatch(
        register(
          this.state.name,
          this.state.email,
          this.state.password,
          this.state.confirmPassword,
          this.state.profile_img
        )
      )
        .then(() => {
          this.setState({
            successful: true,
            loading: false,
          });
          dispatch(login(this.state.email, this.state.password)).then(() => {
            document.getElementById("profileBtn1").click();
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

  close_popup = () => {
    document.querySelector(".sign-up-popup").setAttribute("hidden", true);
  };
  showSignIn = () => {
    this.close_popup();
    const { dispatch } = this.props;
    dispatch(clearMessage());
    document.querySelector(".sign-in-popup").removeAttribute("hidden");
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
    let { message } = this.props;
    return (
      <div className={`sign-up-popup ${dark ? "dark" : ""}`} hidden>
        <div className="loader-box" style={loaderStyle}>
          <div className="loader"></div>
        </div>
        <div
          className="ui dimmer modals visible active"
          onClick={this.close_popup}
        ></div>
        <div className="popup-box">
          <div className="popup-form">
            <div className="close-popup" onClick={this.close_popup}>
              &times;
            </div>
            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              <h2 className={`main-title ${ar ? "ar t-center" : ""}`}>
                {ar ? "انشاء حساب" : "Sign-up"}
              </h2>
              <div className="img">
                <img style={{ width: "200px" }} src={signUpImg} alt="sign-up" />
              </div>

              <div>
                <div className="form-element">
                  <Input
                    type="text"
                    className={`form-control input-field ${ar ? "ar" : ""}`}
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[name]}
                    autoComplete="off"
                    placeholder={ar ? "اسم المستخدم" : "User name"}
                  />
                </div>

                <div className="form-element">
                  <Input
                    type="email"
                    className={`form-control input-field ${ar ? "ar" : ""}`}
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
                      className={`form-control input-field ${ar ? "ar" : ""}`}
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
                <div className="password-input">
                  <div className="form-element">
                    <Input
                      type={this.state.confirmVisible ? "text" : "password"}
                      className={`form-control input-field ${ar ? "ar" : ""}`}
                      name="password"
                      value={this.state.confirmPassword}
                      onChange={this.onChangeConfirmPassword}
                      validations={[this.confirmPassword]}
                      autoComplete="off"
                      placeholder={ar ? "تأكيد كلمة السر" : "Confrim Password"}
                    />
                    <div
                      className={`password-toggler ${ar ? "ar" : ""}`}
                      onClick={() =>
                        this.setState({
                          confirmVisible: !this.state.confirmVisible,
                        })
                      }
                    >
                      {this.state.confirmVisible ? show : hide}
                    </div>
                  </div>
                </div>
                {/* Checker */}
                <div className="checker">
                  <div className="form-check mb-3">
                    <label
                      className={`form-check-label ${ar ? "ar" : ""}`}
                      htmlFor="validationFormCheck2"
                    >
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="validationFormCheck2"
                        checked
                        required
                      />
                      {ar ? "تذكرني" : "Check Me Out"}
                    </label>

                    <span className="forgot-signUp">
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
                      value={ar ? "انشاء حساب" : "Sign up"}
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
                <a id="profileBtn1" href="/profile" style={{ display: "none" }}>
                  {" "}
                </a>
                <SignWith
                  type="sign-in"
                  oppsite="sign-up"
                  oppsite_text={ar ? "سجل دخول" : "Sign in"}
                  from="pop"
                />
                <h4 className={`sign-in-route ${ar ? "ar t-center" : ""}`}>
                  {ar ? "بالفعل لدي حساب" : "Already have account?"}
                  <span className={ar ? "ar" : ""} onClick={this.showSignIn}>
                    {ar ? "    تسجبل الدخول" : "Sign in"}
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
export default connect(mapStateToProps)(SignUpPopUp);
