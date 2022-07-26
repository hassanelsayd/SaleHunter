// Importig React Libiraries
import React, { Component } from "react";

// Importing Internal components
import Menu from "../Components/menu";
import Navbar from "../Components/Navbar";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
// Importing acios
import axios from "axios";

// Importing React-Router
import { Link } from "react-router-dom";

// Importing Redux
import { connect } from "react-redux";
import {
  updateUserProfile,
  verifyEmail,
  verifyEmailToken,
} from "../actions/auth";

// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

// importing Assets
import img from "../Assets/Images/update-profile.svg";
import defaultProfile from "../Assets/Images/default-profile.png";
import checkInbox from "../Assets/Images/check-inbox.svg";

// Importing Styles
import "../styles/update-profile.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Start Validations
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

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      oldEmail: "",
      imagebase64Src: "undefined",
      loading: false,
      emailToken: "",
      verifyModal: false,
      loggedFrom: null,
      pageLoading: true,
    };
  }

  async componentDidMount() {
    if (this.props.isLoggedIn && !userJWT) {
      window.location.reload();
    } else if (userJWT) {
      await axios
        .get("https://sale-hunter.herokuapp.com/api/v1/users", {
          headers: {
            Authorization: `Bearer ${userJWT}`,
          },
        })
        .then((response) => {
          const { user } = response.data;
          this.setState({
            name: user.fullname,
            email: user.email,
            oldEmail: user.email,
            imagebase64Src: user.profile_img,
            loggedFrom:
              user.thirdParty_id !== null ? user.thirdParty_id.slice(0, 1) : "",
            pageLoading: false,
          });
        });
    }
  }

  handleEmailTokenChange = (e) => {
    this.setState({ emailToken: e.target.value });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleImageChange = (e) => {
    let cover = document.getElementById("cover");
    let mainImg = document.getElementById("main-update-profile-img");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({
        imagebase64Src: reader.result,
      });
      if (cover.classList.contains("disable")) {
        cover.classList.remove("disable");
      }
      mainImg.src = reader.result;
      cover.src = reader.result;
    };
  };

  handleUpdateProfile = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });

    this.form.validateAll();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      if (this.state.oldEmail !== this.state.email) {
        dispatch(verifyEmail(this.state.oldEmail)).then(() => {
          this.setState({ loading: false, verifyModal: true });
        });
      } else {
        dispatch(
          updateUserProfile(
            this.state.name,
            this.state.email,
            this.state.imagebase64Src
          )
        )
          .then(() => {
            this.setState({
              loading: false,
            });
            history.replace("/profile");
          })
          .catch(() => {
            this.setState({
              loading: false,
            });
          });
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  handleVerifyEmail = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    this.setState({
      loading: true,
    });

    if (
      this.state.emailToken.length > 16 ||
      this.state.emailToken.length < 33
    ) {
      dispatch(verifyEmailToken(this.state.emailToken)).then(() => {
        dispatch(
          updateUserProfile(
            this.state.name,
            this.state.email,
            `${this.state.imagebase64Src}`
          )
        )
          .then(() => {
            this.setState({ loading: false });
            history.replace("/profile");
            window.location.reload();
          })
          .catch(() => {
            this.setState({ loading: false });
          });
      });
    }
  };

  render() {
    const { message } = this.props;
    let dark = localStorage.getItem("darkMode");
    if (dark) {
      document.documentElement.style.background = "#111";
    }

    let loaderStyle = {
      display: "none",
    };

    if (this.state.loading) {
      loaderStyle = {
        display: "flex",
      };
    }
    let verifyModalStyle = {
      display: "none",
    };
    if (this.state.verifyModal) {
      verifyModalStyle = {
        display: "block",
      };
    }

    if (this.props.isLoggedIn || userJWT) {
      return (
        <div className={`update-profile ${dark ? "dark" : ""}`}>
          <Navbar />
          <Menu from="profile" />

          {/* Start Verify Email Box */}
          <div className="verify-email-container" style={verifyModalStyle}>
            <div className="overlay"></div>
            <div className="verify-email">
              <svg
                onClick={() =>
                  (document.querySelector(
                    ".verify-email-container"
                  ).style.display = "none")
                }
                xmlns="http://www.w3.org/2000/svg"
                className="close"
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
              <img src={checkInbox} alt="check-inbox" />
              <h3 className={ar ? "ar" : ""}>
                {ar ? "تفقد البريد الوارد" : "Check Inbox"} ✔️
              </h3>
              <p className={`lead text-center ${ar ? "ar" : ""}`}>
                {ar ? "لقد ارسلنا رساله إلي" : "We have sent E-mail to"}
                <br />"{this.state.oldEmail}"
              </p>
              <Form onSubmit={this.handleVerifyEmail}>
                <Input
                  type="text"
                  placeholder={ar ? "الصق الكود هنا" : "Paste Code Here"}
                  className={`token-input ${ar ? "ar" : ""}`}
                  value={this.state.emailToken}
                  onChange={this.handleEmailTokenChange}
                />
                <Input
                  type="submit"
                  value={ar ? "تأكيد" : "Verify"}
                  className={ar ? "ar t-center" : ""}
                />
              </Form>
            </div>
          </div>
          {/* End Verify Email Box */}

          <div className="loader-box" style={loaderStyle}>
            <div className="loader"></div>
          </div>
          {!this.state.pageLoading && (
            <div className="container">
              <div className="row align-vertical">
                <div className="col-md-7 image-side">
                  <div className="form-main-image">
                    <img src={img} alt="main-img" />
                  </div>
                </div>

                <div className="col-md-5 form-side ">
                  <div
                    className={`go-back ${ar ? "ar" : ""}`}
                    onClick={() => this.props.history.goBack()}
                  >
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
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className={ar ? "ar" : ""}>
                      {ar ? "إلي الخلف" : "Go back"}
                    </span>
                  </div>
                  <div className="image-cover">
                    <img
                      src={
                        this.state.imagebase64Src === "undefined" ||
                        this.state.imagebase64Src === null
                          ? defaultProfile
                          : this.state.imagebase64Src
                      }
                      alt=""
                      className={`cover ${
                        this.state.imagebase64Src !== "undefined" ||
                        this.state.imagebase64Src === null
                          ? ""
                          : "disable"
                      }`}
                      id="cover"
                    />

                    <div className="image">
                      <img
                        src={
                          this.state.imagebase64Src === "undefined" ||
                          this.state.imagebase64Src === null
                            ? defaultProfile
                            : this.state.imagebase64Src
                        }
                        alt=""
                        className="main-update-profile-img"
                        id="main-update-profile-img"
                      />

                      <div className="change-photo">
                        <input
                          accept="image/*"
                          type="file"
                          id="upload-photo"
                          onChange={this.handleImageChange}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="add-photo-icon"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <Form
                    ref={(c) => {
                      this.form = c;
                    }}
                    onSubmit={this.handleUpdateProfile}
                  >
                    <div className="form-group">
                      <Input
                        type="text"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="username"
                        value={this.state.name}
                        placeholder={ar ? "اسم المستخدم" : "Username"}
                        onChange={this.handleNameChange}
                        validations={[name]}
                      />
                    </div>

                    <div
                      className="form-group"
                      style={
                        this.state.loggedFrom === "f" ? { display: "none" } : {}
                      }
                    >
                      <Input
                        type="email"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="email"
                        value={this.state.email}
                        placeholder={ar ? "البريد الإلكتروني" : "Email"}
                        onChange={this.handleEmailChange}
                        validations={
                          this.state.loggedFrom === "f" ? [email] : []
                        }
                      />
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="submit"
                        className={`form-control ${ar ? "ar t-center" : ""}`}
                        id="submit"
                        value={ar ? "تعديل الملف الشخصي" : "Update profile"}
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

                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtn = c;
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>
          )}

          {this.state.pageLoading && (
            <div className="container">
              <div className="salehunter-spinner">
                <SalehunterSpinner />
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="not-logged">
          <h1 className="not-logged-title">You are not logged in</h1>
          <Link to="/sign-in" className="btn">
            Login
          </Link>
        </div>
      );
    }
  }
}
function mapStateToProps(state) {
  const { message } = state.message;
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
    message,
  };
}
export default connect(mapStateToProps)(UpdateProfile);
