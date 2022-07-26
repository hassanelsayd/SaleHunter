// Importig React Libiraries
import React, { Component } from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import Spinner3 from "../Components/spinners/Spinner3";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";

// importing Assets
import img from "../Assets/Images/createStore.svg";
import defaultProfile from "../Assets/Images/default-profile.png";

// Importing Styles
import "../styles/create-store.css";
import axios from "axios";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import NotLogged from "../Components/notLogged";

const ar = localStorage.getItem("ar");
const storeName = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">اسم المتجر مطلوب</span>
        ) : (
          <span>Store name is required!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (value.length < 5) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">اسم المتجر قصير جداً</span>
        ) : (
          <span>Store name too short</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  } else if (value.length > 45) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">اسم المتجر طويل جداً</span>
        ) : (
          <span>Store name too long</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const directions = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">الاتجاهات مطلوبه</span>
        ) : (
          <span>Directions is required!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const PhoneNumber = (value) => {
  if (value.length > 0 && !value.match(/^01[0,1,2,5]\d{8}$/)) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">رقم االهاتف غير صحيح</span>
        ) : (
          <span>Phone number isn't valid!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const WhatsappNumber = (value) => {
  if (value.length > 0 && !value.match(/^01[0,1,2,5]\d{8}$/)) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">رقم الواتساب غير صحيح</span>
        ) : (
          <span>Whatsapp number isn't valid!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const category = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">نوع المتجر مطلوب</span>
        ) : (
          <span>Store type is required!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const address = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">عنوان المتجر مطلوب</span>
        ) : (
          <span>Address is required!</span>
        )}
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const isValidHttpUrl = (link) => {
  if (link.length > 0) {
    try {
      new URL(link);
    } catch (_) {
      return (
        <div className="error">
          <span>Link isn't valid!</span>
          <div className="icon">
            <FontAwesomeIcon icon={faExclamationTriangle} />
          </div>
        </div>
      );
    }
  }
};

const description = (value) => {
  if (value.length > 200) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">الوصف طويل جداً</span>
        ) : (
          <span>Description is too long</span>
        )}

        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
  }
};

const userJWT = localStorage.getItem("JWT");
class CreateStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storeName: "",
      phoneNumber: "",
      whatsapp: "",
      address: "",
      category: "",
      description: "",
      fbLink: "",
      igLink: "",
      imagebase64Src: "",
      longitude: "",
      latitude: "",
      location_got: false,
      createStoreLoading: false,
    };
  }

  getDirections = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        location_got: true,
      });
    });
  };

  handleImageChange = (e) => {
    let cover = document.getElementById("cover");
    let mainImg = document.getElementById("main-create-store-page-img");
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
  handleInputChange = (e) => {
    if (
      e.target.name !== "fbLink" ||
      e.target.name !== "igLink" ||
      e.target.name !== "siteLink"
    ) {
      this.setState({ [e.target.name]: e.target.value });
    }

    if (e.target.name === "fbLink") {
      let facebook_link = e.target.value;
      let indexOfQuery = facebook_link.indexOf("?");
      if (indexOfQuery !== -1) {
        this.setState({ fbLink: facebook_link.slice(0, indexOfQuery) });
      } else this.setState({ fbLink: facebook_link });
    }

    if (e.target.name === "igLink") {
      let instagram_link = e.target.value;
      let indexOfQuery = instagram_link.indexOf("?");
      if (indexOfQuery !== -1) {
        this.setState({ igLink: instagram_link.slice(0, indexOfQuery) });
      } else this.setState({ igLink: instagram_link });
    }

    if (e.target.name === "siteLink") {
      let web_link = e.target.value;
      let indexOfQuery = web_link.indexOf("?");
      if (indexOfQuery !== -1) {
        this.setState({ siteLink: web_link.slice(0, indexOfQuery) });
      } else this.setState({ siteLink: web_link });
    }
  };
  handleCreateStore = (e) => {
    e.preventDefault();

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({ createStoreLoading: true });
      axios({
        method: "POST",
        url: "https://sale-hunter.herokuapp.com/api/v1/stores",
        data: {
          name: this.state.storeName,
          niche_market: this.state.category,
          address: this.state.address,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          ...(this.state.imagebase64Src !== ""
            ? { logo: this.state.imagebase64Src }
            : {}),
          ...(this.state.phoneNumber !== ""
            ? { phone: this.state.phoneNumber }
            : {}),
          ...(this.state.whatsapp !== ""
            ? { whatsapp: this.state.whatsapp }
            : {}),
          ...(this.state.fbLink !== "" ? { facebook: this.state.fbLink } : {}),
          ...(this.state.igLink !== "" ? { instagram: this.state.igLink } : {}),
          ...(this.state.description !== ""
            ? { description: this.state.description }
            : {}),
          ...(this.state.siteLink !== ""
            ? { website: this.state.siteLink }
            : {}),
        },
        headers: {
          Authorization: `Bearer ${userJWT}`,
        },
      }).then((res) => {
        document.querySelector(".dashboard-route").click();
        this.setState({ createStoreLoading: false });
      });
    }
  };

  render() {
    const dark = localStorage.getItem("darkMode");
    if (dark) {
      document.documentElement.style.background = "#111";
    }
    if (!this.props.isLoggedIn) {
      return <NotLogged />;
    }
    if (this.props.isLoggedIn) {
      return (
        <div className={`create-store-page ${dark ? "dark" : ""}`}>
          <Helmet>
            <title>Create store</title>
            <link
              rel="icon"
              type="image/png"
              href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
              sizes="16x16"
            />
          </Helmet>
          <Navbar />
          <Menu />
          {this.state.createStoreLoading && (
            <div className="spinner-container">
              <Spinner3 />
            </div>
          )}
          <div className="container">
            <div className="row align-vertical">
              <div className="col-md-7 image-side">
                <div className="form-main-image">
                  <img src={img} alt="main-img" />
                </div>
              </div>

              <div className="col-md-5 form-side ">
                <h1 className={`main-title ${ar ? "ar" : ""}`}>
                  {ar
                    ? "ابدأ بإنشاء متجرك الخاص الآن"
                    : "Create your Own Store"}
                </h1>
                <p className={`main-paragraph ${ar ? "ar" : ""}`}>
                  {ar
                    ? "وفر تكاليف إنشاء موقع إلكتروني للمحلات التجارية ، حيث يمكن للبائع إضافة منتجاته إلى صفحة المتجر ونتائج البحث مجانًا"
                    : "Save the costs of creating website for shops, as seller can add his products to store page and search results for free"}
                </p>

                <div className="image-cover">
                  <img alt="" className="cover disable" id="cover" />
                  <div className="image">
                    <img
                      src={defaultProfile}
                      alt="Person"
                      className="main-create-store-page-img"
                      id="main-create-store-page-img"
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
                  onSubmit={this.handleCreateStore}
                >
                  <div className="form-group">
                    <Input
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="storeName"
                      value={this.state.storeName}
                      onChange={this.handleInputChange}
                      placeholder={ar ? "اسم المتجر" : "Store name"}
                      validations={[storeName]}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.handleInputChange}
                      placeholder={ar ? "رقم الهاتف" : "Phone number"}
                      validations={[PhoneNumber]}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="whatsapp"
                      value={this.state.whatsapp}
                      onChange={this.handleInputChange}
                      placeholder={ar ? "رقم الواتساب" : "Whatsapp Number"}
                      validations={[WhatsappNumber]}
                    />
                  </div>

                  <div className="inline-inputs">
                    <div className="form-group">
                      <Input
                        type="text"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="address"
                        value={this.state.address}
                        onChange={this.handleInputChange}
                        placeholder={ar ? "العنوان" : "Address"}
                        style={{ fontFamily: "Arial, FontAwesome" }}
                        validations={[address]}
                      />
                      <span className="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 384 512"
                        >
                          <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                        </svg>
                      </span>
                    </div>

                    <div className="form-group">
                      <Input
                        type="text"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="category"
                        value={this.state.category}
                        onChange={this.handleInputChange}
                        placeholder={ar ? "نوع المتجر" : "Store type"}
                        validations={[category]}
                      />
                      <span className="input-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM64 256C64 238.3 78.33 224 96 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H96C78.33 288 64 273.7 64 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="form-floating mb-3">
                    <div
                      className={`get-directions-btn ${
                        this.state.location_got ? "location_got" : ""
                      }`}
                      onClick={this.getDirections}
                    >
                      <div
                        className={`get-directions-btn-info ${ar ? "ar" : ""}`}
                      >
                        {!this.state.location_got && (
                          <>
                            {ar ? "الحصول علي الاتجاهات" : "Get directions"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M176 256C176 211.8 211.8 176 256 176C300.2 176 336 211.8 336 256C336 300.2 300.2 336 256 336C211.8 336 176 300.2 176 256zM256 0C273.7 0 288 14.33 288 32V66.65C368.4 80.14 431.9 143.6 445.3 224H480C497.7 224 512 238.3 512 256C512 273.7 497.7 288 480 288H445.3C431.9 368.4 368.4 431.9 288 445.3V480C288 497.7 273.7 512 256 512C238.3 512 224 497.7 224 480V445.3C143.6 431.9 80.14 368.4 66.65 288H32C14.33 288 0 273.7 0 256C0 238.3 14.33 224 32 224H66.65C80.14 143.6 143.6 80.14 224 66.65V32C224 14.33 238.3 0 256 0zM128 256C128 326.7 185.3 384 256 384C326.7 384 384 326.7 384 256C384 185.3 326.7 128 256 128C185.3 128 128 185.3 128 256z" />
                            </svg>
                          </>
                        )}

                        {this.state.location_got && (
                          <>
                            {ar
                              ? "تم الحصول علي الاتجاهات"
                              : "Directions received"}
                            <svg
                              className="location_got"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                            </svg>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="inline-inputs">
                      <Input
                        type="text"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="longitude"
                        value={this.state.longitude}
                        validations={[directions]}
                        style={{ display: "none" }}
                      />
                      <Input
                        type="text"
                        className={`form-control data-input ${ar ? "ar" : ""}`}
                        name="latitude"
                        value={this.state.latitude}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Textarea
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      autoComplete="off"
                      placeholder={ar ? "وصف المتجر" : "Description"}
                      validations={[description]}
                      style={{ minHeight: "120px" }}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="fbLink"
                      value={this.state.fbLink}
                      onChange={this.handleInputChange}
                      placeholder={ar ? "رابط حساب فيس بوك" : "Facebook link"}
                      validations={[isValidHttpUrl]}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="igLink"
                      value={this.state.igLink}
                      onChange={this.handleInputChange}
                      placeholder={
                        ar ? "رابط حساب انستاجرام" : "Instagram link"
                      }
                      validations={[isValidHttpUrl]}
                    />
                  </div>

                  <div className="form-group">
                    <Input
                      type="text"
                      className={`form-control data-input ${ar ? "ar" : ""}`}
                      name="siteLink"
                      value={this.state.siteLink}
                      onChange={this.handleInputChange}
                      placeholder={ar ? "رابط موقعك" : "Website link"}
                      validations={[isValidHttpUrl]}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="form-floating mb-3">
                    <input
                      type="submit"
                      className={`form-control ${ar ? "ar t-center" : ""}`}
                      id="createStore"
                      value={ar ? "انشاء المتجر" : "Create store"}
                    />
                  </div>
                  <Link
                    to="/dashboard"
                    className="dashboard-route"
                    style={{ display: "none" }}
                  ></Link>
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
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
}
export default connect(mapStateToProps)(CreateStore);
