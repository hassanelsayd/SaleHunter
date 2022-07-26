import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

// Importing Assets
import Discount from "../Assets/Images/discount.svg";
import search from "../Assets/Images/Search.svg";

//import redux
import { connect } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

// Import Styles
import "../styles/navbar.css";

const SearchField = () => {
  const [expand, setExpand] = useState(false);
  const expandSearchBar = () => {
    const navSearchBar = document.querySelector(".nav-search-bar");
    navSearchBar.classList.add("expanded");
    setExpand(true);
  };

  // Changing SearchTerm On Type
  const [searchTerm, setSearchTerm] = useState("");
  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const history = useHistory();
  const handleSearch = () => {
    history.push({
      pathname: `/term=${searchTerm}`,
      state: { searchTerm },
    });
    window.location.reload();
  };

  const voiceToText = () => {
    const text = document.querySelector(".nav-searchText");
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = `${ar ? "Ar" : "en-US"}`;

    recognition.addEventListener("result", (e) => {
      const phrase = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      text.value = phrase;
    });
    recognition.start();
  };
  return (
    <div className="nav-search-bar" onClick={expandSearchBar}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="image"
          src={search}
          alt="Search"
          className={`nav-search`}
          onClick={expand ? handleSearch : () => {}}
        />
        <input
          type="text"
          placeholder={
            ar ? "ادخل كلمات للبحث عنها ..." : "Enter Words To Search..."
          }
          className={`nav-searchText ${ar ? "ar" : ""}`}
          value={searchTerm}
          onChange={onSearchChange}
        />
        <i
          className="fa-solid fa-microphone  nav-mic"
          onClick={voiceToText}
          style={{ cursor: "pointer" }}
        ></i>
      </form>
    </div>
  );
};

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage["darkMode"];
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.togglerBtn = React.createRef();
    this.state = {
      dark: false,
      profile_img: null,
    };
  }
  componentDidMount() {
    if (userJWT) {
      axios
        .get("https://sale-hunter.herokuapp.com/api/v1/users", {
          headers: {
            Authorization: `Bearer ${userJWT}`,
          },
        })
        .then((response) => {
          const { user } = response.data;
          this.setState({
            profile_img: user.profile_img,
          });
        });
    }
  }

  showModal = () => {
    const signin_popup = document.querySelector(".sign-in-popup");
    signin_popup.removeAttribute("hidden");
  };

  showMenu = () => {
    const menu = document.querySelector(".menu");
    if (menu.classList.contains("navbar-expanded")) {
      menu.classList.remove("navbar-expanded");
    } else {
      menu.classList.add("navbar-expanded");
    }
  };

  render() {
    const modeToggler = () => {
      if (dark) {
        this.togglerBtn.current.style.transform = "translateX(0px)";
        localStorage.removeItem("darkMode");
        window.location.reload();
      }
      if (!dark) {
        this.togglerBtn.current.style.transform = "translateX(22px)";
        localStorage.setItem("darkMode", true);
        window.location.reload();
      }
    };
    const darkState = localStorage.getItem("darkMode");

    let darkModeStyle = {
      transform: null,
      transition: "0.5s all",
    };

    if (darkState) {
      darkModeStyle = {
        transform: "translateX(22px)",
        transition: "0.5s all",
      };
    }
    return (
      <div
        className={`header ${
          this.props.from !== "home" ? "with-search-bar" : ""
        } `}
      >
        <div className="container">
          <div className="navbar-menu-toggler" onClick={this.showMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          {this.props.from !== "home" && <SearchField />}
          <div className={`options`}>
            {/* Start Left Options */}
            {this.props.from === "home" && (
              <div
                style={{ cursor: "pointer" }}
                className="mode-toggler"
                onClick={modeToggler}
              >
                <span
                  style={darkModeStyle}
                  className="dark-toggler"
                  ref={this.togglerBtn}
                ></span>
              </div>
            )}

            <div className="language">
              <span className={`lang ${ar ? "ar" : ""}`}>
                {ar ? "اللغة العربيه" : "English"}
              </span>
              <FontAwesomeIcon icon={faSortDown} className="drop-menu" />
              <div className="language-list">
                <li
                  className="ar"
                  onClick={() => {
                    localStorage.setItem("ar", true);
                    window.location.reload();
                  }}
                >
                  اللغة العربيه
                </li>
                <li
                  onClick={() => {
                    localStorage.removeItem("ar");
                    window.location.reload();
                  }}
                >
                  English
                </li>
              </div>
            </div>
          </div>

          <div className="personalize">
            {/* Start Right Personalize */}

            {/* Discount Button */}
            <Link to="/sales">
              <div className="discount">
                <img src={Discount} alt="discount" className="discount" />
              </div>
            </Link>

            {/* Favourite Button */}
            <Link
              to={userJWT ? "/favourites" : ""}
              onClick={userJWT ? undefined : this.showModal}
            >
              <div className="opt fav">
                <FontAwesomeIcon icon={faHeart} className="icon" />
              </div>
            </Link>

            {/* User Button */}
            <Link
              to={userJWT ? "/profile" : ""}
              onClick={userJWT ? undefined : this.showModal}
            >
              <div className="opt user">
                {this.state.profile_img ? (
                  <img
                    src={this.state.profile_img}
                    alt="profile_img"
                    className="nav-profile-img"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="icon" />
                )}
              </div>
            </Link>
            {/* End Right Personalize */}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer,
  };
};
export default connect(mapStateToProps)(Navbar);
