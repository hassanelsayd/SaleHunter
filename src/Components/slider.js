import React, { useEffect, useState } from "react";
import Product from "./Product";
import "../styles/slider.css";
import { SalehunterSpinner } from "./spinners/salehunterSpinner";

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

const Slider = (props) => {
  //initial state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.items.length === 0) {
      setIsLoading(true);
    } else if (props.items.length > 0) {
      setIsLoading(false);
    }
  }, [props.items]);

  // Start slider arrows
  const hideLeftBtn = () => {
    const slider = document.querySelector(`.products-slider.${props.for}`);
    if (slider.scrollLeft === 0) {
      document
        .querySelector(`.scroll__left.${props.for}`)
        .classList.add("disabled");
    }
  };

  const handleArrows = () => {
    const slider = document.querySelector(`.products-slider.${props.for}`);

    if (slider.scrollLeft === 0) {
      document
        .querySelector(`.scroll__left.${props.for}`)
        .classList.add("disabled");
    } else if (slider.scrollLeft > 0) {
      document
        .querySelector(`.scroll__left.${props.for}`)
        .classList.remove("disabled");
    }
    if (slider.scrollWidth - slider.clientWidth === slider.scrollLeft) {
      document
        .querySelector(`.scroll__right.${props.for}`)
        .classList.add("disabled");
    } else if (slider.scrollWidth - slider.clientWidth > slider.scrollLeft) {
      document
        .querySelector(`.scroll__right.${props.for}`)
        .classList.remove("disabled");
    }
  };

  // Scroll To Left Button Handler
  const handleScrollingLeft = () => {
    const slider = document.querySelector(`.products-slider.${props.for}`);
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft -= 250;
    slider.style.scrollBehavior = "unset";
  };

  // Scroll To right Button Handler
  const handleScrollingRight = () => {
    const slider = document.querySelector(`.products-slider.${props.for}`);
    slider.style.scrollBehavior = "smooth";
    slider.scrollLeft += 250;
    document.querySelector(".scroll__left").classList.remove("disabled");
    slider.style.scrollBehavior = "unset";
  };

  // End slider arrows

  // Start Draggig Mouse Scrolling

  // First Step
  const mouseDownEvent = (e) => {
    const slider = document.querySelector(`.products-slider.${props.for}`);
    slider.classList.add("active");
    setIsDown(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  // Second step
  const mouseMoveEvent = (e) => {
    if (!isDown) {
      return;
    }
    e.preventDefault();
    const slider = document.querySelector(`.products-slider.${props.for}`);
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  };

  // 3rd step
  const mouseUpEvent = () => {
    const slider = document.querySelector(`.products-slider.${props.for}`);
    slider.classList.remove("active");
    setIsDown(false);
  };

  // Last step
  const mouseLeaveEvent = () => {
    const slider = document.querySelector(`.products-slider.${props.for}`);
    slider.classList.remove("active");
    setIsDown(false);
  };
  let dark = localStorage.getItem("darkMode");
  if (dark) {
    sheet.insertRule(
      ".product-content .product-header .product-img img{padding: 0 !important ; object-fit: cover !important ;}"
    );
    sheet.insertRule(
      ".product-content .product-info{ background-color:#303030; height: 155px !important;}"
    );
    sheet.insertRule(
      ".product-content .product-info .product-details .model{ color:#fff !important;}"
    );
  }

  // End Draggig Mouse Scrolling
  return (
    <div className="h-scroll" onLoad={hideLeftBtn}>
      <div className="buttons">
        <button
          onClick={handleScrollingLeft}
          className={`scroll__left ${props.for}`}
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={handleScrollingRight}
          className={`scroll__right ${props.for}`}
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      {!isLoading && (
        <div
          className={`products-slider ${props.for}`}
          onScroll={handleArrows}
          onMouseDown={mouseDownEvent}
          onMouseLeave={mouseLeaveEvent}
          onMouseUp={mouseUpEvent}
          onMouseMove={mouseMoveEvent}
        >
          {props.items.map((item) => {
            return (
              <Product
                name={item.product_title}
                arName={item.product_title_ar}
                brand={item.product_brand}
                image={item.image_url}
                rate={item.product_rating}
                price={parseFloat(item.product_price).toFixed(2)}
                logo={item.store_logo}
                store_type={item.store_type}
                store_logo={item.store_logo}
                sale={item.product_sale}
                key={item.product_id}
                id={item.product_id}
                isFavourite={item.is_favourite}
                from={props.from}
              />
            );
          })}
        </div>
      )}
      {isLoading && (
        <div className="spinner">
          {" "}
          <SalehunterSpinner />{" "}
        </div>
      )}
    </div>
  );
};

export default Slider;
