import { useEffect, useState } from "react";

import axios from "axios";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
import "../styles/favourites.css";
import { connect } from "react-redux";
import NotLogged from "../Components/notLogged";
import { Helmet } from "react-helmet";

// Import Mui components
import Product from "../Components/Product";
import BreadCrumb from "../Components/productComponents/BreadCrumb";

import emptyPage from "../Assets/Images/empty_page.png";
import ErrorImage from "../Assets/Images/error.svg";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");
function Favourites(props) {
  const [products, setProducts] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);

  const getProducts = async () => {
    let config = {};

    if (userJWT) {
      config = {
        Authorization: `Bearer ${userJWT}`,
      };
    }

    try {
      let res = await axios({
        method: "GET",
        url: "https://sale-hunter.herokuapp.com/api/v1/products/favourites",
        headers: config,
      });

      if (res) {
        setProducts(res.data.products);
        setPageLoading(false);
        if (res.data.products.length === 0) {
          setEmpty(true);
        }
      }
    } catch (err) {
      setPageLoading(false);
      setErrorOccured(true);
    }
  };
  useEffect(() => {
    if (props.isLoggedIn) {
      getProducts();
    }
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
      <div className={`favourites ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>Favourites</title>
          <link
            rel="icon"
            type="image/png"
            href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
            sizes="16x16"
          />
        </Helmet>
        <Navbar />
        <Menu from="favourites" />
        {!pageLoading && !errorOccured && (
          <div className="container">
            <BreadCrumb />
            <div className={`page-title ${ar ? "ar" : ""}`}>
              {ar ? "المنتجات المفضله" : "Favourites"}
            </div>
            <div className="products-flex">
              {products.map((product) => {
                return (
                  <Product
                    arName={product.title_ar}
                    id={product.id}
                    name={product.title}
                    image={product.image}
                    rate={product.rating}
                    price={product.price}
                    logo={product.logo}
                    store_type={product.store_type}
                    store_name={product.store_name}
                    sale={product.product_sale}
                    isFavourite={1}
                    key={product.id}
                    from="favourite"
                    setFavourites={() => getProducts()}
                  />
                );
              })}
              {empty && (
                <div className="page-placeholder">
                  <img
                    src={emptyPage}
                    alt="There is no favourite Products"
                    title="There is no favourite Products"
                  />
                  <div className="page-placeholder-info">
                    <h2 className={ar ? "ar" : ""}>
                      {ar
                        ? "ليس لديك أي منتجات مفضلة"
                        : "You don't have any favourite products"}
                    </h2>
                    <p className={`lead ${ar ? "ar" : ""}`}>
                      {ar
                        ? "يمكنك إضافة منتج إلى المفضلة من خلال النقر على القلب الذي يظهر في الزاوية اليسرى العلوية للمنتج."
                        : "You can add an product to favourites by clicking on the heart that shows on the top right corner of the product."}
                    </p>
                  </div>
                </div>
              )}
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
                  setPageLoading(true);
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
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
}
export default connect(mapStateToProps)(Favourites);
