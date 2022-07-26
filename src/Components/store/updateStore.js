import axios from "axios";
import React from "react";

// Import External Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";

// Import Internal Components
import Spinner1 from "../../Components/spinners/Spinner1";
import SocialMediaUpdate from "./SocialMediaUpdate";

// IMPORT CSS
import "../../styles/store/updateStore.css";

// Import Assets
import defaultStore from "../../Assets/Images/default-store.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Local storage calls
const dark = localStorage["darkMode"];
const ar = localStorage["ar"];
const userJWT = localStorage["JWT"];

// Validations
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
const address = (value) => {
  if (!value) {
    return (
      <div className="error">
        {ar ? (
          <span className="ar">عنوان المتجر مطلوب</span>
        ) : (
          <span>Address is required!</span>
        )}
        <span></span>
        <div className="icon">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
      </div>
    );
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

class UpdateStore extends React.Component {
  //Component State
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
      base64logo: "",
      name: "",
      type: "",
      niche: "",
      phone: "",
      address: "",
      description: "",
      fbLink: "",
      igLink: "",
      siteLink: "",
      whatsapp: "",
      latitude: "",
      longitude: "",
      location_got: false,
      updateLoading: false,
      errorMessage: "",
    };
    // Load store data if there is store id
    if (this.props.storeID !== "" && !this.state.visited) {
      this.getStoreData(this.props.storeID);
    }
  }
  // Function to getStore Data
  getStoreData = async (store_id) => {
    if (store_id !== null) {
      try {
        const res = await axios({
          method: "GET",
          url: `https://sale-hunter.herokuapp.com/api/v1/stores/${store_id}`,
          headers: { Authorization: `Bearer ${userJWT}` },
        });

        if (res.data) {
          this.setState({
            logo:
              res.data.store.logo !== null ? res.data.store.logo : defaultStore,
            name: res.data.store.name,
            type: res.data.store.type,
            niche: res.data.store.niche_market,
            phone: res.data.store.phone !== null ? res.data.store.phone : "",
            address: res.data.store.address,
            description:
              res.data.store.description !== null
                ? res.data.store.description
                : "",
            latitude: res.data.store.latitude,
            longitude: res.data.store.longitude,
            fbLink:
              res.data.store.facebook !== null ? res.data.store.facebook : "",
            igLink:
              res.data.store.instagram !== null ? res.data.store.instagram : "",
            siteLink:
              res.data.store.website !== null ? res.data.store.website : "",
            whatsapp:
              res.data.store.whatsapp !== null ? res.data.store.whatsapp : "",
            visited: true,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // remove overflow in mobile screens
  componentDidUpdate() {
    if (this.state.updateLoading) {
      document.querySelector(".spinner-container").style.height =
        document.querySelector(".update-store-box").scrollHeight + "px";
    }
  }

  // Function to get current user directions
  getDirections = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        location_got: true,
      });
    });
  };

  // function to active social media board
  toggleSocialmediaBoard = (e) => {
    if (!document.querySelector(".social-media").classList.contains("active")) {
      document.querySelector(".social-media").classList.add("active");
      document.querySelector(".update-store .social-media").style.height =
        document.querySelector(".update-store-box").scrollHeight + "px";
    }
  };

  closeUpdateStore = () => {
    document.querySelector(".update-store").style.display = "none";
    this.setState({ errorMessage: "" });
  };

  // Function To set state to input value
  handleInputChange = (e) => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "phone") {
      this.setState({ phone: e.target.value });
    } else if (e.target.name === "niche") {
      this.setState({ niche: e.target.value });
    } else if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    } else if (e.target.name === "address") {
      this.setState({ address: e.target.value });
    }
  };

  // Function To Update store image
  handleImageChange = (e) => {
    let mainImg = document.getElementById("main-update-store-img");
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ base64logo: reader.result });
      mainImg.src = reader.result;
    };
  };

  // Function To handle submitting update
  handleUpdateStore = (e) => {
    e.preventDefault();
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.setState({ updateLoading: true });
      axios({
        method: "PATCH",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${this.props.storeID}`,
        data: {
          name: this.state.name,
          ...(this.state.phone !== "" ? { phone: this.state.phone } : {}),
          ...(this.state.base64logo !== ""
            ? { logo: this.state.base64logo }
            : {}),

          ...(this.state.whatsapp !== ""
            ? { whatsapp: this.state.whatsapp }
            : {}),
          address: this.state.address,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          ...(this.state.fbLink !== "" ? { facebook: this.state.fbLink } : {}),
          ...(this.state.igLink !== "" ? { instagram: this.state.igLink } : {}),
          ...(this.state.description !== ""
            ? { description: this.state.description }
            : {}),
          niche_market: this.state.niche,
          ...(this.state.siteLink !== ""
            ? { website: this.state.siteLink }
            : {}),
        },
        headers: { Authorization: `Bearer ${userJWT}` },
      })
        .then((res) => {
          this.setState({ updateLoading: false });
          this.closeUpdateStore();
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
          this.setState({
            errorMessage: "Sorry, some thing went wrong!",
            updateLoading: false,
          });
        });
    }
  };

  store_type = (type) => {
    if (type === "online" && ar) {
      return "متجر غبر الإنترنت";
    } else if (type === "offline" && ar) {
      return "متجر محلي";
    } else if (type === "online" && !ar) {
      return "Online Store";
    } else if (type === "offline" && !ar) {
      return "Offline Store";
    }
  };

  render() {
    return (
      <div className={`update-store ${dark ? "dark" : ""}`}>
        <div className="update-store-overlay"></div>

        <div className="update-store-box">
          {this.state.updateLoading && (
            <div className="spinner-container">
              <Spinner1 />
            </div>
          )}

          <SocialMediaUpdate
            fbLink={this.state.fbLink}
            igLink={this.state.igLink}
            siteLink={this.state.siteLink}
            whatsapp={this.state.whatsapp}
            setFblink={(link) => this.setState({ fbLink: link })}
            setIglink={(link) => this.setState({ igLink: link })}
            setSitelink={(link) => this.setState({ siteLink: link })}
            setWhatsapp={(number) => this.setState({ whatsapp: number })}
          />
          {this.state.errorMessage !== "" && (
            <div
              className="error-modal"
              style={{
                height:
                  document.querySelector(".update-store-box").scrollHeight +
                  "px",
              }}
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
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2>{this.state.errorMessage}</h2>
              <p>Please close this popup and try again.</p>
              <button onClick={this.closeUpdateStore}>Close Popup</button>
            </div>
          )}
          <div className="image">
            <img
              src={this.state.logo === "" ? defaultStore : this.state.logo}
              alt=""
              className="main-update-store-img"
              id="main-update-store-img"
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

          <div className={`store-type ${ar ? "ar" : ""}`}>
            <div className={ar ? "ar" : ""}>
              {this.store_type(this.state.type)}
            </div>
          </div>

          <Form
            ref={(c) => {
              this.form = c;
            }}
            onSubmit={this.handleUpdateStore}
          >
            <div className={`flex-input ${ar ? "ar" : ""}`}>
              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="name"
                value={this.state.name}
                placeholder={ar ? "اسم المتجر" : "store name"}
                onChange={this.handleInputChange}
                validations={[storeName]}
              />

              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="niche"
                value={this.state.niche}
                placeholder={ar ? "نوع المتجر" : "Type"}
                onChange={this.handleInputChange}
                validations={[category]}
              />
            </div>

            <div className={`flex-input ${ar ? "ar" : ""}`}>
              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="phone"
                value={this.state.phone}
                placeholder={ar ? "رقم المحمول" : "Phone number"}
                onChange={this.handleInputChange}
                validations={[PhoneNumber]}
              />

              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="address"
                value={this.state.address}
                placeholder={ar ? "العنوان" : "Address"}
                onChange={this.handleInputChange}
                validations={[address]}
              />
            </div>

            <TextArea
              type="text"
              className={`form-control data-input ${ar ? "ar" : ""}`}
              value={this.state.description}
              name="description"
              placeholder={ar ? "وصف المتجر" : "Description"}
              onChange={this.handleInputChange}
              validations={[description]}
            />

            <div className="flex-btns">
              <div
                className={`get-directions-btn ${
                  this.state.location_got ? "location_got" : ""
                }`}
                onClick={() => this.getDirections()}
              >
                <div className={`get-directions-btn-info ${ar ? "ar" : ""}`}>
                  {!this.state.location_got && (
                    <>
                      {ar ? " تغيير الاتجاهات" : "Get directions"}
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
                      {ar ? "تم تغيير الاتجاهات" : "Directions received"}
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
              <div
                className={`social-media-update-button ${ar ? "ar" : ""}`}
                onClick={() => {
                  this.toggleSocialmediaBoard();
                }}
              >
                {ar ? "تحديث بيانات التواصل" : "Update social links"}
              </div>
            </div>
            <div className="flex-btns">
              <div className="close-box">
                <div
                  onClick={() => {
                    this.closeUpdateStore();
                  }}
                  className={`close-update-box ${ar ? "ar t-center" : ""}`}
                >
                  {ar ? "إغلاق" : "Cancel"}
                </div>
              </div>

              <div className="form-floating ">
                <input
                  type="submit"
                  className={`form-control ${ar ? "ar t-center" : ""}`}
                  value={ar ? "تحديث المتجر" : "Update store"}
                />
              </div>
            </div>
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

export default UpdateStore;
