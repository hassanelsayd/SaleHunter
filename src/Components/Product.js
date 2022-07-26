import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/product.css";
import Rating from "@mui/material/Rating";
import Spinner2 from "./spinners/Spinner2";
import { ConvertToArabicNumbers } from "../Helper/ArabicNumbers";
import EditProduct from "../pages/editProduct";

//importing Components
import DeleteProduct from "./DeleteProduct";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage["darkMode"];

const Product = (props) => {
  const [executed, setExecuted] = useState(false);
  const [addFav, setAddFav] = useState(false);
  const [deleteFav, setDeleteFav] = useState(false);
  const [arabic] = useState((data) => (ar ? true : false));
  const [favLoading, setFavLoading] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);

  const [toggleDelete, setToggleDelete] = useState(false);

  const favToggler = (product_id, is_favourite) => {
    if (!executed) {
      if (is_favourite === 0) {
        setFavLoading(true);
        axios({
          method: "POST",
          url: `https://sale-hunter.herokuapp.com/api/v1/products/favourites/${product_id}`,
          headers: {
            Authorization: `Bearer ${userJWT}`,
          },
        }).then(() => {
          setFavLoading(false);
          setAddFav(true);
          setExecuted(true);
        });
      }
    }
    if (props.from === "favourite") {
      if (!executed) {
        if (is_favourite === 1) {
          setFavLoading(true);
          axios({
            method: "DELETE",
            url: `https://sale-hunter.herokuapp.com/api/v1/products/favourites/${product_id}`,
            headers: {
              Authorization: `Bearer ${userJWT}`,
            },
          }).then(() => {
            setFavLoading(false);
            setDeleteFav(true);
            setExecuted(true);
            props.setFavourites();
          });
        }
      }
    }
  };
  const modifyProduct = useRef(null);

  const {
    name,
    brand,
    image,
    rate,
    price,
    store_type,
    sale,
    isFavourite,
    id,
    arName,
    store_logo,
  } = props;
  let nameRefactor;

  if (name || arName) {
    nameRefactor = arabic ? arName.slice(0, 40) : name.slice(0, 40);
  }

  const type = () => {
    if (store_type === "online" && arabic) {
      return "عبر الانترنت";
    } else if (store_type === "offline" && arabic) {
      return "محلي";
    } else if (store_type === "online") {
      return "Online";
    } else if (store_type === "offline") {
      return "Offline";
    }
  };

  const price_data = () => {
    if (arabic) {
      return ConvertToArabicNumbers(parseInt(price).toFixed(2)) + "جم";
    } else {
      return parseInt(price).toFixed(2) + "L.E";
    }
  };

  const rating_data = () => {
    if (arabic && rate !== null) {
      return ConvertToArabicNumbers(parseInt(rate).toFixed(1));
    } else if (rate !== null) {
      return parseInt(rate).toFixed(1);
    } else if (arabic && rate === null) {
      return ConvertToArabicNumbers(0);
    } else if (rate === null) {
      return 0;
    }
  };

  const handleModifyProduct = (e) => {
    modifyProduct.current.classList.toggle("active");
  };

  return (
    <>
      <div className={`product ${arabic ? "ar" : ""} ${dark ? "dark" : ""}`}>
        {props.from === "dashboard" && (
          <div className="product-modify" ref={modifyProduct}>
            <div
              className={`product-modify-btn delete ${ar ? "ar" : ""}`}
              onClick={() => setToggleDelete(true)}
            >
              {ar ? "حذف المنتج" : "Delete Product"}
            </div>
            <div
              className={`product-modify-btn modify ${ar ? "ar" : ""}`}
              onClick={() => {
                setToggleUpdate(true);
              }}
            >
              {ar ? "تعديل المنتج" : "Modify Product"}
            </div>
          </div>
        )}

        <div className="product-content">
          <div className="product-header">
            <div className="offline-mark">
              <span className={`${arabic ? "ar" : ""}`}>{type()}</span>
            </div>
            {sale > 0 && (
              <div className={`sale ${ar ? "ar" : ""}`}>
                {sale !== 100 && (
                  <span className={`${ar ? "ar" : ""}`}>{`${
                    ar ? ConvertToArabicNumbers(sale.toFixed()) : sale.toFixed()
                  }%`}</span>
                )}
                {sale === 100 && (
                  <span
                    style={{ fontSize: "12px" }}
                    className={`${ar ? "ar" : ""}`}
                  >
                    {ar ? "مجاناً" : "Free"}
                  </span>
                )}
              </div>
            )}
            {props.from !== "recommended" && props.from !== "dashboard" && (
              <div
                className={`fav-toggle ${
                  addFav || isFavourite === 1 ? "active" : ""
                } ${deleteFav ? "disable" : ""}`}
                onClick={() => {
                  favToggler(id, isFavourite);
                }}
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
            )}

            {props.from === "dashboard" && (
              <div className="product-options">
                <div className="gear-icon" onClick={handleModifyProduct}>
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
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            )}
            <Link to={`/pid=${props.id}`} className="product-img">
              <img src={image} alt="product" className="product-image" />
            </Link>
          </div>

          <Link to={`/pid=${props.id}`} className="product-info">
            <div className="product-details">
              <span className={`brand-name ${ar ? "ar" : ""}`}>{brand}</span>
              <h3
                className={`model ${arabic ? "ar" : ""}`}
              >{`${nameRefactor}...`}</h3>
            </div>

            <div className="product-extra-details">
              <div>
                <div className={`rating ${ar ? "ar" : ""}`}>
                  <Rating
                    name="read-only"
                    value={rate === null ? 0 : parseInt(rate)}
                    readOnly
                  />
                  <span className={`review ${ar ? "ar" : ""}`}>
                    {rating_data()}
                  </span>
                </div>

                <div className="product-pricing">
                  <span className={`price ${ar ? "ar" : ""}`}>
                    {price_data()}
                  </span>
                </div>
              </div>
              <div className="store_logo">
                {store_logo && (
                  <img src={store_logo} alt="" className="brand-name" />
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {toggleUpdate && (
        <EditProduct
          productID={props.id}
          storeID={props.storeID}
          setVisibility={(newState) => setToggleUpdate(newState)}
        />
      )}

      {toggleDelete && (
        <DeleteProduct
          productID={props.id}
          storeID={props.storeID}
          setVisibility={(newState) => setToggleDelete(newState)}
        />
      )}
    </>
  );
};

export default Product;
