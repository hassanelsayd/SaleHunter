import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//importing Components
import CategoriesNavbar from "../Components/productComponents/categoriesNavbar";
import MuiBroadCrumb from "../Components/productComponents/BreadCrumb";
import Filter from "../Components/productComponents/filter";
import Slider from "../Components/slider";
import Navbar from "../Components/Navbar";
import Menu from "../Components/menu";
import Mapbox from "../Components/Mapbox";
// Import components
import SortBtn from "../Components/productComponents/SortBtn";
import { Helmet } from "react-helmet";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";

// import Mui Components
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Import Styles
import "../styles/result.css";
import { SalehunterSpinner } from "../Components/spinners/salehunterSpinner";

// Function Returns Online Products
function online_product(products) {
  return products.filter((product) => product.store_type === "online");
}

// Function Returns Offline Products
function ofline_product(products) {
  return products.filter((product) => product.store_type === "offline");
}

const userJWT = localStorage.getItem("JWT");
const ar = localStorage.getItem("ar");
const dark = localStorage.getItem("darkMode");
class Result extends Component {
  searchTerm = this.props.match.params.searchTerm;

  handleSortChange = (event) => {
    this.setState({ sortValue: event.target.value });
  };

  componentDidMount() {
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
    let params = {};

    if (this.props.match.params.searchTerm) {
      params = {
        searchText: this.props.match.params.searchTerm,
      };
    } else if (this.props.match.params.categoryName) {
      params = {
        category: this.props.match.params.categoryName,
      };
    }

    axios({
      method: "GET",
      url: "https://sale-hunter.herokuapp.com/api/v1/products",
      params: params,
      headers: config,
    }).then((response) => {
      if (response) {
        this.setState({
          loading: false,
          searchResult: response.data.results,
          products: response.data.products,
        });

        if (response.data.products.length === 0) {
          if (ar) {
            this.setState({
              message: `لا يوجد نتائج بحث عن : ${this.searchTerm}`,
            });
          } else {
            this.setState({
              message: `There is no search results for : ${this.searchTerm}`,
            });
          }
        }

        response.data.products.map((product) => {
          return this.setState({
            categories: [...this.state.categories, product.product_category],
          });
        });
        response.data.products.map((product) => {
          return this.setState({
            brands: [...this.state.brands, product.product_brand],
          });
        });

        response.data.products.map((p) =>
          this.setState((previousState) => ({
            prices: [...previousState.prices, p.product_price],
          }))
        );
      }
    });
  }
  handleCategorySearch = (cat) => {
    this.props.history.push({
      pathname: `/cat=${cat}`,
      state: { cat },
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.match.params.searchTerm
        ? this.props.match.params.searchTerm
        : "",
      searchResult: [],
      products: [],
      categories: [],
      brands: [],
      prices: [],
      sortValue: "popular",
      message: "",
      longitude: "",
      latitude: "",
      // To Make Filters Apply On All Results
      categoriesFilter: "",
      brandsFilter: "",
      minMax: [],
      loading: true,
    };
  }

  render() {
    if (this.state.sortValue === "nearest_store") {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }

    const online = online_product(this.state.products);
    const offline = ofline_product(this.state.products);

    if (dark) {
      document.documentElement.style.background = "#101010";
      document.getElementById("root").style.background = "#101010";
    } else {
      document.documentElement.style = "";
      document.getElementById("root").style = "";
    }

    return (
      <div className={`result ${dark ? "dark" : ""}`}>
        <Helmet>
          <title>Search for {this.searchTerm}</title>
          <link
            rel="icon"
            type="image/png"
            href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
            sizes="16x16"
          />
        </Helmet>
        <Navbar />
        <Menu />
        <SignInPopUp />
        <SignUpPopUp />
        {!this.state.loading && (
          <>
            <CategoriesNavbar categories={new Set(this.state.categories)} />
            <div className="container">
              <div className={`page-details ${ar ? "ar" : ""}`}>
                <MuiBroadCrumb />
                <div className={`sort ${ar ? "ar" : ""}`}>
                  <h3 className={ar ? "ar" : ""}>
                    {ar ? "ترتبيب حسب :" : "Sort"}
                  </h3>
                  <SortBtn
                    setSortValue={(newSortValue) => {
                      this.setState({ sortValue: newSortValue });
                    }}
                    sortValue={this.state.sortValue}
                  />
                </div>
              </div>
              <div className={`page-details-sm`}>
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
                {[...new Set(this.state.categories)].map((cat) => {
                  return (
                    <span
                      key={cat}
                      className="cat-sm"
                      onClick={() => this.handleCategorySearch(cat)}
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
                      (document.querySelector(".sort-sm").style.display =
                        "none")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
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
                      value={this.state.sortValue}
                      onChange={this.handleSortChange}
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
                  categories={new Set(this.state.categories)}
                  searchTerm={
                    this.props.match.params.searchTerm
                      ? this.props.match.params.searchTerm
                      : ""
                  }
                  setResult={(newResult) => {
                    this.setState({ products: newResult });
                  }}
                  products={this.state.products}
                  minPrice={Math.min(...this.state.prices)}
                  maxPrice={Math.max(...this.state.prices)}
                  sortValue={this.state.sortValue}
                  brands={new Set(this.state.brands)}
                  handleCatFilter={(cats) =>
                    this.setState({ categoriesFilter: cats })
                  }
                  handleBrandsFilter={(brands) =>
                    this.setState({ brandsFilter: brands })
                  }
                  handleMinMax={(minmax) => this.setState({ minMax: minmax })}
                  from={
                    this.props.match.params.categoryName
                      ? "categorySearch"
                      : "termSearch"
                  }
                  categorySearch={
                    this.props.match.params.categoryName
                      ? this.props.match.params.categoryName
                      : ""
                  }
                  longitude={this.state.longitude}
                  latitude={this.state.latitude}
                  setBrands={(newBrands) =>
                    this.setState({ brands: newBrands })
                  }
                  setCategories={(newState) =>
                    this.setState({ categories: newState })
                  }
                />

                <div className="search-results">
                  <div className="search-breif">
                    {offline.length > 0 && (
                      <div className="map">
                        <Mapbox offline={offline} />
                      </div>
                    )}
                  </div>

                  <div className="result-section">
                    <div className="result-section-info">
                      <h3 className={`${ar ? "ar" : ""}`}>
                        {" "}
                        {ar ? "متاجر  محلية" : "Local Stores"}
                      </h3>
                      {offline.length > 0 && (
                        <Link
                          className={ar ? "ar" : ""}
                          to={
                            this.props.match.params.searchTerm
                              ? `term=${this.props.match.params.searchTerm}/all-offline`
                              : `cat=${this.props.match.params.categoryName}/all-offline`
                          }
                        >
                          {ar ? "عرض الكل" : "View all"}
                        </Link>
                      )}
                    </div>
                    {offline.length === 0 && (
                      <div className={`no-result ${ar ? "ar" : ""}`}>
                        {ar
                          ? `لا يوجد منتجات محلية بأسم ${
                              this.props.match.params.searchTerm
                                ? this.searchTerm
                                : this.props.match.params.categoryName
                            }`
                          : `There is no offline products called ${
                              this.props.match.params.searchTerm
                                ? this.searchTerm
                                : this.props.match.params.categoryName
                            } `}
                      </div>
                    )}
                    {offline.length > 0 && (
                      <Slider for="offline" items={offline} />
                    )}
                  </div>

                  <div className="result-section">
                    <div className={`result-section-info ${ar ? "ar" : ""}`}>
                      <h3 className={ar ? "ar" : ""}>
                        {ar ? "متاجر عبر الأنترنت" : "Online stores"}
                      </h3>
                      {online.length > 0 && (
                        <Link
                          to={
                            this.props.match.params.searchTerm
                              ? `term=${this.props.match.params.searchTerm}/all-online`
                              : `cat=${this.props.match.params.categoryName}/all-online`
                          }
                          className={ar ? "ar" : ""}
                        >
                          {ar ? "عرض الكل" : "View all"}
                        </Link>
                      )}
                    </div>
                    {online.length === 0 && (
                      <div className={`no-result ${ar ? "ar" : ""}`}>
                        {ar
                          ? `لا يوجد منتجات عبر الإنترنت بأسم ${
                              this.props.match.params.searchTerm
                                ? this.searchTerm
                                : this.props.match.params.categoryName
                            }`
                          : `There is no online products called ${
                              this.props.match.params.searchTerm
                                ? this.searchTerm
                                : this.props.match.params.categoryName
                            } `}
                      </div>
                    )}
                    {online.length > 0 && (
                      <Slider
                        for="online"
                        items={online}
                        categories={this.state.categories}
                      />
                    )}
                  </div>
                  {this.state.message !== "" && this.state.loading === false && (
                    <div className="result-section">
                      <div className="message">
                        <h2 className={ar ? "ar" : ""}>{this.state.message}</h2>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {this.state.loading && (
          <div className="container">
            <div className="salehunter-spinner">
              <SalehunterSpinner />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Result;
