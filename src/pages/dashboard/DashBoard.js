import React, { useEffect, useState } from "react";

// Import internal components
import Navbar from "../../Components/Navbar";
import Menu from "../../Components/menu";
import DeleteAlert from "../../Components/store/deleteStore";
import UpdateStore from "../../Components/store/updateStore";
import AddProduct from "../createProduct";

import { SalehunterSpinner } from "../../Components/spinners/salehunterSpinner";

// Import external components
import { connect } from "react-redux";
import axios from "axios";
import { WhatsappIcon, FacebookIcon } from "react-share";
import { Helmet } from "react-helmet";

// Importing styles
import "../../styles/dashboard.css";

// Importing assets
import defaultStore from "../../Assets/Images/default-store.jpg";
import defaultProfile from "../../Assets/Images/default-profile.png";
import Product from "../../Components/Product";
import NoStore from "../../Components/store/noStore";
import NotLogged from "../../Components/notLogged";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage["ar"];
const dark = localStorage["darkMode"];

const DashBoard = (props) => {
  const [user, setUser] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [storeProducts, setStoreProducts] = useState([]);
  const [storeID, setStoreID] = useState(null);
  const [pageLoader, setPageLoader] = useState(true);
  const [haveStore, setHaveStore] = useState(false);
  const [addProductModal, setAddProductModal] = useState(false);

  // Show Context-menu toggler
  const showContextMenu = () => {
    if (
      document
        .querySelector(".store-opts-context-menu")
        .classList.contains("active")
    ) {
      document
        .querySelector(".store-opts-context-menu")
        .classList.remove("active");
    } else {
      document
        .querySelector(".store-opts-context-menu")
        .classList.add("active");
    }
  };
  // get user data Method (Store id)
  const getUserData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://sale-hunter.herokuapp.com/api/v1/users",
        headers: { Authorization: `Bearer ${userJWT}` },
      });
      setUser(res.data.user);
      if (res.data.user.store_id !== null) {
        setHaveStore(true);
        setStoreID(res.data.user.store_id);
        getStoreData(res.data.user.store_id);
      }
      if (res.data.user.store_id === null) {
        setPageLoader(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // get store data Method
  const getStoreData = async (store_id) => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${store_id}`,
        headers: { Authorization: `Bearer ${userJWT}` },
      });

      if (res.data) {
        setStoreProducts(res.data.products);
        setStoreData(res.data.store);
        setPageLoader(false);
        if (res.data.products.length === 0) {
          document.querySelector(".store-dashboard").style.height = "100vh";
        }
      }
    } catch (err) {
      console.error(err.response);
    }
  };

  // Get user Data if there is Logged in user (get Store id)
  useEffect(() => {
    if (props.isLoggedIn) getUserData();
    // eslint-disable-next-line
  }, [props.isLoggedIn]);

  // Function that open modal to delete store
  const showDeleteModal = () => {
    document.querySelector(".delete-alert").style.display = "flex";
    document.querySelector(".delete-view").classList.remove("disable");
  };

  const showUpdateStore = () => {
    document.querySelector(".update-store").style.display = "flex";
  };

  if (dark) {
    document.documentElement.style.background = "#101010";
    document.getElementById("root").style.background = "#101010";
  } else {
    document.documentElement.style = "";
    document.getElementById("root").style = "";
  }
  if (props.isLoggedIn) {
    return (
      <div className={`store-dashboard ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>DashBoard</title>
          <link
            rel="icon"
            type="image/png"
            href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
            sizes="16x16"
          />
        </Helmet>
        <Navbar />
        <Menu from="dashboard" />
        {props.isLoggedIn && !pageLoader && haveStore && (
          <div className="container">
            {storeID !== null && (
              <>
                <div className="store-data">
                  <div className="store-data-blur">
                    <div className="blur"></div>
                    <div className="blur"></div>
                  </div>
                  <div className={`store-owner-data ${ar ? "ar" : ""}`}>
                    <h3 className={`store-owner-name ${ar ? "ar" : ""}`}>
                      {user.fullname}
                    </h3>
                    <img
                      src={
                        user.profile_img !== null
                          ? user.profile_img
                          : defaultProfile
                      }
                      alt={user.fullname}
                      title={user.fullname}
                    />
                  </div>
                  <div className="store-data-details">
                    <div className="store-img">
                      <img
                        src={
                          storeData.logo !== null
                            ? storeData.logo
                            : defaultStore
                        }
                        alt="store-logo"
                      />
                    </div>
                    <div className={`store-text ${ar ? "ar" : ""}`}>
                      <h3 className={`store-text-field name ${ar ? "ar" : ""}`}>
                        {storeData.name}
                      </h3>
                      <h5 className={`store-text-field  ${ar ? "ar" : ""}`}>
                        <span className={ar ? "ar" : ""}>
                          {" "}
                          {ar ? "تخصص المتجر:" : "Niche market :"}{" "}
                        </span>
                        {storeData.niche_market}
                      </h5>
                      <h5 className={`store-text-field  ${ar ? "ar" : ""}`}>
                        <span className={ar ? "ar" : ""}>
                          {" "}
                          {ar ? "العنوان :" : "Address :"}
                        </span>
                        {storeData.address}
                      </h5>
                      {storeData.phone !== null && (
                        <h5 className={`store-text-field  ${ar ? "ar" : ""}`}>
                          <span className={ar ? "ar" : ""}>
                            {" "}
                            {ar ? "رقم الهاتف :" : "Phone number :"}{" "}
                          </span>
                          {storeData.phone}
                        </h5>
                      )}
                      {storeData.description !== null && (
                        <h5 className={`store-text-field  ${ar ? "ar" : ""}`}>
                          <span className={ar ? "ar" : ""}>
                            {" "}
                            {ar ? "وصف المتجر :" : "Description :"}{" "}
                          </span>
                          {storeData.description}
                        </h5>
                      )}

                      <div className="store-text-social">
                        {storeData.whatsapp !== null && (
                          <a
                            href={
                              storeData.whatsapp !== ""
                                ? `https://wa.me/${storeData.whatsapp}`
                                : ``
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <WhatsappIcon />
                          </a>
                        )}
                        {storeData.facebook !== null && (
                          <a
                            href={
                              storeData.facebook !== ""
                                ? `${storeData.facebook}`
                                : ""
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FacebookIcon />
                          </a>
                        )}
                        {storeData.instagram !== null && (
                          <a
                            href={
                              storeData.instagram !== ""
                                ? `${storeData.instagram}`
                                : ""
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="custom-icon insta-icon">
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
                        {storeData.website !== null && (
                          <a
                            href={
                              storeData.website !== ""
                                ? `${storeData.website}`
                                : ""
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="custom-icon">
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
                                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </a>
                        )}
                      </div>

                      <div className={`store-opts-group ${ar ? "ar" : ""}`}>
                        <div className="gear" onClick={() => showContextMenu()}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="store-opts-btn"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div
                          className={`store-opts-context-menu ${
                            dark ? "dark-text " : ""
                          }`}
                        >
                          <li
                            className={ar ? "ar" : ""}
                            onClick={showUpdateStore}
                          >
                            {" "}
                            {ar ? "تحديث المتجر" : "Update Store"}
                          </li>
                          <li
                            className={ar ? "ar" : ""}
                            onClick={() => showDeleteModal()}
                          >
                            {ar ? "حذف المتجر" : "Delete Store"}
                          </li>
                          <li
                            className={ar ? "ar" : ""}
                            onClick={() => setAddProductModal(true)}
                          >
                            {" "}
                            {ar ? "اضافة منتج" : "Add product"}
                          </li>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {storeProducts.length > 0 && (
                  <div className="store-products">
                    {storeProducts && (
                      <h2 className={`${ar ? "ar" : ""}`}>
                        {ar ? "منتجاتي" : "My products"}
                      </h2>
                    )}
                    <div className="grid-products">
                      {storeProducts.map((product) => {
                        return (
                          <Product
                            name={product.title}
                            arName={product.title_ar}
                            brand={product.brand}
                            image={product.image}
                            rate={product.rating}
                            price={parseFloat(product.price).toFixed(2)}
                            store_type="offline"
                            store_logo={storeData.logo}
                            sale={product.sale}
                            key={product.id}
                            id={product.id}
                            isFavourite={product.is_favourite}
                            from="dashboard"
                            storeID={storeID}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}

            <DeleteAlert email={user.email} storeID={storeData.id} />
            <UpdateStore storeID={storeData.id} />

            {addProductModal && (
              <AddProduct
                storeID={storeID}
                setVisibility={(newState) => setAddProductModal(newState)}
              />
            )}
          </div>
        )}

        {props.isLoggedIn && !pageLoader && !haveStore && <NoStore />}

        {pageLoader && (
          <div className={`container ${dark ? "drak" : ""}`}>
            <div className={`salehunter-spinner ${dark ? "drak" : ""}`}>
              <SalehunterSpinner />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (!props.isLoggedIn) {
    return <NotLogged />;
  }
};

function mapStateToProps(state) {
  const { isLoggedIn } = state.authReducer;
  return {
    isLoggedIn,
  };
}

export default connect(mapStateToProps)(DashBoard);
