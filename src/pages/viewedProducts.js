import axios from "axios";
import React, { useEffect, useState } from "react";
import ViewedProductsTable from "../Components/viewdProductsTable";
import Navbar from "../Components/Navbar";
import BreadCrumb from "../Components/productComponents/BreadCrumb";
import "../styles/viewedProducts.css";
import Menu from "../Components/menu";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
import { connect } from "react-redux";
import NotLogged from "../Components/notLogged";
import { Helmet } from "react-helmet";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");
const ViewedProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [arabic] = useState((data) => (ar ? true : false));
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    setPageLoading(true);
    let config = {};
    if (userJWT) {
      config = {
        Authorization: `Bearer ${userJWT}`,
      };
    }

    axios({
      method: "GET",
      url: "https://sale-hunter.herokuapp.com/api/v1/products/viewed",
      headers: config,
    }).then((res) => {
      setProducts(res.data.products);
      setPageLoading(false);
    });
    //eslint-disable-next-line
  }, []);

  if (dark) {
    document.documentElement.style.background = "#101010";
    document.getElementById("root").style.background = "#101010";
  } else {
    document.documentElement.style = "";
    document.getElementById("root").style = "";
  }
  if (!props.isLoggedIn) {
    return <NotLogged />;
  }
  if (props.isLoggedIn) {
    return (
      <div className={`viewed-products ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>History</title>
          <link
            rel="icon"
            type="image/png"
            href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
            sizes="16x16"
          />
        </Helmet>
        <Navbar />
        <Menu from="history" />
        {!pageLoading && (
          <div className="container">
            <BreadCrumb />
            <div className={`page-title ${arabic ? "ar" : ""}`}>
              {arabic ? "المنتجات التي تمت مشاهدتها" : "Your Viewed Products"}
            </div>
            <ViewedProductsTable products={products} />
          </div>
        )}
        {pageLoading && (
          <div className="container">
            <div className="salehunter-spinner">
              <SalehunterSpinner />
            </div>
          </div>
        )}
      </div>
    );
  }
};

const mapStateToProps = function (state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(ViewedProducts);
