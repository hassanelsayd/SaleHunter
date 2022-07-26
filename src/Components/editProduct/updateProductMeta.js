import { useState } from "react";

//from and validation
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/textarea";

//import components
import Steps from "../createProductSteps";
import { Alert } from "@mui/material";
import Spinner3 from "../../Components/spinners/Spinner3";
//importing Assets
import CloseIcon from "../../Assets/Images/close.png";
import axios from "axios";

//importing helper functions
import { validationMeta } from "../../Helper/ProductValidations";

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
const Meta = (props) => {
  // eslint-disable-next-line
  const [perv, setPerv] = useState(false);
  const [brand, setBrand] = useState((newState) =>
    props.meta.length > 0 ? props.meta[0] : ""
  );
  const [descriptionAr, setDescriptionAr] = useState((newState) =>
    props.meta.length > 0 ? props.meta[2] : ""
  );
  const [descriptionEn, setDescriptionEn] = useState((newState) =>
    props.meta.length > 0 ? props.meta[1] : ""
  );
  const [error, setError] = useState(false);
  const [errorList, setErrorList] = useState([]);
  const [loading, setloading] = useState(false);

  //set product data
  if (props.productID) {
    getProductData(props.productID).then((data) => {});
  }
  // Function To set state to input value
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand") setBrand(value);
    if (name === "descriptionAr") setDescriptionAr(value);
    if (name === "descriptionEn") setDescriptionEn(value);
  };
  //prevent submit form
  const hanldeForm = (e) => {
    e.preventDefault();
  };

  //submit form
  const submitForm = () => {
    const error = validationMeta(brand, descriptionAr, descriptionEn);
    if (error) {
      setError(true);
      setErrorList(error);
    }

    if (error.length === 0) {
      axios({
        method: "PATCH",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${props.storeID}/products/${props.productID}`,
        data: {
          title: props.nameEn,
          title_ar: props.nameAr,
          sale: props.sale,
          description: descriptionEn,
          description_ar: descriptionAr,
          price: props.price,
        },
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      })
        .then((res) => {
          setloading(true);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };

  const closeAddProduct = () => {
    props.setVisibility(false);
  };
  return (
    <div className="container">
      {!perv && (
        <div className="content">
          <img
            className="close-icon"
            src={CloseIcon}
            alt="close"
            onClick={() => closeAddProduct()}
          />
          {/* <h1 className={ar ? "ar" : ""}>
            {" "}
            {!ar ? "Add Product" : "اضافة منتج جديد"}
          </h1> */}
          <div className={`product-data ${dark ? "dark-window" : ""}`}>
            <Steps active="meta" />
            <div className={`step-info ${ar ? "ar" : ""} `}>
              <h2 className={ar ? "ar" : ""}>
                {!ar ? " Meta data" : "البيانات الوصفية "}
              </h2>
              <p className={ar ? "ar" : ""}>
                {" "}
                {!ar ? "Fill all Information below" : "املأ جميع المعلومات"}
              </p>
            </div>
            <Form onSubmit={hanldeForm}>
              <div>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="product-brand">
                    {" "}
                    {!ar ? "Brand" : "الماركة"}
                  </label>
                  <Input
                    type="text"
                    id="product-brand"
                    name="brand"
                    value={brand}
                    onChange={handleChange}
                    disabled={true}
                  />
                </div>

                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="product-descriptionEn">
                    {!ar
                      ? "Product Description EN"
                      : "وصف المنتج باللغة الانجليزية"}
                  </label>
                  <Textarea
                    id="product-descriptionEn"
                    name="descriptionEn"
                    value={descriptionEn}
                    onChange={handleChange}
                  ></Textarea>
                </div>
                <div className={`product-input ${ar ? "ar" : ""} `}>
                  <label htmlFor="product-descriptionAr">
                    {!ar
                      ? "Product Description Ar"
                      : "وصف المنتج باللغة العربية"}
                  </label>
                  <Textarea
                    id="product-descriptionAr"
                    name="descriptionAr"
                    value={descriptionAr}
                    onChange={handleChange}
                  ></Textarea>
                </div>
                {error &&
                  errorList.map((error, key) => (
                    <Alert
                      className={ar ? "ar" : ""}
                      severity="error"
                      key={key}
                    >
                      {error}
                    </Alert>
                  ))}

                <div className="btns">
                  {/* <div className="button ">
                    <button className="btn-fill" onClick={() => handlePerv()}>
                      {!ar ? "Previous step" : "الخطوة السابقة"}
                    </button>
                  </div> */}
                  <div className="right-btns">
                    <div className="button">
                      <button className="btn-fill" onClick={() => submitForm()}>
                        {!ar ? "Save" : "حفظ"}
                      </button>
                    </div>
                    <div className=" button">
                      <button
                        className="btn-empty"
                        onClick={() => closeAddProduct()}
                      >
                        {!ar ? "Cancel" : "الغاء"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          {loading && <Spinner3 />}
        </div>
      )}
      {/* <div className={ar ? "ar" : ""}>{perv && <ProductImage />}</div> */}
    </div>
  );
};
export default Meta;
