import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import BreadCrumb from "../Components/productComponents/BreadCrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../Components/Product";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
import { Helmet } from "react-helmet";

import ErrorImage from "../Assets/Images/error.svg";
const ar = localStorage["ar"];
const dark = localStorage["darkMode"];
const Sales = () => {
  const [products, setProducts] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);
  const getProducts = async () => {
    setPageLoading(true);
    try {
      const res = await axios({
        method: "GET",
        url: "https://sale-hunter.herokuapp.com/api/v1/products/sales",
      });
      if (res.data.products.length > 0) {
        setPageLoading(false);
        setProducts(res.data.products);
      }
    } catch (err) {
      console.log(err.response);
      setErrorOccured(true);
      setPageLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className={`sales ${dark ? "dark" : ""}`}>
      <Helmet>
        <title>On sale</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
          sizes="16x16"
        />
      </Helmet>
      <Navbar />
      <Menu from="sales" />
      <SignInPopUp />
      <SignUpPopUp />
      {!pageLoading && !errorOccured && (
        <div className="container">
          <BreadCrumb />

          <h2
            className={`${ar ? "ar" : ""}`}
            style={dark ? { color: "#c2c2c2" } : {}}
          >
            {ar ? "احدث العروض والخصومات" : "Latest offers and discounts"}
          </h2>
          <div className="grid-products">
            {products.map((product) => {
              return (
                <Product
                  key={product.id}
                  name={product.title}
                  arName={product.title_ar}
                  image={product.image}
                  store_type={product.store_type}
                  rate={product.rating}
                  sale={product.sale}
                  price={product.price}
                  store_logo={product.logo}
                  isFavourite={product.is_favourite}
                  id={product.id}
                  brand={product.brand}
                />
              );
            })}
          </div>
        </div>
      )}
      {errorOccured && (
        <div className="container">
          <div className="error-section">
            <img
              src={ErrorImage}
              alt="Some thing went wrong"
              title="Some thing went wrong"
            />
            <h2 className={`${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "عفواً، حدث خطأ ما !" : "Some Thing went wrong!"}
            </h2>
            <p className={`${ar ? "ar" : ""}`}>
              {ar
                ? "لا تقلق، كل شئ سيكون علي ما يرام، من الممكن ان تتحقق من اتصالك بالإنترنت او الضغط علي إعادة المحاولة"
                : "Don't Worry, every thing will be alright, You might check your internet connection or click on try again"}
            </p>
            <button
              className={`${ar ? "ar" : ""}`}
              onClick={() => {
                getProducts();
                setErrorOccured(false);
              }}
            >
              {" "}
              {ar ? "إعادة المحاولة" : "Try again"}
            </button>
          </div>
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
};
export default Sales;
