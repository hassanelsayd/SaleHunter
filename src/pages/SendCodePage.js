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

// Importing React-Redux
import { connect } from "react-redux";
import { verifyEmailToken } from "../actions/auth";

// importing Assets
import img from "../Assets/Images/SendCode.svg";

// Importing Styles
import "../styles/signin.css";
import "../styles/send-code.css";

// FontAwesome

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import AlreadyLogged from "../Components/alreadyLogged";
const token_validation = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">كود التأكيد مطلوب</span>
        ) : (
          <span>Code is required!</span>
        )}

        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (value.length < 16 || value.length > 16) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">رمز تأكيد خاطئ</span>
        ) : (
          <span>Wrong code</span>
        )}

        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const ar = localStorage.getItem("ar");
class SendCodePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token ? this.props.match.params.token : "",
      loading: false,
    };
  }
  onChangeToken = (e) => {
    this.setState({
      token: e.target.value,
    });
  };
  handleCodeSend = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(verifyEmailToken(this.state.token))
        .then(() => {
          this.setState({
            loading: false,
          });
          history.push({
            pathname: "/reset",
            state: {
              token: this.state.token,
            },
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
      <div className={`send-code-page ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>Send code</title>
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
                {ar
                  ? "حسنًا ، لقد أرسلنا لك رمزًا!"
                  : "Ok, we sent you a code!"}
              </h1>
              <p className={`main-paragraph ${ar ? "ar" : ""}`}>
                {ar
                  ? "الرجاء إدخال الرمز الذي أرسلناه إليك خلال الدقائق العشر القادمة"
                  : "Please enter the code we sent to you within the next 10 minutes"}
              </p>

              <Form
                onSubmit={this.handleCodeSend}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div className="form-group mb-4">
                  <Input
                    type="text"
                    className={` form-control data-input ${ar ? "ar" : ""}`}
                    name="token"
                    value={this.state.token}
                    onChange={this.onChangeToken}
                    autoComplete="off"
                    placeholder={ar ? "ادخل الكود هنا" : "Enter PIN here"}
                    validations={[token_validation]}
                  />
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
export default connect(mapStateToProps)(SendCodePage);
