import React from "react";

// Import External Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// Import Stylesheet
import "../../styles/store/updateStore.css";

// Import FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

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

const ar = localStorage["ar"];

class SocialMediaUpdate extends React.Component {
  closeSocialmediaBoard = (e) => {
    e.preventDefault();
    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      if (
        document.querySelector(".social-media").classList.contains("active")
      ) {
        document.querySelector(".social-media").classList.remove("active");
      }
    }
  };

  onInputChange = (e) => {
    if (e.target.name === "fblink") {
      let facebookLink = e.target.value;
      let indexOfQuery = facebookLink.indexOf("?");
      if (indexOfQuery !== -1) {
        this.props.setFblink(facebookLink.slice(0, indexOfQuery));
      } else {
        this.props.setFblink(facebookLink);
      }
    } else if (e.target.name === "iglink") {
      let instagramLink = e.target.value;
      let indexOfQuery = instagramLink.indexOf("?");
      if (indexOfQuery !== -1) {
        this.props.setIglink(instagramLink.slice(0, indexOfQuery));
      } else {
        this.props.setIglink(instagramLink);
      }
    } else if (e.target.name === "whatsapp") {
      this.props.setWhatsapp(e.target.value);
    } else if (e.target.name === "siteLink") {
      this.props.setSitelink(e.target.value);
    }
  };

  render() {
    return (
      <div className="social-media">
        <Form
          ref={(b) => {
            this.form = b;
          }}
          onSubmit={this.closeSocialmediaBoard}
        >
          <div className={`input-container ${ar ? "ar" : ""}`}>
            <span className={ar ? "ar" : ""}>
              {" "}
              {ar ? "رابط فيسبوك" : "Facebook link"}
            </span>
            <Input
              type="text"
              className={`form-control data-input ${ar ? "ar" : ""}`}
              name="fblink"
              value={this.props.fbLink}
              onChange={this.onInputChange}
              placeholder={ar ? "فيسبوك" : "Facebook"}
              validations={[isValidHttpUrl]}
            />
          </div>
          <div className={`input-container ${ar ? "ar" : ""}`}>
            <span className={ar ? "ar" : ""}>
              {" "}
              {ar ? "رابط الانستاجرام" : "Instagram link"}
            </span>
            <Input
              type="text"
              className={`form-control data-input ${ar ? "ar" : ""}`}
              name="iglink"
              onChange={this.onInputChange}
              value={this.props.igLink}
              placeholder={ar ? "انستاجرام" : "Instagram"}
              validations={[isValidHttpUrl]}
            />
          </div>

          <div className={`input-container ${ar ? "ar" : ""}`}>
            <span className={ar ? "ar" : ""}>
              {" "}
              {ar ? "رابط موقعك" : "Website link"}
            </span>
            <Input
              type="text"
              className={`form-control data-input ${ar ? "ar" : ""}`}
              name="siteLink"
              value={
                this.props.siteLink !== null
                  ? this.props.siteLink
                  : ar
                  ? "انت لا تمتلك موقع إلكتروني"
                  : "You dont have website"
              }
              validations={[isValidHttpUrl]}
              onChange={this.onInputChange}
              placeholder={ar ? "الموقع الإلكتروني" : "Website"}
            />
          </div>
          <div className={`input-container ${ar ? "ar" : ""}`}>
            <span className={ar ? "ar" : ""}>
              {" "}
              {ar ? "رقم الواتساب" : "whatsapp"}
            </span>
            <Input
              type="text"
              className={`form-control data-input ${ar ? "ar" : ""}`}
              name="whatsapp"
              value={this.props.whatsapp}
              onChange={this.onInputChange}
              placeholder={ar ? "رقم الواتساب" : "Whatsapp number"}
              validations={[WhatsappNumber]}
            />
          </div>

          <div className="flex-btns">
            <div className="mt-3 mb-3">
              <Input
                type="submit"
                className={` update-links t-center ${ar ? "ar" : ""}`}
                value={ar ? "إكمال التحديث " : "Continue updating"}
              />
            </div>
          </div>

          <CheckButton
            style={{ display: "none" }}
            ref={(b) => {
              this.checkBtn = b;
            }}
          />
        </Form>
      </div>
    );
  }
}

export default SocialMediaUpdate;
