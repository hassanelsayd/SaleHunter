import React, { useState } from "react";
import axios from "axios";

import Spinner2 from "./spinners/Spinner2";

//importing style
import "../styles/store/deleteStore.css";

//local storage
const ar = localStorage["ar"];
const JWT = localStorage["JWT"];

const DeleteProduct = (props) => {
  const [loading, setLoading] = useState(false);

  const deleteRequest = async () => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `https://sale-hunter.herokuapp.com/api/v1/stores/${props.storeID}/products/${props.productID}`,
        headers: {
          authorization: `Bearer ${JWT}`,
        },
      });
      setLoading(true);

      if (res) window.location.reload();
    } catch (err) {
      console.log(console.error(err));
    }
  };
  return (
    <div
      className="delete-alert"
      style={{ display: "flex", position: "fixed", zIndex: 1000 }}
    >
      <div className="delete-alert-overlay"></div>
      <div className="delete-box">
        <div className="delete-view">
          <div className="delete-icon">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          <div className="text">
            <h2 className={`title ${ar ? "ar" : ""}`}>
              {ar ? "هل انت متأكد؟" : "Are you sure?"}
            </h2>
            <div className={`message ${ar ? "ar t-center" : ""}`}>
              {ar
                ? "تذكر، لا يمكنك استعادة بيانات المنتج بعد حذفه"
                : "Remember, you cant restore your product"}
            </div>
          </div>

          <div className="buttons">
            <span
              onClick={() => props.setVisibility(false)}
              className={`btn ${ar ? "ar t-center" : ""}`}
            >
              {ar ? "إغلاق" : "Cancel"}
            </span>
            <span
              onClick={() => deleteRequest()}
              className={`btn ${ar ? "ar  t-center" : ""}`}
            >
              {" "}
              {loading ? <Spinner2 /> : ar ? "حذف" : "Delete"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
