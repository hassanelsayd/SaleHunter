import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Spinner1 from "../../Components/spinners/Spinner1";
import "../../styles/store/deleteStore.css";

// Importing FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage["ar"];

const Eye = () => {
  return (
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
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
};

const EyeSlash = () => {
  return (
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
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  );
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

class DeleteAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      password: "",
      deleteLoading: false,
      deleteStatus: 0,
      requestDone: false,
    };
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  colseDeleteModal = () => {
    document.querySelector(".delete-alert").style.display = "none";
    document.querySelector(".delete-view").classList.add("disable");
    document.querySelector(".verify-password-view").classList.remove("active");
    this.setState({
      password: "",
      deleteStatus: 0,
      deleteLoading: false,
      requestDone: false,
    });
  };

  showVerifyModal = () => {
    document.querySelector(".delete-view").classList.add("disable");
    document.querySelector(".verify-password-view").classList.add("active");
    this.setState({ requestDone: false, deleteStatus: 0 });
  };

  deleteStoreRequest = async (store_id) => {
    try {
      await axios({
        method: "DELETE",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${store_id}`,
        headers: { Authorization: `Bearer ${userJWT}` },
      });
    } catch (err) {
      console.log(err);
    }
  };

  deleteStore = () => {
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({ deleteLoading: true });
      axios({
        method: "POST",
        url: "https://sale-hunter.herokuapp.com/api/v1/users/auth/signin",
        data: {
          email: this.props.email,
          password: this.state.password,
        },
      })
        .then((res) => {
          if (res.data.status === "success") {
            this.deleteStoreRequest(this.props.storeID);
            this.setState({
              deleteStatus: 200,
              requestDone: true,
              deleteLoading: false,
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.setState({
              deleteStatus: 401,
              requestDone: true,
              deleteLoading: false,
            });
          } else if (err.response.status === 400) {
            this.setState({
              deleteStatus: 400,
              requestDone: true,
              deleteLoading: false,
            });
          }
        });
    }
  };

  render() {
    return (
      <div className="delete-alert">
        <div className="delete-alert-overlay"></div>
        <div className="delete-box">
          <div className="delete-view">
            <div className="delete-icon">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <div className="text">
              <h2 className={`title ${ar ? "ar" : ""}`}>
                {ar ? "هل انت متأكد؟" : "Are you sure?"}
              </h2>
              <div className={`message ${ar ? "ar t-center" : ""}`}>
                {ar
                  ? "تذكر، لا يمكنك استعادة بيانات المتجر بعد حذفه"
                  : "Remember, you cant restore your store data."}
              </div>
            </div>

            <div className="buttons">
              <span
                onClick={() => this.colseDeleteModal()}
                className={`btn ${ar ? "ar t-center" : ""}`}
              >
                {" "}
                {ar ? "إغلاق" : "Cancel"}
              </span>
              <span
                onClick={() => this.showVerifyModal()}
                className={`btn ${ar ? "ar  t-center" : ""}`}
              >
                {" "}
                {ar ? "حذف" : "Delete"}
              </span>
            </div>
          </div>
          {!this.state.deleteLoading && (
            <div className="verify-password-view">
              <div className="delete-icon">
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <div className="text">
                <h2 className={`title ${ar ? "ar" : ""}`}>
                  {ar ? "قم بتأكيد هويتك" : "Confirm your identity"}
                </h2>
                <div className={`message ${ar ? "ar t-center" : ""}`}>
                  {ar
                    ? "أدخل كلمة المرور الخاصة بك للتحقق من أنك صاحب المتجر"
                    : "Enter your password to verify that you is the store owner."}
                </div>
              </div>
              <div className="verify-input">
                <Form
                  ref={(c) => {
                    this.form = c;
                  }}
                  onSubmit={() => this.deleteStore()}
                >
                  <Input
                    type={this.state.isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    value={this.state.password}
                    name="password"
                    validations={[password]}
                    onChange={this.handlePasswordChange}
                  />
                  <div
                    onClick={() =>
                      this.setState({ isVisible: !this.state.isVisible })
                    }
                  >
                    {" "}
                    {this.state.isVisible ? <EyeSlash /> : <Eye />}{" "}
                  </div>
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </div>
              <div className="buttons">
                <span
                  onClick={() => this.colseDeleteModal()}
                  className={`btn ${ar ? "ar t-center" : ""}`}
                >
                  {" "}
                  {ar ? "إغلاق" : "Cancel"}
                </span>
                <span
                  onClick={() => this.deleteStore()}
                  className={`btn ${ar ? "ar  t-center" : ""}`}
                >
                  {" "}
                  {ar ? "حذف" : "Delete"}
                </span>
              </div>
            </div>
          )}
          {this.state.deleteLoading && !this.state.requestDone && (
            <div className="spinner">
              <Spinner1 />
            </div>
          )}
          {this.state.requestDone && (
            <div className="request-state">
              {this.state.deleteStatus === 200 && (
                <>
                  <div className="delete-icon">
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
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      />
                    </svg>
                  </div>
                  <div className="text">
                    <h2 className={`title t-center ${ar ? "ar" : ""}`}>
                      {ar
                        ? "تم متجرك بنجاح"
                        : "You have been deleted your store successfully"}
                    </h2>
                    <div className={`message t-center ${ar ? "ar" : ""}`}>
                      {ar
                        ? "لسوء الحظ، لقد قمت بحذف متجرك للتو !"
                        : "Unfortunately, you just deleted you store now!"}
                    </div>
                  </div>

                  <div className="buttons">
                    <Link to="/" className={`btn ${ar ? "ar t-center" : ""}`}>
                      {" "}
                      {ar ? "الصفحة الرئيسية" : "Go home"}
                    </Link>
                    <Link
                      to="/profile/createStore"
                      onClick={() => this.deleteStore()}
                      className={`btn ${ar ? "ar  t-center" : ""}`}
                    >
                      {" "}
                      {ar ? "إنشاء متجر جديد" : "Create new store"}
                    </Link>
                  </div>
                </>
              )}

              {this.state.deleteStatus === 401 ||
                (this.state.deleteStatus === 400 && (
                  <>
                    <div className="delete-icon">
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
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="text">
                      <h2 className={`title t-center ${ar ? "ar" : ""}`}>
                        {ar ? "كلمة سر خاطئة" : "wrong password"}
                      </h2>
                      <div className={`message t-center ${ar ? "ar" : ""}`}>
                        {ar
                          ? "يمكنك اغلاق هذه النافذه او إعادة كتابة كلمة السر"
                          : "You can close this window or retry write password"}
                      </div>
                    </div>

                    <div className="buttons">
                      <span
                        onClick={() => this.colseDeleteModal()}
                        className={`btn ${ar ? "ar t-center" : ""}`}
                      >
                        {" "}
                        {ar ? "إغلاق" : "Cancel"}
                      </span>
                      <span
                        onClick={() => this.showVerifyModal()}
                        className={`btn ${ar ? "ar  t-center" : ""}`}
                      >
                        {" "}
                        {ar ? "إعادة المحاوله" : "Retry"}
                      </span>
                    </div>
                  </>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default DeleteAlert;
