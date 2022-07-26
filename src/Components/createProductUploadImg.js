import { useState } from "react";
import axios from "axios";
import Steps from "./createProductSteps";
import Meta from "./createProductMeta";
import { Alert } from "@mui/material";
//importing Assets
import CloseIcon from "../Assets/Images/close.png";

//importing helper functions
import { validationImages } from "../Helper/ProductValidations";

//local storage
const dark = localStorage["darkMode"];
const ar = localStorage["ar"];
const JWT = localStorage["JWT"];

//getProductData
const getProductData = async (productID) => {
  try {
    const res = await axios({
      method: "GET",
      url: `https://sale-hunter.herokuapp.com/api/v1/products/${productID}`,
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
    });
    if (res.data) {
      return res.data.product.images;
    }
  } catch (err) {
    console.log(err);
  }
};

const ProductImage = (props) => {
  const [Next, setNext] = useState(false);
  // eslint-disable-next-line
  const [Perv, setPerv] = useState(false);
  const [imageRight, setImageRight] = useState("");
  const [imageMiddle, setImageMiddle] = useState("");
  const [imageLeft, setImageLeft] = useState("");
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);
  //set product data
  if (props.productID) {
    getProductData(props.productID);
  }
  //handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    if (reader && file) reader.readAsDataURL(file);

    if (e.target.name === "imageLeft") {
      reader.onloadend = () => {
        setImageLeft(reader.result);
      };
    }
    if (e.target.name === "imageMiddle") {
      reader.onloadend = () => {
        setImageMiddle(reader.result);
      };
    }
    if (e.target.name === "imageRight") {
      reader.onloadend = () => {
        setImageRight(reader.result);
      };
    }
  };
  //prevent submit form
  const hanldeForm = (e) => {
    e.preventDefault();
  };
  //submit form
  const submitForm = (e) => {
    const error = validationImages(imageLeft, imageMiddle, imageRight);
    if (error) {
      setError(true);
      setErrorList(error);
    }
    if (error.length === 0) setNext(true);
  };

  const closeAddProduct = () => {
    document.querySelector("#add-product").style.display = "none";
    setImageLeft("");
    setImageMiddle("");
    setImageRight("");
  };
  return (
    <div className="container">
      {!Next && (
        <div className="content">
          <img
            className="close-icon"
            src={CloseIcon}
            alt="close"
            onClick={() => closeAddProduct()}
          />

          <div className={`product-data ${dark ? "dark-window" : ""}`}>
            <Steps active="image" />
            <div className={`step-info ${ar ? "ar" : ""} `}>
              <h2 className={ar ? "ar" : ""}>
                {!ar ? " Product Images" : " صور المنتج"}
              </h2>
              <p className={ar ? "ar" : ""}>
                {!ar ? " Upload product image" : "قم برفع صور المنتج "}
              </p>
            </div>
            <form onSubmit={hanldeForm}>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div
                  className="upload-images"
                  style={{ backgroudColor: "#F00" }}
                >
                  <input
                    id="file1"
                    type="file"
                    name="imageLeft"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <label
                    htmlFor="file1"
                    className={`upload-header ${ar ? "ar" : ""}
                  ${dark ? "dark-text" : ""}`}
                  >
                    {!ar
                      ? "  Click or drag files to upload"
                      : " انقر أو اسحب الملفات للتحميل"}
                  </label>
                  {imageLeft && (
                    <img className="img" src={imageLeft} alt="image1" />
                  )}
                  {imageLeft && (
                    <img
                      className="close-icon"
                      src={CloseIcon}
                      alt="close"
                      onClick={() => {
                        setImageLeft("");
                      }}
                    />
                  )}
                </div>
                <div className="upload-images">
                  <input
                    id="file2"
                    type="file"
                    name="imageMiddle"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  <label
                    htmlFor="file2"
                    className={`upload-header ${ar ? "ar" : ""}
                  ${dark ? "dark-text" : ""}`}
                  >
                    {!ar
                      ? "  Click or drag files to upload"
                      : " انقر أو اسحب الملفات للتحميل"}
                  </label>
                  {imageMiddle && (
                    <img className="img" src={imageMiddle} alt="image1" />
                  )}
                  {imageMiddle && (
                    <img
                      className="close-icon"
                      src={CloseIcon}
                      alt="close"
                      onClick={() => setImageMiddle("")}
                      accept="image/*"
                    />
                  )}
                </div>
                <div className="upload-images">
                  <input
                    id="file3"
                    type="file"
                    name="imageRight"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="file3"
                    className={`upload-header ${ar ? "ar" : ""}
                  ${dark ? "dark-text" : ""}`}
                  >
                    {!ar
                      ? "  Click or drag files to upload"
                      : " انقر أو اسحب الملفات للتحميل"}
                  </label>
                  {imageRight && (
                    <img className="img" src={imageRight} alt="image1" />
                  )}
                  {imageRight && (
                    <img
                      className="close-icon"
                      src={CloseIcon}
                      alt="close"
                      onClick={() => setImageRight("")}
                    />
                  )}
                </div>
              </div>
              {error &&
                errorList.map((error, key) => (
                  <Alert className={ar ? "ar" : ""} severity="error" key={key}>
                    {error}
                  </Alert>
                ))}
              <div className="btns">
                {/* <div className="button ">
                  <button className="btn-fill" onClick={() => pervHandler()}>
                    {!ar ? "Previous step" : "الخطوة السابقة"}
                  </button>
                </div> */}
                <div className="button">
                  <button className="btn-fill" onClick={() => submitForm()}>
                    {!ar ? "Next Step" : " الخطوة التالية"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className={ar ? "ar" : ""}>
        {Next && (
          <Meta
            images={[imageLeft, imageMiddle, imageRight]}
            nameAr={props.nameAr}
            nameEn={props.nameEn}
            sale={props.sale}
            price={props.price}
            categoryAr={props.categoryAr}
            categoryEn={props.categoryEn}
            storeID={props.storeID}
          />
        )}
        {/* {Perv && <BasicInfo />} */}
      </div>
    </div>
  );
};
export default ProductImage;
