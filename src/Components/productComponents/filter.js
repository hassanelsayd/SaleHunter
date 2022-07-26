import { useState, useEffect } from "react";
import axios from "axios";

//Importing FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

// Importing Matrial UI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Slider } from "@mui/material";

// Import framer Motion
import { motion } from "framer-motion/dist/framer-motion";

//importing style
import "../../styles/filter.css";

function valuetext(value) {
  return `${value} L.E`;
}

const ar = localStorage.getItem("ar");
function Filter(props) {
  const [categoriesFilters, setCategoriesFilters] = useState([]);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [minmax, setMinmax] = useState([]);
  const [value, setValue] = useState([props.minPrice, props.maxPrice]);
  const [chevronTogglerCategory, setChevronTogglerCategory] = useState(true);
  const [chevronTogglerPrice, setChevronTogglerPrice] = useState(true);
  const [chevronTogglerStore, setChevronTogglerStore] = useState(true);
  const [arabic] = useState((data) => (ar ? true : false));
  useEffect(() => {
    setValue([props.minPrice, props.maxPrice]);
  }, [props.minPrice, props.maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleMinMax = () => {
    setMinmax(value);
    props.handleMinMax(value);
  };

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://sale-hunter.herokuapp.com/api/v1/products`,
      headers: {
        language: "en",
        ...(props.latitude !== "" ? { latitude: props.latitude } : {}),
        ...(props.longitude !== "" ? { longitude: props.longitude } : {}),
      },
      params: {
        ...(props.from === "termSearch"
          ? { searchText: props.searchTerm }
          : {}),
        ...(props.from === "categorySearch"
          ? { category: props.categorySearch }
          : {
              category:
                categoriesFilters.length > 0
                  ? categoriesFilters.toString()
                  : "all",
            }),
        price_min: minmax[0],
        price_max: minmax[1],
        ...(props.sortValue === "nearest_store"
          ? props.latitude === ""
            ? {}
            : { sort: props.sortValue }
          : { sort: props.sortValue }),
        brand: brandsFilter.length > 0 ? brandsFilter.toString() : "all",
        ...(props.storeType ? { storeType: props.storeType } : {}),
        ...(props.sortValue === "nearest_store"
          ? { storeType: "offline" }
          : props.storeType
          ? { storeType: props.storeType }
          : {}),
      },
    })
      .then((response) => {
        if (response) {
          let brands = [],
            categories = [];
          props.setResult(response.data.products);
          if (props.setBrands) {
            response.data.products.map((product) => {
              brands.push(product.product_brand);
              return props.setBrands(brands);
            });
          }
          if (props.setCategories) {
            response.data.products.map((product) => {
              categories.push(product.product_category);
              return props.setCategories(categories);
            });
          }
        }
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });

    // eslint-disable-next-line
  }, [
    categoriesFilters,
    props.searchTerm,
    minmax,
    props.sortValue,
    brandsFilter,
    props.latitude,
    props.longitude,
  ]);
  return (
    <div className="filter">
      <div className="filter-title">
        <h2 className={`main-header ${arabic ? "ar" : ""}`}>
          {arabic ? "تصفية & تنقية" : "Filter & Refine"}
        </h2>
        <div
          className="close-btn"
          onClick={() =>
            (document.querySelector(".filter").style.display = "none")
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
          </svg>
        </div>
      </div>

      <motion.form layout>
        {/* Start Category Filtering */}
        {props.from !== "categorySearch" && (
          <div className="wrapper">
            <div className={`filter-title ${arabic ? "ar" : ""}`}>
              <motion.h2 layout={"position"} className={arabic ? "ar" : ""}>
                {arabic ? "الفئة" : "Category"}{" "}
              </motion.h2>
              <div
                className="icon"
                onClick={() => {
                  setChevronTogglerCategory(!chevronTogglerCategory);
                }}
              >
                <FontAwesomeIcon
                  icon={chevronTogglerCategory ? faChevronUp : faChevronDown}
                />
              </div>
            </div>

            {chevronTogglerCategory && (
              <div className="catigories-list">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  className="radio-filter"
                >
                  {[...props.categories].map((cat) => {
                    return (
                      <FormControlLabel
                        key={cat}
                        value={cat}
                        control={<Radio />}
                        label={cat}
                        onClick={(e) => {
                          setCategoriesFilters([cat]);
                          props.handleCatFilter(cat);
                        }}
                      />
                    );
                  })}
                  <FormControlLabel
                    value="all"
                    control={<Radio />}
                    label="All Categories"
                    onClick={(e) => {
                      setCategoriesFilters(["all"]);
                      props.handleCatFilter("all");
                    }}
                  />
                </RadioGroup>
              </div>
            )}
          </div>
        )}
        {/* End Category Filtering */}

        {/* Start Price Filtering */}
        <div className="wrapper price-range-wraper">
          <div className={`filter-title ${arabic ? "ar" : ""}`}>
            <h2 className={arabic ? "ar" : ""}>
              {" "}
              {arabic ? "السعر" : "Price"}{" "}
            </h2>
            <div
              className="icon"
              onClick={() => {
                setChevronTogglerPrice(!chevronTogglerPrice);
              }}
            >
              <FontAwesomeIcon
                icon={chevronTogglerPrice ? faChevronUp : faChevronDown}
              />
            </div>
          </div>
          {chevronTogglerPrice && (
            <div className="filter-item">
              <div className="slider">
                <div className="price-range">
                  <span className={arabic ? "ar" : ""}>
                    {value[0]} {arabic ? "جم" : "L.E"}
                  </span>
                  <span className={arabic ? "ar" : ""}>
                    {value[1]} {arabic ? "جم" : "L.E"}
                  </span>
                </div>
                <Slider
                  value={value}
                  onChange={handleChange}
                  onChangeCommitted={handleMinMax}
                  min={props.minPrice}
                  max={props.maxPrice}
                  getAriaValueText={valuetext}
                  className="filter-slider"
                />
              </div>
            </div>
          )}
        </div>
        {/* End Price Filtering */}

        {/* Start Brand Filtering */}
        <div className="wrapper">
          <div className={`filter-title ${arabic ? "ar" : ""}`}>
            <h2 className={arabic ? "ar" : ""}>
              {arabic ? "العلامة التجارية" : "Brand"}{" "}
            </h2>
            <div
              className="icon"
              onClick={() => {
                setChevronTogglerStore(!chevronTogglerStore);
              }}
            >
              <FontAwesomeIcon
                icon={chevronTogglerStore ? faChevronUp : faChevronDown}
              />
            </div>
          </div>
          {chevronTogglerStore && (
            <div className="filter-items">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                className="radio-filter"
              >
                {[...props.brands].map((brand) => {
                  return (
                    <FormControlLabel
                      key={brand}
                      value={brand}
                      control={<Radio />}
                      label={brand}
                      onClick={(e) => {
                        setBrandsFilter([brand]);
                        props.handleBrandsFilter(brand);
                      }}
                    />
                  );
                })}
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="All Brands"
                  onClick={(e) => {
                    setBrandsFilter(["all"]);
                    props.handleBrandsFilter("all");
                  }}
                />
              </RadioGroup>
            </div>
          )}
        </div>
        {/* End Brand Filtering */}
      </motion.form>
    </div>
  );
}
export default Filter;
