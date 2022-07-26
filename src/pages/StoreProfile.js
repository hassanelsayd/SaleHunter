import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import Product from "../Components/Product";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";

// Import external components
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { connect } from "react-redux";
import { WhatsappIcon, FacebookIcon } from "react-share";
import axios from "axios";
import { Helmet } from "react-helmet";

// Importing css files
import "../styles/store-profile.css";
import Mapbox from "../Components/Mapbox";

const ar = localStorage["ar"],
  dark = localStorage["darkMode"];

const StoreProfile = (props) => {
  // Component  state
  const [storeData, setStoreData] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const mapElement = useRef(null);
  // Function that request backend server to get store data
  const getStoreData = async (id) => {
    try {
      let res = await axios({
        method: "GET",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${id}`,
      });
      setStoreData(res.data.store);
      setProducts(res.data.products);
      setPageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const paging = async (id) => {
    try {
      let res = await axios({
        method: "GET",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${id}`,
        params: {
          limit: 20,
          page,
        },
      });
      setProducts(res.data.products);
      setPageLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect function work on component mounted
  useEffect(() => {
    getStoreData(props.match.params.store_id);
    // eslint-disable-next-line
  }, []);

  // useEffect function work on when pagenumber changed
  useEffect(() => {
    if (page !== 1) {
      paging(props.match.params.store_id);
      setPageLoading(true);
    }
    // eslint-disable-next-line
  }, [page, props.match.params.store_id]);

  // handle dark mode
  if (dark) {
    document.documentElement.style.background = "#101010";
    document.getElementById("root").style.background = "#101010";
  } else {
    document.documentElement.style = "";
    document.getElementById("root").style = "";
  }

  // change store type depends on language
  const handleStoreType = () => {
    if (ar && storeData.type === "online") {
      return "متجر عبر الإنترنت";
    } else if (ar && storeData.type === "offline") {
      return "متجر محلي";
    } else if (!ar && storeData.type === "online") {
      return "online store";
    } else if (!ar && storeData.type === "offline") {
      return "offline store";
    }
  };

  return (
    <div className={`store-profile ${dark ? "dark" : ""}`}>
      <Helmet>
        <title>Store profile</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
          sizes="16x16"
        />
      </Helmet>
      <Navbar />
      <Menu />
      {!pageLoading && (
        <div className="container">
          <div className="map-container" ref={mapElement}>
            <div className="overlay"></div>
            <div className="container">
              <div
                className="close-map"
                onClick={() => {
                  mapElement.current.style.visibility = "hidden";
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <Mapbox store={storeData} />
            </div>
          </div>

          <div className="store-profile-image">
            <img
              src={storeData.logo}
              alt={storeData.name}
              title={storeData.name}
            />
          </div>

          <div className={`store-type ${ar ? "ar" : ""}`}>
            <div className={ar ? "ar" : ""}>{handleStoreType()}</div>
          </div>

          <Form>
            <div className={`flex-input ${ar ? "ar" : ""}`}>
              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="storeName"
                value={storeData.name}
                placeholder={ar ? "اسم المتجر" : "store name"}
                disabled
              />

              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="storeType"
                value={
                  storeData.niche_market
                    ? storeData.niche_market
                    : ar
                    ? "لا يوجد تخصص لهذا المتجر"
                    : "No type for this store"
                }
                placeholder={ar ? "نوع المتجر" : "Type"}
                disabled
              />
            </div>

            <div className={`flex-input ${ar ? "ar" : ""}`}>
              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="phoneNumber"
                value={
                  storeData.phone
                    ? storeData.phone
                    : ar
                    ? "لا يوجد رقم محمول لهذا المتجر"
                    : "No phone number for this store"
                }
                placeholder={ar ? "رقم المحمول" : "Phone number"}
                disabled
              />

              <Input
                type="text"
                className={`form-control data-input ${ar ? "ar" : ""}`}
                name="location"
                value={
                  storeData.address
                    ? storeData.address
                    : ar
                    ? "لا يوجد عنوان لهذا المتجر"
                    : "No address for this store"
                }
                placeholder={ar ? "العنوان" : "Address"}
                disabled
              />
            </div>

            <textarea
              type="text"
              className={`form-control data-input ${ar ? "ar" : ""}`}
              value={
                storeData.description
                  ? storeData.description
                  : ar
                  ? "لا يوجد وصف  لهذا المتجر"
                  : "No Description for this store"
              }
              name="description"
              placeholder={ar ? "وصف المتجر" : "Description"}
              disabled
            />
          </Form>

          {(storeData.whatsapp ||
            storeData.instagram ||
            storeData.facebook) && (
            <div className={`store-contact ${ar ? "ar" : ""}`}>
              <span className={ar ? "ar" : ""}>
                {ar
                  ? `تواصل مع ${storeData.name}:`
                  : `Contact ${storeData.name}:`}
              </span>

              <div className="social-btns">
                {storeData.whatsapp && (
                  <a
                    href={`https://wa.me/${storeData.whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsappIcon />
                  </a>
                )}
                {storeData.facebook && (
                  <a href={storeData.facebook} target="_blank" rel="noreferrer">
                    <FacebookIcon />
                  </a>
                )}

                {storeData.instagram && (
                  <a
                    href={storeData.instagram}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="insta-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                      </svg>
                    </div>
                  </a>
                )}

                <div
                  className="map-open"
                  onClick={() => {
                    mapElement.current.style.visibility = "visible";
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {products.length > 0 && (
            <div className="store-products">
              <span className={`${ar ? "ar" : ""}`}>
                {ar
                  ? `منتجات ${storeData.name}:`
                  : `${storeData.name} Products:`}{" "}
              </span>
              <div className="store-products-items">
                {products.map((product) => {
                  return (
                    <Product
                      key={product.id}
                      id={product.id}
                      name={product.title}
                      arName={product.title_ar}
                      brand={product.brand}
                      image={product.image}
                      rate={product.rating}
                      price={product.price}
                      store_type={storeData.type}
                      sale={product.sale}
                      isFavourite={product.is_favourite}
                    />
                  );
                })}
              </div>
            </div>
          )}
          {products.length > 0 && (
            <div className="pagination-btns">
              {page > 1 && (
                <button onClick={() => setPage(page - 1)}>Previous</button>
              )}
              <button onClick={() => setPage(page + 1)}>Next</button>
            </div>
          )}
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

const mapStateToProps = (state) => {
  const isLoggedIn = state.authReducer;
  return {
    isLoggedIn,
  };
};

export default connect(mapStateToProps)(StoreProfile);
