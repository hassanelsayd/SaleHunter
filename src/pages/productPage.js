import { useEffect, useState } from "react";

// importing internal components
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import BreadCrumb from "../Components/productComponents/BreadCrumb";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
import PriceTracker from "../Components/productComponents/priceTracker";
import Spinner1 from "../Components/spinners/Spinner1";
import Spinner2 from "../Components/spinners/Spinner2";
import Mapbox from "../Components/Mapbox";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
import { Helmet } from "react-helmet";

// importing external Libraries
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Importing Helper Functions
import { ConvertToArabicNumbers } from "../Helper/ArabicNumbers";

// importing styles
import "../styles/product-details.css";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");

const ProductDetails = (props) => {
  // Component State
  const [productBasic, setProductBasic] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productPrices, setProductPrices] = useState([]);
  const [productNumOfRatings, setProductNumOfRatings] = useState("");
  const [productAvgOfRatings, setProductAvgOfRatings] = useState("");
  const [store, setStore] = useState([]);
  const [views, setViews] = useState("");
  const [isFav, setIsFav] = useState(0);
  const [favLoading, setFavLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [rateDone, setRateDone] = useState(false);
  const [oldValue, setOldValue] = useState(0);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    setPageLoading(true);
    let config = {};
    if (userJWT) {
      config = {
        language: "en",
        Authorization: `Bearer ${userJWT}`,
      };
    } else {
      config = {
        language: "en",
      };
    }
    axios({
      method: "GET",
      url: `https://sale-hunter.herokuapp.com/api/v1/products/${props.match.params.productID}`,

      headers: config,
    }).then((response) => {
      if (response) {
        setPageLoading(false);
        setProductBasic(response.data.product.basic);
        setProductImages(response.data.product.images);
        setProductPrices(response.data.product.prices);
        setProductNumOfRatings(response.data.product.rating.number_of_ratings);
        setProductAvgOfRatings(response.data.product.rating.rating_average);
        setViews(response.data.product.views.number_of_views);
        setStore(response.data.product.store);
        setIsFav(response.data.product.is_favourite);
        setValue(response.data.product.user_rating);
        setOldValue(response.data.product.user_rating);
      }
    });
    // eslint-disable-next-line
  }, []);

  const addToFav = () => {
    let config = {};
    if (userJWT) {
      config = {
        language: "en",
        Authorization: `Bearer ${userJWT}`,
      };
    } else {
      config = {
        language: "en",
      };
    }
    if (!props.isLoggedIn) {
      document.querySelector(".sign-in-popup").removeAttribute("hidden");
    }
    if (props.isLoggedIn && isFav === 0) {
      setFavLoading(true);
      axios({
        method: "POST",
        url: `https://sale-hunter.herokuapp.com/api/v1/products/favourites/${props.match.params.productID}`,
        headers: config,
      }).then((res) => {
        axios({
          method: "GET",
          url: `https://sale-hunter.herokuapp.com/api/v1/products/${props.match.params.productID}`,
          headers: config,
        })
          .then((response) => {
            if (response) {
              setIsFav(response.data.product.is_favourite);
              setFavLoading(false);
            }
          })
          .catch(() => {
            setFavLoading(false);
          });
      });
    }
    if (props.isLoggedIn && isFav === 1) {
      setFavLoading(true);
      axios({
        method: "DELETE",
        url: `https://sale-hunter.herokuapp.com/api/v1/products/favourites/${props.match.params.productID}`,
        headers: config,
      }).then((res) => {
        axios({
          method: "GET",
          url: `https://sale-hunter.herokuapp.com/api/v1/products/${props.match.params.productID}`,
          headers: config,
        })
          .then((response) => {
            if (response) {
              setIsFav(response.data.product.is_favourite);
              setFavLoading(false);
            }
          })
          .catch(() => {
            setFavLoading(false);
          });
      });
    }
  };

  const handleUserRating = () => {
    let config = {};
    if (userJWT) {
      config = {
        language: "en",
        Authorization: `Bearer ${userJWT}`,
      };
    } else {
      config = {
        language: "en",
      };
    }
    if (value === 0) return;
    else {
      setLoading(true);
      axios({
        method: "PATCH",
        url: `https://sale-hunter.herokuapp.com/api/v1/products/${props.match.params.productID}/rating`,
        data: { rating: value },
        headers: config,
      }).then((res) => {
        setLoading(false);
        setRateDone(true);
      });
    }
  };

  const storeName_handle = () => {
    if (ar && store.store_name === "Jumia") {
      return "جوميا";
    } else if (ar && store.store_name === "Amazon") {
      return "امازون";
    } else {
      return store.store_name;
    }
  };

  const price_handle = () => {
    if (ar && productPrices.length > 0) {
      return ConvertToArabicNumbers(productPrices[0].price) + "   جم";
    } else if (productPrices.length > 0) {
      return productPrices[0].price + "  L.E";
    }
  };

  const oldPriceHandle = () => {
    if (ar && productBasic.product_sale > 0 && productPrices.length > 0) {
      return ConvertToArabicNumbers(
        (
          productPrices[0].price /
          (1 - productBasic.product_sale / 100)
        ).toFixed() + " جم"
      );
    } else if (productBasic.product_sale > 0 && productPrices.length > 0) {
      return (
        (
          productPrices[0].price /
          (1 - productBasic.product_sale / 100)
        ).toFixed() + " L.E"
      );
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://sale-hunter.vercel.app/pid=${props.match.params.productID}`
    );
    document.querySelector(".copy-link").classList.add("active");
  };

  if (dark) {
    document.documentElement.style.background = "#101010";
    document.getElementById("root").style.background = "#101010";
  } else {
    document.documentElement.style = "";
    document.getElementById("root").style = "";
  }
  const changeMainImage = (e) => {
    document.querySelector(".product-info-main-image-container img").src =
      e.target.src;
    document
      .querySelectorAll(".product-info-alternative-image")
      .forEach((el) => {
        el.classList.remove("active");
      });
    e.target.classList.add("active");
  };
  return (
    <div className={`product-details ${dark ? "dark" : ""}`}>
      <Helmet>
        <title>
          {ar ? productBasic.product_title_ar : productBasic.product_title}
        </title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
          sizes="16x16"
        />
      </Helmet>
      <Navbar />
      <Menu />
      <SignInPopUp />
      <SignUpPopUp />
      {!pageLoading && (
        <div className="container">
          <BreadCrumb
            productTitle={
              productBasic.product_title
                ? ar
                  ? productBasic.product_title_ar.slice(0, 30) + "..."
                  : productBasic.product_title.slice(0, 30) + "..."
                : ""
            }
          />
          <div className="product-info">
            <div className={`product-info-images `}>
              <div className="product-info-main-image-container">
                <img
                  title={
                    ar
                      ? productBasic.product_title_ar
                      : productBasic.product_title
                  }
                  className="product-info-main-image"
                  src={productImages.length > 0 ? productImages[0].img_url : ""}
                  alt={
                    ar
                      ? productBasic.product_title_ar
                      : productBasic.product_title
                  }
                />
              </div>
              <div className="product-info-alternative-images-container">
                {productImages.map((image, i) => {
                  return (
                    <img
                      key={image.img_id}
                      className={`product-info-alternative-image ${
                        i === 0 ? "active" : ""
                      }`}
                      src={productImages.length > 0 ? image.img_url : ""}
                      alt={productBasic.product_title}
                      onClick={changeMainImage}
                    />
                  );
                })}
              </div>
            </div>

            <div className={`product-info-basic ${ar ? "ar" : ""}`}>
              <span className={`product-info-store-name ${ar ? "ar" : ""}`}>
                {storeName_handle()}
              </span>
              <h3 className="product-info-brand">
                {productBasic.product_brand}
              </h3>
              <h2 className={`product-info-title ${ar ? "ar" : ""}`}>
                {ar
                  ? productBasic.product_title_ar
                  : productBasic.product_title}
              </h2>

              <h1 className={`product-info-price ${ar ? "ar" : ""}`}>
                {price_handle()}{" "}
                <span className="old-price">{oldPriceHandle()}</span>
              </h1>
              {productBasic.product_description !== null && (
                <div className="product-description">
                  <h4 className={`${ar ? "ar" : ""}`}>
                    {ar ? "❞ " : "❝ "}
                    {ar
                      ? productBasic.product_description_ar
                      : productBasic.product_description}
                    {ar ? " ❝" : " ❞  "}
                  </h4>
                </div>
              )}

              <div className="product-info-rating">
                <Rating
                  name="read-only"
                  value={parseInt(productAvgOfRatings)}
                  readOnly
                />
                <p className={`product-info-rating-avg ${ar ? "ar" : ""}`}>
                  {ar
                    ? ConvertToArabicNumbers(Math.floor(productAvgOfRatings))
                    : Math.floor(productAvgOfRatings)}
                </p>
                <p className={`product-info-rating-num ${ar ? "ar" : ""}`}>
                  (
                  {ar
                    ? ConvertToArabicNumbers(productNumOfRatings)
                    : productNumOfRatings}
                  )
                </p>
              </div>

              <div className="product-info-store-type">
                {store.store_type === "online" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M94.92 49.09L117.7 13.13C122.8 4.98 131.9 .0007 141.6 .0007H498.4C508.1 .0007 517.2 4.979 522.3 13.13L579.6 103.8C609.3 150.7 583 215.8 527.5 223.2C523.6 223.7 519.6 224 515.4 224C489.4 224 466.2 212.6 450.3 195C434.4 212.6 411.2 224 385.1 224C359 224 335.8 212.6 319.9 195C314.4 201.1 308.1 206.4 301.2 210.7L480 350.9V250.7C491.2 254.1 503.1 256 515.4 256C521 256 526.4 255.6 531.7 254.9L531.7 254.9C535.1 254.4 540 253.6 544 252.6V401.1L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L94.92 49.09zM112.2 223.2C68.36 217.3 42.82 175.1 48.9 134.5L155.3 218.4C145.7 222 135.3 224 124.4 224C120.3 224 116.2 223.7 112.2 223.2V223.2zM160 384H365.5L514.9 501.7C504.8 508.2 492.9 512 480 512H160C124.7 512 96 483.3 96 448V252.6C99.87 253.6 103.9 254.4 107.1 254.9L108.1 254.9C113.3 255.6 118.8 256 124.4 256C136.8 256 148.8 254.1 160 250.6V384z" />
                    </svg>
                    <span className={ar ? "ar" : ""}>
                      {" "}
                      {ar ? "عبر الإنترنت" : "Online"}
                    </span>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M495.5 223.2C491.6 223.7 487.6 224 483.4 224C457.4 224 434.2 212.6 418.3 195C402.4 212.6 379.2 224 353.1 224C327 224 303.8 212.6 287.9 195C272 212.6 248.9 224 222.7 224C196.7 224 173.5 212.6 157.6 195C141.7 212.6 118.5 224 92.36 224C88.3 224 84.21 223.7 80.24 223.2C24.92 215.8-1.255 150.6 28.33 103.8L85.66 13.13C90.76 4.979 99.87 0 109.6 0H466.4C476.1 0 485.2 4.978 490.3 13.13L547.6 103.8C577.3 150.7 551 215.8 495.5 223.2H495.5zM499.7 254.9C503.1 254.4 508 253.6 512 252.6V448C512 483.3 483.3 512 448 512H128C92.66 512 64 483.3 64 448V252.6C67.87 253.6 71.86 254.4 75.97 254.9L76.09 254.9C81.35 255.6 86.83 256 92.36 256C104.8 256 116.8 254.1 128 250.6V384H448V250.7C459.2 254.1 471.1 256 483.4 256C489 256 494.4 255.6 499.7 254.9L499.7 254.9z" />
                    </svg>
                    <span className={ar ? "ar" : ""}>
                      {" "}
                      {ar ? "متجر محلي" : "Offline"}
                    </span>
                  </>
                )}
              </div>
              <div className="product-info-controls">
                <div className="product-info-views">
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
                  <span
                    className={`product-info-views-number ${ar ? "ar" : ""}`}
                  >
                    {ar ? ConvertToArabicNumbers(views) : views}
                  </span>
                  <span className={ar ? "ar" : ""}>
                    {" "}
                    {ar ? "    مشاهدات" : "Views"}
                  </span>
                </div>

                <div
                  className={`add-to-fav ${isFav === 1 ? "active" : ""}`}
                  onClick={addToFav}
                >
                  {!favLoading && (
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
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}

                  {favLoading && <Spinner2 />}
                </div>
                {store.store_type === "offline" && (
                  <Link
                    to={`/store-profile=${store.store_id}`}
                    className="product-info-store-profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M0 155.2C0 147.9 2.153 140.8 6.188 134.7L81.75 21.37C90.65 8.021 105.6 0 121.7 0H518.3C534.4 0 549.3 8.021 558.2 21.37L633.8 134.7C637.8 140.8 640 147.9 640 155.2C640 175.5 623.5 192 603.2 192H36.84C16.5 192 .0003 175.5 .0003 155.2H0zM64 224H128V384H320V224H384V464C384 490.5 362.5 512 336 512H112C85.49 512 64 490.5 64 464V224zM512 224H576V480C576 497.7 561.7 512 544 512C526.3 512 512 497.7 512 480V224z" />
                    </svg>
                  </Link>
                )}
              </div>
              {store.store_type === "online" && (
                <div className="product-info-store-data">
                  <div className={`product-info-site ${ar ? "ar" : ""}`}>
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
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    <a
                      className={ar ? "ar" : ""}
                      href={productBasic.product_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      {ar ? "الذهاب لصفحة المنتج" : "Go to product site"}
                    </a>
                  </div>
                  <Link
                    to={`/store-profile=${store.store_id}`}
                    className="product-info-store-profile"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M0 155.2C0 147.9 2.153 140.8 6.188 134.7L81.75 21.37C90.65 8.021 105.6 0 121.7 0H518.3C534.4 0 549.3 8.021 558.2 21.37L633.8 134.7C637.8 140.8 640 147.9 640 155.2C640 175.5 623.5 192 603.2 192H36.84C16.5 192 .0003 175.5 .0003 155.2H0zM64 224H128V384H320V224H384V464C384 490.5 362.5 512 336 512H112C85.49 512 64 490.5 64 464V224zM512 224H576V480C576 497.7 561.7 512 544 512C526.3 512 512 497.7 512 480V224z" />
                    </svg>
                  </Link>
                </div>
              )}
              <div className="product-social-share">
                <h3 className={ar ? "ar" : ""}>
                  {" "}
                  {ar ? "شارك المنتج" : "Share Product"}
                </h3>
                <div className="product-social-share-items">
                  <WhatsappShareButton
                    title="Please visit this link to track this product price"
                    url={`https://sale-hunter.vercel.app/pid=${props.match.params.productID}`}
                  >
                    <WhatsappIcon />
                  </WhatsappShareButton>
                  <FacebookShareButton
                    quote="Please visit this link to track this product price"
                    url={`https://sale-hunter.vercel.app/pid=${props.match.params.productID}`}
                  >
                    <FacebookIcon />
                  </FacebookShareButton>
                  <TwitterShareButton
                    title="Please visit this link to track this product price"
                    url={`https://sale-hunter.vercel.app/pid=${props.match.params.productID}`}
                  >
                    <TwitterIcon />
                  </TwitterShareButton>

                  <div className="copy-link" onClick={() => copyLink()}>
                    <div className="copy-link-inner">
                      <div className="copy-link-front">
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
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="copy-link-back">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="product-user-rating">
            {!props.isLoggedIn && (
              <>
                <span className={ar ? "ar" : ""}>
                  {" "}
                  {ar ? "قم بتقييم المنتج" : "Rate the product"}
                </span>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={() => {
                    document.querySelector(".not-logged-msg").style.visibility =
                      "visible";
                  }}
                />
                <div
                  className={`product-user-rating-submit ${ar ? "ar" : ""}`}
                  onClick={() =>
                    (document.querySelector(
                      ".not-logged-msg"
                    ).style.visibility = "visible")
                  }
                >
                  {ar ? "إرسال التقييم" : "Submit"}
                </div>
                <div className="not-logged-msg">
                  <span className={ar ? "ar" : ""}>
                    {" "}
                    {ar
                      ? "سجل الدخول لتتمكن من تقييم المنتج"
                      : "Log in to rate the product"}
                  </span>
                  <Link className={ar ? "ar" : ""} to="/sign-in">
                    {ar ? "تسجيل الدخول" : "Login"}
                  </Link>
                </div>
              </>
            )}
            {props.isLoggedIn && oldValue === 0 && !rateDone && !loading && (
              <>
                <span className={ar ? "ar" : ""}>
                  {" "}
                  {ar ? "قم بتقييم المنتج" : "Rate the product"}
                </span>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <div
                  className={`product-user-rating-submit ${ar ? "ar" : ""}`}
                  onClick={handleUserRating}
                >
                  {ar ? "إرسال التقييم" : "Submit"}
                </div>
              </>
            )}
            {props.isLoggedIn && oldValue !== 0 && !rateDone && !loading && (
              <>
                <span className={ar ? "ar" : ""}>
                  {" "}
                  {ar ? "اخر تقييم لك هو " : "Your last rate is "}
                  {ar ? ConvertToArabicNumbers(oldValue) : oldValue}{" "}
                </span>
                <p className={`lead ${ar ? "ar" : ""}`}>
                  {ar
                    ? "يمكنك تحديث تقييمك الآن."
                    : "You can update your rate now."}
                </p>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <div
                  className={`product-user-rating-submit ${ar ? "ar" : ""}`}
                  onClick={handleUserRating}
                >
                  {ar ? "تحديث التقييم" : "Submit"}
                </div>
              </>
            )}

            {loading && <Spinner1 />}
            {rateDone && (
              <div className="rate-got-container">
                <span className={ar ? "ar" : ""}>
                  {" "}
                  {ar
                    ? "تم استلام تقييمك بنجاح"
                    : "Your Rate has been received"}
                </span>
                <svg
                  className="rate_got"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z" />
                </svg>
              </div>
            )}
          </div>
          <div className="product-info-advanced">
            <PriceTracker prices={productPrices} storeType={store.store_type} />
            <div
              className={`map ${
                store.store_type === "offline" ? "expand" : ""
              } `}
            >
              {store.store_type === "offline" && <Mapbox store={store} />}
            </div>
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

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
}
export default connect(mapStateToProps)(ProductDetails);
