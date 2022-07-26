import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import CategoriesNavbar from "../Components/productComponents/categoriesNavbar";
import MuiBroadCrumb from "../Components/productComponents/BreadCrumb";
import "../styles/allResults.css";

//importing Components
import Filter from "../Components/productComponents/filter";
import Menu from "../Components/menu";

// Import Mui components
import SelectLabels from "../Components/productComponents/SortBtn";
import Product from "../Components/Product";
import { useHistory } from "react-router-dom";
// import Mui Components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";
import Mapbox from "../Components/Mapbox";

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");
function AllResults(props) {
  const [searchTerm] = useState(props.match.params.searchTerm);
  const [allproducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [prices, setPrices] = useState([]);
  const [sortValue, setSortValue] = useState("popular");
  const [cursor, setCursor] = useState(0);
  const [arabic] = useState((data) => (ar ? true : false));
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  // To Make Filters Apply On All Results
  const [categoriesFilter, setCategoriesFilter] = useState("");
  const [brandsFilter, setBrandsFilter] = useState("");
  const [minMax, setMinMax] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const history = useHistory();

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  const handleCategorySearch = (cat) => {
    history.push({
      pathname: `/cat=${cat}`,
      state: { cat },
    });
  };

  const getData = (direction) => {
    setPageLoading(true);
    let config = {};
    if (userJWT) {
      config = {
        language: "en",
        Authorization: `Bearer ${userJWT}`,
      };
    } else {
      config = {
        language: "en",
      };
    }
    axios({
      method: "GET",
      url: "https://sale-hunter.herokuapp.com/api/v1/products",
      params: {
        ...(props.from === "termSearch" ? { searchText: searchTerm } : {}),
        cursor: cursor,
        cursorDirection: direction,
        limit: 20,
        ...(props.from === "categorySearch"
          ? { category: props.match.params.categoryName }
          : { category: categoriesFilter === "" ? "all" : categoriesFilter }),
        brand: brandsFilter === "" ? "all" : brandsFilter,
        ...(minMax.length > 0 ? { price_min: minMax[0] } : {}),
        ...(minMax.length > 0 ? { price_min: minMax[1] } : {}),
        storeType: "offline",
      },
      headers: config,
    }).then((response) => {
      if (response) {
        setPageLoading(false);
        if (response.data.products.length > 0) {
          setCursor(
            response.data.products[response.data.products.length - 1].product_id
          );
          setAllProducts(response.data.products);
          window.scrollTo(0, window.screenTop);
        }
      }
    });
  };

  useEffect(() => {
    let config = {};
    if (userJWT) {
      config = {
        language: "en",
        Authorization: `Bearer ${userJWT}`,
      };
    } else {
      config = {
        language: "en",
      };
    }

    axios({
      method: "GET",
      url: "https://sale-hunter.herokuapp.com/api/v1/products",
      params: {
        ...(props.match.params.searchTerm ? { searchText: searchTerm } : {}),
        ...(props.match.params.categoryName
          ? { category: props.match.params.categoryName }
          : { category: categoriesFilter === "" ? "all" : categoriesFilter }),
        limit: 20,
        storeType: props.match.params.type,
      },
      headers: config,
    }).then((response) => {
      if (response) {
        setPageLoading(false);
        setAllProducts(response.data.products);
        setCursor(
          response.data.products[response.data.products.length - 1].product_id
        );

        response.data.products.map((product) => {
          return setCategories((prevState) => [
            ...prevState,
            product.product_category,
          ]);
        });

        response.data.products.map((product) => {
          return setBrands((prevState) => [
            ...prevState,
            product.product_brand,
          ]);
        });

        response.data.products.map((p) => {
          return setPrices((prevState) => [...prevState, p.product_price]);
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  if (sortValue === "nearest_store") {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });
  }

  const types = () => {
    if (props.match.params.type === "online" && arabic) {
      return "منتجات عبر الانترنت";
    } else if (props.match.params.type === "offline" && arabic) {
      return "منتجات المتاجر المحلية";
    } else if (props.match.params.type === "online") {
      return "Online products";
    } else if (props.match.params.type === "offline") {
      return "Offline products";
    }
  };

  if (dark) {
    document.documentElement.style.background = "#101010";
    document.getElementById("root").style.background = "#101010";
  } else {
    document.documentElement.style = "";
    document.getElementById("root").style = "";
  }
  return (
    <div className={`all-results ${dark ? "dark" : ""}`}>
      <Navbar />
      <Menu />
      {!pageLoading && (
        <>
          <CategoriesNavbar categories={new Set(categories)} />
          <div className="container">
            <div className={`page-details ${ar ? "ar" : ""}`}>
              <MuiBroadCrumb />
              <div className={`sort ${arabic ? "ar" : ""}`}>
                <h3 className={arabic ? "ar" : ""}>
                  {arabic ? "ترتبيب حسب :" : "Sort"}
                </h3>
                <SelectLabels
                  setSortValue={(newSortValue) => {
                    setSortValue(newSortValue);
                  }}
                  sortValue={sortValue}
                />
              </div>
            </div>

            <div className="page-details-sm">
              <div
                className="filters-button"
                onClick={() =>
                  (document.querySelector(".filter").style.display = "block")
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
                </svg>
              </div>
              <div
                className="sort-button"
                onClick={() =>
                  (document.querySelector(".sort-sm").style.display = "flex")
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M232.5 5.171C247.4-1.718 264.6-1.718 279.5 5.171L498.1 106.2C506.6 110.1 512 118.6 512 127.1C512 137.3 506.6 145.8 498.1 149.8L279.5 250.8C264.6 257.7 247.4 257.7 232.5 250.8L13.93 149.8C5.438 145.8 0 137.3 0 127.1C0 118.6 5.437 110.1 13.93 106.2L232.5 5.171zM498.1 234.2C506.6 238.1 512 246.6 512 255.1C512 265.3 506.6 273.8 498.1 277.8L279.5 378.8C264.6 385.7 247.4 385.7 232.5 378.8L13.93 277.8C5.438 273.8 0 265.3 0 255.1C0 246.6 5.437 238.1 13.93 234.2L67.13 209.6L219.1 279.8C242.5 290.7 269.5 290.7 292.9 279.8L444.9 209.6L498.1 234.2zM292.9 407.8L444.9 337.6L498.1 362.2C506.6 366.1 512 374.6 512 383.1C512 393.3 506.6 401.8 498.1 405.8L279.5 506.8C264.6 513.7 247.4 513.7 232.5 506.8L13.93 405.8C5.438 401.8 0 393.3 0 383.1C0 374.6 5.437 366.1 13.93 362.2L67.13 337.6L219.1 407.8C242.5 418.7 269.5 418.7 292.9 407.8V407.8z" />
                </svg>
              </div>
            </div>

            <div className="cats-sm">
              {[...new Set(categories)].map((cat) => {
                return (
                  <span
                    key={cat}
                    className="cat-sm"
                    onClick={() => handleCategorySearch(cat)}
                  >
                    {cat}
                  </span>
                );
              })}
            </div>
            <div className="sort-sm">
              <div className="sort-sm-box">
                <div
                  className={`close-btn ${ar ? "ar" : ""}`}
                  onClick={() =>
                    (document.querySelector(".sort-sm").style.display = "none")
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                  </svg>
                </div>
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    className={ar ? "ar" : ""}
                  >
                    {" "}
                    {ar ? "ترتيب حسب" : "Sort"}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={sortValue}
                    onChange={handleSortChange}
                  >
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="popular"
                      control={<Radio />}
                      label={ar ? "الأكثر شهره" : "Popular"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="priceAsc"
                      control={<Radio />}
                      label={ar ? "السعر تصاعدياً" : "Price Ascending"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="priceDsc"
                      control={<Radio />}
                      label={ar ? "السعر تنازلياً" : "Price Descending"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="rating"
                      control={<Radio />}
                      label={ar ? "التقييم" : "Rating"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="nearest_store"
                      control={<Radio />}
                      label={ar ? "اقرب متجر" : "Nearest Store"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="best_deal"
                      control={<Radio />}
                      label={ar ? "افضل صفقة" : "Best Deal"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="newest"
                      control={<Radio />}
                      label={ar ? "الأحدث" : "Newest"}
                    />
                    <FormControlLabel
                      className={ar ? "ar" : ""}
                      value="oldest"
                      control={<Radio />}
                      label={ar ? "الأقدم" : "Oldest"}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>

            <div className={`main-content ${ar ? "ar" : ""}`}>
              <Filter
                categories={new Set(categories)}
                searchTerm={searchTerm}
                setResult={(newResult) => {
                  setAllProducts(newResult);
                }}
                products={allproducts}
                minPrice={Math.min(...prices)}
                maxPrice={Math.max(...prices)}
                sortValue={sortValue}
                brands={new Set(brands)}
                handleCatFilter={(cats) => setCategoriesFilter(cats)}
                handleBrandsFilter={(brands) => setBrandsFilter(brands)}
                handleMinMax={(minmax) => setMinMax(minmax)}
                from={
                  props.match.params.categoryName
                    ? "categorySearch"
                    : "termSearch"
                }
                storeType={props.match.params.type}
                latitude={latitude}
                longitude={longitude}
                setBrands={(newState) => setBrands(newState)}
                setCategories={(newState) => setCategories(newState)}
              />

              <div className="search-results">
                {props.match.params.type === "offline" && (
                  <div
                    className="map-section"
                    style={{ width: "100%", height: "300px" }}
                  >
                    <Mapbox offline={allproducts} />
                  </div>
                )}

                <div className="products-type">
                  <h3 className={arabic ? "ar" : ""}>{types()}</h3>
                </div>
                <div className="result-section">
                  <div className="products_flex">
                    {allproducts.map((product) => {
                      return (
                        <Product
                          key={product.product_id}
                          id={product.product_id}
                          name={product.product_title}
                          arName={product.product_title_ar}
                          brand={product.product_brand}
                          image={product.image_url}
                          rate={product.product_rating}
                          price={product.product_price}
                          store_logo={product.store_logo}
                          store_type={product.store_type}
                          sale={product.product_sale}
                          isFavourite={product.is_favourite}
                        />
                      );
                    })}
                  </div>
                  <div className="cursor-direction">
                    <button
                      className={`prev-page ${ar ? "ar t-center" : ""}`}
                      onClick={() => {
                        getData("previous");
                      }}
                    >
                      {" "}
                      {arabic ? "السابق" : "Previous"}
                    </button>
                    <button
                      className={`next-page ${ar ? "ar t-center" : ""}`}
                      onClick={() => getData("next")}
                    >
                      {arabic ? "التالي" : "Next"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {pageLoading && (
        <div className="container">
          <div className="salehunter-spinner">
            <SalehunterSpinner />
          </div>
        </div>
      )}
    </div>
  );
}

export default AllResults;
