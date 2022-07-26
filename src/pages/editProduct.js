import React, { Component } from "react";

//importing components

import BasicInfo from "../Components/editProduct/updateProductBasic";

//importing style
import "../styles/create-product.css";

//create new style sheet
const sheet = (function () {
  // Create the <style> tag
  var style = document.createElement("style");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")

  // WebKit hack :(
  style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.head.appendChild(style);

  return style.sheet;
})();

class EditProduct extends Component {
  render() {
    const dark = localStorage.getItem("darkMode");
    const ar = localStorage.getItem("ar");
    if (dark) {
      sheet.insertRule(
        `.add-product .product-data form .product-input input{background-color: #101010 !important;  color:#fff ;font-weight:700}}`
      );
      sheet.insertRule(
        `.add-product .product-data form .product-input textarea{ background-color: #101010 !important;}`
      );
      sheet.insertRule(
        `.css-1auycx3-MuiAutocomplete-root .MuiAutocomplete-tag{background-color: #101010; color:#eee}`
      );
      sheet.insertRule(
        `.btn-empty{ background-color: #101010 !important; color:#eee !important}`
      );
      sheet.insertRule(
        `.add-product .product-data{ background-color: #323232  !important;}`
      );
      sheet.insertRule(`.add-product .content h1{color: #eee !important;}`);
      sheet.insertRule(
        `.add-product .product-data .step-info h2{color: #eee !important;}`
      );
      sheet.insertRule(
        `.add-product .product-data .step-info p{color: #eee !important;}`
      );
      sheet.insertRule(
        `.add-product .product-data form label{color: #eee !important;}`
      );
    }
    if (ar) {
      sheet.insertRule(
        ` .add-product .product-data form .button{justify-content: flex-start !important;}`
      );
    }
    return (
      <div className={`${dark ? "dark" : " "} add-product`}>
        <div className="container">
          <BasicInfo
            storeID={this.props.storeID}
            productID={this.props.productID}
            setVisibility={(newState) => this.props.setVisibility(newState)}
          />
        </div>
      </div>
    );
  }
}
export default EditProduct;
