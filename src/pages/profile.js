// Importig React Libiraries
import React, { Component } from "react";

// Import Components
import Menu from "../Components/menu";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
import { Helmet } from "react-helmet";

// Importing Axios
import axios from "axios";

// Importing React-Router
import { Link } from "react-router-dom";

// Importing Redux
import { connect } from "react-redux";

// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

// importing Assets
import img from "../Assets/Images/profile.svg";
import defaultProfile from "../Assets/Images/default-profile.png";

// Importing Styles
import "../styles/profile.css";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Components/Navbar";
import NotLogged from "../Components/notLogged";
const show = <FontAwesomeIcon icon={faEye} />;
const hide = <FontAwesomeIcon icon={faEyeSlash} />;

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "it's secret",
      email: "",
      imageSrc: defaultProfile,
      haveStore: false,
      arabic: (data) => (ar ? true : false),
      loggedFrom: "",
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
            ...(user.profile_img !== null
              ? { imageSrc: user.profile_img }
              : {}),
            loggedFrom:
              user.thirdParty_id !== null ? user.thirdParty_id.slice(0, 1) : "",
            pageLoading: false,
          });
          if (user.store_id !== null) {
            this.setState({
              haveStore: true,
            });
          }
        });
    }
  }

  render() {
    let dark = localStorage.getItem("darkMode");
    if (dark) {
      document.documentElement.style.background = "#111";
    }

    if (this.props.isLoggedIn || userJWT) {
      return (
        <div className={`profile ${dark ? "dark" : ""}`}>
          <Helmet>
            <title>Profile</title>
            <link
              rel="icon"
              type="image/png"
              href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
              sizes="16x16"
            />
          </Helmet>
          <Navbar />
          <Menu from="profile" />
          {!this.state.pageLoading && (
            <div className="container">
              <div className="row align-vertical">
                <div className="col-md-7 image-side">
                  <div className="form-main-image">
                    <img src={img} alt="main-img" />
                  </div>
                </div>

                <div className="col-md-5 form-side ">
                  <div className="image-cover">
                    <img
                      src={this.state.imageSrc}
                      alt=""
                      className="cover"
                      id="cover"
                    />
                    <div className="image">
                      <img
                        src={this.state.imageSrc}
                        alt=""
                        className="main-profile-img"
                        id="main-profile-img"
                      />
                    </div>
                  </div>
                  <Form
                    ref={(c) => {
                      this.form = c;
                    }}
                  >
                    <div className="form-group">
                      <Input
                        type="text"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="username"
                        value={this.state.name}
                        placeholder={ar ? "اسم المستخدم" : "Username"}
                        disabled
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
                        disabled
                      />
                    </div>

                    <div
                      className="password-input"
                      style={
                        this.state.loggedFrom === "f" ? { display: "none" } : {}
                      }
                    >
                      <div className="form-group mb-4">
                        <Input
                          type={this.state.showPassword ? "text" : "password"}
                          className={`form-control data-input ${
                            ar ? "ar" : ""
                          }`}
                          name="password"
                          value={this.state.password}
                          placeholder="Password"
                          disabled
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
                      <Link to="/change-password">
                        <span className={ar ? "ar" : ""}>
                          {ar ? "تغير الرقم السري" : "Change Password"}
                        </span>
                      </Link>
                    </div>
                  </Form>
                  <Link to="/profile/edit-profile">
                    <button
                      className={`edit-profile ${ar ? "ar t-center" : ""}`}
                    >
                      {ar ? "تعديل بياناتك" : "Edit Profile"}
                    </button>
                  </Link>
                  {!this.state.haveStore && (
                    <Link to="/profile/createStore">
                      <div className="create-store">
                        <svg
                          className="store-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 64 64"
                        >
                          <path
                            fill="#222"
                            d="M32,20.1H7.162a1.5,1.5,0,0,1-1.3-2.245L11.833,7.4a1.5,1.5,0,0,1,1.3-.755H32a1.5,1.5,0,0,1,0,3H14.006L9.747,17.1H32a1.5,1.5,0,0,1,0,3Z"
                          />
                          <path
                            fill="#222"
                            d="M56.838 20.1H32a1.5 1.5 0 0 1 0-3H54.253L49.994 9.645H32a1.5 1.5 0 0 1 0-3H50.864a1.5 1.5 0 0 1 1.3.755L58.14 17.854a1.5 1.5 0 0 1-1.3 2.245zM13.372 31.267a7.719 7.719 0 0 1-7.71-7.71V18.6a1.5 1.5 0 0 1 3 0v4.958a4.71 4.71 0 1 0 9.419 0V18.6a1.5 1.5 0 0 1 3 0v4.958A7.718 7.718 0 0 1 13.372 31.267z"
                          />
                          <path
                            fill="#222"
                            d="M25.791,31.267a7.719,7.719,0,0,1-7.71-7.71V18.6a1.5,1.5,0,0,1,3,0v4.958a4.71,4.71,0,1,0,9.419,0V18.6a1.5,1.5,0,0,1,3,0v4.958A7.718,7.718,0,0,1,25.791,31.267Z"
                          />
                          <path
                            fill="#222"
                            d="M38.209,31.267a7.718,7.718,0,0,1-7.709-7.71V18.6a1.5,1.5,0,0,1,3,0v4.958a4.71,4.71,0,1,0,9.419,0V18.6a1.5,1.5,0,0,1,3,0v4.958A7.719,7.719,0,0,1,38.209,31.267Z"
                          />
                          <path
                            fill="#222"
                            d="M50.628,31.267a7.718,7.718,0,0,1-7.709-7.71V18.6a1.5,1.5,0,0,1,3,0v4.958a4.71,4.71,0,1,0,9.419,0V18.6a1.5,1.5,0,1,1,3,0v4.958A7.719,7.719,0,0,1,50.628,31.267Z"
                          />
                          <path
                            fill="#222"
                            d="M44.418 20.1a1.5 1.5 0 0 1-1.436-1.068L39.838 8.577a1.5 1.5 0 0 1 2.873-.865l3.144 10.455a1.5 1.5 0 0 1-1 1.868A1.475 1.475 0 0 1 44.418 20.1zM19.582 20.1a1.475 1.475 0 0 1-.433-.064 1.5 1.5 0 0 1-1-1.868L21.289 7.712a1.5 1.5 0 0 1 2.873.865L21.018 19.031A1.5 1.5 0 0 1 19.582 20.1zM32 20.1a1.5 1.5 0 0 1-1.5-1.5V8.145a1.5 1.5 0 1 1 3 0V18.6A1.5 1.5 0 0 1 32 20.1zM32 57.355H9.684a1.5 1.5 0 0 1-1.5-1.5V28.545a1.5 1.5 0 0 1 3 0v25.81H32a1.5 1.5 0 0 1 0 3z"
                          />
                          <path
                            fill="#222"
                            d="M54.316,57.355H32a1.5,1.5,0,1,1,0-3H52.816V28.545a1.5,1.5,0,0,1,3,0v27.31A1.5,1.5,0,0,1,54.316,57.355Z"
                          />
                          <path
                            fill="#222"
                            d="M43.881,56.98a1.5,1.5,0,0,1-1.5-1.5V39.615H21.619V55.372a1.5,1.5,0,0,1-3,0V38.115a1.5,1.5,0,0,1,1.5-1.5H43.881a1.5,1.5,0,0,1,1.5,1.5V55.48A1.5,1.5,0,0,1,43.881,56.98Z"
                          />
                        </svg>

                        <div className="create-store-info">
                          <h2 className={ar ? "ar" : ""}>
                            {ar ? "انشأ متجرك الآن" : "Have a Store?"}
                          </h2>
                          <p className={`lead ${ar ? "ar" : ""}`}>
                            {ar
                              ? "انشأ متجرك الآن لزياده سرعة تعاملك مع الزبائن"
                              : "Create your store to Increase your speed with more customers"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )}
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
      return <NotLogged />;
    }
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
}
export default connect(mapStateToProps)(Profile);
