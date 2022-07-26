import { useState, useRef } from "react";
import axios from "axios";

//from and validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

//import components
import ProductImage from "./updateProductUploadImg";
import Steps from "../createProductSteps";

//importing utils
import { validationBasic } from "../../Helper/ProductValidations";
//mui

import { Alert } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "../../Assets/Images/close.png";

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
      return res.data.product;
    }
  } catch (err) {
    console.log(err);
  }
};

const BasicInfo = (props) => {
  const [Next, setNext] = useState(false);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState(0);
  const [categoryAr, setCategoryAr] = useState("");
  const [categoryEn, setCategoryEn] = useState("");
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [images, setImages] = useState([]);
  const [visited, setVisited] = useState(false);
  const [metaData, setMetaData] = useState([]);
  const popupModal = useRef(null);
  //set product data
  if (props.productID && !visited) {
    getProductData(props.productID).then((data) => {
      setNameAr(data.basic.product_title_ar);
      setNameEn(data.basic.product_title);
      setSale(data.basic.product_sale);
      setCategoryAr(data.basic.product_category_ar);
      setCategoryEn(data.basic.product_category);
      setPrice(data.prices[0].price);
      setImages([data.images]);
      setMetaData([
        data.basic.product_brand,
        data.basic.product_description,
        data.basic.product_description_ar,
      ]);
      setVisited(true);
    });
  }

  // Function To set state to input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nameEn") setNameEn(value);
    if (name === "nameAr") setNameAr(value);
    if (name === "price") setPrice(value);
    if (name === "sale") setSale(value);
    if (name === "categoryEn") setCategoryEn(value);
    if (name === "categoryAr") setCategoryAr(value);
  };

  //prevent submit form
  const hanldeForm = (e) => {
    e.preventDefault();
    const error = validationBasic(
      nameEn,
      nameAr,
      sale,
      price,
      categoryAr,
      categoryEn
    );
    if (error) {
      setError(true);
      setErrorList(error);
    }
    if (error.length === 0) setNext(true);
  };

  const closeAddProduct = (e) => {
    props.setVisibility(false);
    setNameAr("");
    setNameEn("");
    setCategoryAr("");
    setCategoryEn("");
    setPrice("");
    setSale(0);
  };

  return (
    <div className="container" ref={popupModal}>
      <div className="update-store-overlay"></div>

      {!Next && (
        <div className="content ">
          <img
            className="close-icon"
            src={CloseIcon}
            alt="close"
            onClick={() => closeAddProduct()}
          />

          <div
            className={`product-data ${dark ? "dark-window" : ""}`}
            id="basic"
          >
            {/* <Steps active="basic" /> */}
            <div className="steps-code-pen">
              <Steps active="basic" />
            </div>

            <div className={`step-info ${ar ? "ar" : ""} `}>
              <h2>{!ar ? "Basic Information" : "معلومات اساسية"}</h2>
              <p>
                {!ar ? "Fill all Information below" : "املأ جميع المعلومات"}
              </p>
            </div>
            <Form onSubmit={hanldeForm}>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div className="product-input">
                  <label htmlFor="product-name">
                    {!ar ? "Product Name EN" : " اسم المنتج باللغة الاجنبية"}
                  </label>
                  <Input
                    type="text"
                    id="product-name"
                    name="nameEn"
                    value={nameEn}
                    onChange={handleChange}
                  />
                </div>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="product-name-ar">
                    {!ar ? "Product Name Ar" : " اسم المنتج باللغة العربية"}
                  </label>
                  <Input
                    type="text"
                    id="product-name-ar"
                    name="nameAr"
                    value={nameAr}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div className="product-input">
                  <label htmlFor="price">
                    {" "}
                    {!ar ? "Price" : " سعر المنتج"}
                  </label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                  />
                </div>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="sale"> {!ar ? "Sale" : " قيمة الخصم"}</label>
                  <Input
                    type="number"
                    id="sale"
                    name="sale"
                    value={sale}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={`product-inputs ${ar ? "ar" : ""} `}>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="store-categoryEn">
                    {!ar ? "Category EN" : " التصنيف باللغة الاجنبية"}
                  </label>

                  <div id="store-categoryEn" name="categoryEn">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categorysEn}
                      value={categoryEn}
                      disabled={true}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </div>
                <div className="product-input">
                  <label htmlFor="store-category">
                    {" "}
                    {!ar ? "Category " : " التصنيف باللغة العربية"}
                  </label>

                  <div id="store-categoryAr" name="categoryAr">
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={categorysEn}
                      value={categoryAr}
                      disabled={true}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </div>
                </div>
              </div>
              {error &&
                errorList.map((error, key) => (
                  <Alert className={ar ? "ar" : ""} severity="error" key={key}>
                    {error}
                  </Alert>
                ))}

              <div className="button">
                <button className="btn-fill">
                  {!ar ? "Next Step" : " الخطوة التالية"}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}

      <div className={ar ? "ar" : ""}>
        {Next && (
          <ProductImage
            nameAr={nameAr}
            nameEn={nameEn}
            sale={sale}
            price={price}
            categoryAr={categoryAr}
            categoryEn={categoryEn}
            storeID={props.storeID}
            productID={props.productID}
            images={images}
            meta={metaData}
            setVisibility={(newState) => props.setVisibility(newState)}
          />
        )}
      </div>
    </div>
  );
};
export default BasicInfo;

const categorysEn = [
  {
    label: "Phones and Tablets",
  },
];
