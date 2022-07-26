import { useEffect } from "react";
import "../styles/steps.css";

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

/*
const Active = (order) => {
  sheet.insertRule(
    `.progressbar  ul li:nth-child(${order}) { color: #ff4f04;}`,
    0
  );
  sheet.insertRule(
    `.progressbar  ul li:nth-child(${order}):before {background-color: #ff4f04;}`,
    0
  );
};

const Disable = (order) => {
  sheet.insertRule(
    `.progressbar  ul li:nth-child(${order}){color: #c5c5c5;}`,
    0
  );
  sheet.insertRule(
    `.progressbar  ul li:nth-child(${order}):before{background-color: #c5c5c5;}`,
    0
  );
};
*/

const Active = (order) => {
  sheet.addRule(`.progressbar  ul li:nth-child(${order})`, "color: #ff4f04;");
  sheet.addRule(
    `.progressbar  ul li:nth-child(${order}):before`,
    " background-color: #ff4f04;"
  );
};

const Disable = (order) => {
  sheet.addRule(`.progressbar  ul li:nth-child(${order})`, "color: #c5c5c5;");
  sheet.addRule(
    `.progressbar  ul li:nth-child(${order}):before`,
    " background-color: #c5c5c5;"
  );
};

//local storage
const ar = localStorage["ar"];

const Steps = ({ active }) => {
  useEffect(() => {
    if (active === "basic") {
      Active(1);
      Disable(2);
      Disable(3);
    } else if (active === "image") {
      Active(2);
      Disable(1);
      Disable(3);
    } else if (active === "meta") {
      Active(3);
      Disable(2);
      Disable(1);
    }
  });
  if (ar) {
    sheet.addRule(`.progressbar li:after`, "left:50% !important");
  }
  return (
    <div className="steps-container ">
      <ul className="progressbar ">
        <div className={`steps ${ar ? "ar" : ""}`}>
          <ul>
            <li>{!ar ? " Basic Info" : "معلومات أساسية"}</li>
            <li>{!ar ? " Product Image" : "صور المنتج"}</li>
            <li> {!ar ? " Meta data" : "البيانات الوصفية "}</li>
          </ul>
        </div>
      </ul>
    </div>
  );
};
export default Steps;
//className={$ar ? "ar" : ""}
