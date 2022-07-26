// Importig React Libiraries
import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
import { Helmet } from "react-helmet";

// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// Importing React-Redux
import { connect } from "react-redux";
import { verifyEmail } from "../actions/auth";

// importing Assets
import img from "../Assets/Images/Forgot_password.svg";
// Importing Styles
import "../styles/signin.css";
import "../styles/forget-password.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import AlreadyLogged from "../Components/alreadyLogged";

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

const ar = localStorage.getItem("ar");
class ForgetPassPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
    };
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleForget = (e) => {
    localStorage.setItem("forgottenEmail", this.state.email);
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(verifyEmail(this.state.email))
        .then(() => {
          this.setState({
            loading: false,
          });
          history.push({
            pathname: "/code",
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
      <div className={`forgot-password ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>Forgot password</title>
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

            <div className="col-md-5 forgot-section form-side ">
              <h1 className={`main-title ${ar ? "ar" : ""}`}>
                {ar ? "نسيت الرقم السري ؟" : "Forgot your Password"}
              </h1>
              <p className={`main-paragraph ${ar ? "ar" : ""}`}>
                {ar
                  ? "سيتم إرسال رمز التحقق إلى صندوق البريد ، يرجى التحقق منه!"
                  : "The verification code will be sent to the mailbox, please check it!"}
              </p>

              <Form
                onSubmit={this.handleForget}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group mb-4">
                  <Input
                    type="email"
                    className={`form-control data-input ${ar ? "ar" : ""}`}
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[email]}
                    autoComplete="off"
                    placeholder={ar ? "البريد الإليكتروني" : "Email"}
                  />
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="submit"
                    className={`form-control ${ar ? "ar t-center" : ""}`}
                    id="submit"
                    value={ar ? "إرسال" : "Send"}
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
export default connect(mapStateToProps)(ForgetPassPage);
