// Importig React Libiraries
import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
import { Helmet } from "react-helmet";
// Importing React-Router

// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// Importing React-Redux
import { connect } from "react-redux";
import { updateForgottenPassword, login } from "../actions/auth";

// importing Assets
import img from "../Assets/Images/ResetPass.svg";

// Importing Styles
import "../styles/signin.css";
import "../styles/reset-password.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import AlreadyLogged from "../Components/alreadyLogged";
const show = <FontAwesomeIcon icon={faEye} />;
const hide = <FontAwesomeIcon icon={faEyeSlash} />;

// Validation

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
    !value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9@*$^&!%()#]+)$/)
  ) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">علي الأقل حروف ورقم وعلامه مميزه</span>
        ) : (
          <span>At least 1 number and 1 char</span>
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
class ResetPassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      loading: false,
      isVisible: false,
      isConfirmVisible: false,
    };
  }
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
  handleResetPassword = (e) => {
    e.preventDefault();

    this.form.validateAll();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({
        loading: true,
      });
      dispatch(
        updateForgottenPassword(
          this.state.password,
          this.state.confirmPassword,
          this.props.location.state.token
        )
      )
        .then(() => {
          this.setState({
            loading: false,
          });
          dispatch(
            login(localStorage.getItem("forgottenEmail"), this.state.password)
          )
            .then(() => {
              this.setState({
                loading: false,
              });
              history.push("/profile");
              localStorage.removeItem("forgottenEmail");
            })
            .catch(() => {
              this.setState({
                loading: false,
              });
            });
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
    let loaderStyle = {
      display: "none",
    };

    if (this.state.loading) {
      loaderStyle = {
        display: "flex",
      };
    }

    const dark = localStorage.getItem("darkMode");
    if (dark) {
      document.documentElement.style.background = "#111";
    }
    const { isLoggedIn, message } = this.props;
    if (isLoggedIn) {
      return <AlreadyLogged />;
    }

    return (
      <div className={`reset-password-page ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>Reset password</title>
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
        <Menu />
        <SignUpPopUp />
        <SignInPopUp />
        <div className="container">
          <div className="row align-vertical">
            <div className="col-md-7 image-side">
              <div className="form-main-image">
                <img src={img} alt="main-img" />
              </div>
            </div>

            <div className="col-md-5 form-side">
              <h1 className={`main-title ${ar ? "ar" : ""}`}>
                {ar ? "اعد ضبط كلمه السر" : "Reset your password"}
              </h1>

              <p className={`main-paragraph ${ar ? "ar" : ""}`}>
                {ar
                  ? "يرجى تعيين كلمة مرور جديدة لحسابك"
                  : "Please set a new password for your account"}
              </p>

              <Form
                onSubmit={this.handleResetPassword}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="password-input">
                  <div className="form-group mb-4">
                    <Input
                      type={this.state.isVisible ? "text" : "password"}
                      className={` form-control data-input ${ar ? "ar" : ""}`}
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[password]}
                      placeholder={ar ? "كلمه السر" : "password"}
                    />
                    <div
                      className={`password-toggler ${ar ? "ar" : ""}`}
                      onClick={() =>
                        this.setState({ isVisible: !this.state.isVisible })
                      }
                    >
                      {this.state.isVisible ? show : hide}
                    </div>
                  </div>
                </div>
                <div className="password-input">
                  <div className="form-group mb-4">
                    <Input
                      type={this.state.isConfirmVisible ? "text" : "password"}
                      className={` form-control data-input ${ar ? "ar" : ""}`}
                      name="passwordConfirm"
                      value={this.state.passwordConfirm}
                      onChange={this.onChangeConfirmPassword}
                      validations={[this.confirmPassword]}
                      placeholder={ar ? "تأكيد كلمه السر" : "Confilem password"}
                    />
                    <div
                      className={`password-toggler ${ar ? "ar" : ""}`}
                      onClick={() =>
                        this.setState({
                          isConfirmVisible: !this.state.isConfirmVisible,
                        })
                      }
                    >
                      {this.state.isConfirmVisible ? show : hide}
                    </div>
                  </div>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="submit"
                    className={`form-control ${ar ? "ar t-center" : ""}`}
                    id="submit"
                    value={ar ? "تأكيد" : "Verify"}
                  />
                </div>

                <CheckButton
                  style={{ display: "none" }}
                  ref={(c) => {
                    this.checkBtn = c;
                  }}
                />
                {message && (
                  <div className="error backend">
                    <span>{message}</span>
                    <div className="icon">
                      <FontAwesomeIcon icon={faExclamationTriangle} />
                    </div>
                  </div>
                )}
              </Form>
            </div>
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
export default connect(mapStateToProps)(ResetPassPage);
