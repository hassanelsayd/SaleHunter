import React, { useState, useEffect } from "react";
// Importing Assets
import logo from "../Assets/Images/logo.svg";
import search from "../Assets/Images/Search.svg";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ar = localStorage.getItem("ar");
const SearchSection = (props) => {
  const [arabic] = useState((data) => (ar ? true : false));
  const [results, setResults] = useState([]);
  const history = useHistory();
  const handleSearch = () => {
    if (searchTerm !== "") {
      history.push({
        pathname: `/term=${searchTerm}`,
        state: { searchTerm },
      });
    }
  };

  const realTimeSearch = (term) => {
    history.push({
      pathname: `/term=${term}`,
      state: { searchTerm: term },
    });
  };

  // Changing SearchTerm On Type
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (searchTerm !== "") {
      axios({
        method: "GET",
        url: `https://sale-hunter.herokuapp.com/api/v1/products/search?queryText=${searchTerm}`,
      }).then((res) => {
        setResults(res.data.products);
      });
    }
    if (searchTerm === "") {
      setResults([]);
    }
  }, [searchTerm]);

  const onSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const addActiveClassToMic = () => {
    const mic = document.querySelector(".mic");
    mic.classList.add("active");
    setTimeout(() => {
      mic.classList.remove("active");
    }, 5000);
  };
  const voiceToText = () => {
    addActiveClassToMic();
    const text = document.querySelector(".searchText");
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
      setSearchTerm(phrase);
      text.value = phrase;
    });
    recognition.start();
    setTimeout(() => {
      recognition.stop();
    }, 5000);
  };
  return (
    <div className="search-section">
      <div className="container">
        {/* Main Image --Site Logo-- */}
        <div className="image">
          <img src={logo} alt="logo" className="logo" id="logo" />
        </div>

        {/* Main Search Bar */}

        <form
          className={`search-bar ${results.length > 0 ? "real-time" : ""}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="image"
            src={search}
            alt="Search"
            className="search"
            onClick={handleSearch}
          />
          <input
            type="text"
            placeholder={
              arabic ? "ابداً البحث الآن ..." : "Start searching now..."
            }
            className={`searchText ${arabic ? "ar" : ""}`}
            value={searchTerm}
            onChange={onSearchChange}
          />
          <i
            className="fa-solid fa-microphone mic"
            onClick={voiceToText}
            style={{ cursor: "pointer" }}
          ></i>
          {results.length > 0 && (
            <div className="real-time-result">
              {results.map((res) => {
                return (
                  <li
                    className={`${ar ? "ar" : ""}`}
                    onClick={() => {
                      realTimeSearch(res.title);
                    }}
                  >
                    {ar ? res.title_ar : res.title}
                  </li>
                );
              })}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(SearchSection);
