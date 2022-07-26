import React from "react";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/Home";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";
import "../../styles/breadcrumbs.css";
const ar = localStorage.getItem("ar");
const MuiBreadCrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const pathnames = pathname.split("/").filter((x) => x);
  let style = { cursor: "pointer" };
  const handlepath = (path) => {
    if (path.includes("term=")) {
      path = path.replace("term=", "");
      if (path.length > 40) {
        path = path.slice(0, 40) + "...";
      }
      return path;
    } else if (path.includes("cat=")) {
      path = path.replace("cat=", "");
      if (path.length > 40) {
        path = path.slice(0, 40) + "...";
      }
      return path;
    } else if (path.includes("pid=")) {
      path = props.productTitle;
      if (path.length > 40) {
        path = path.slice(0, 40) + "...";
      }
      return path;
    } else if (path === "all-online") {
      path = ar ? "جميع المنتجات عبر الإنترنت" : "All Online Products";
      return path;
    } else if (path === "all-offline") {
      path = ar ? "جميع المنتجات في المتاجر " : "All Offline Products";
      return path;
    } else if (path === "favourites") {
      path = ar ? "منتجاتك المفضلة" : "Favourites";
      return path;
    } else if (path === "history") {
      path = ar ? "سجل المشاهدات" : "History";
      return path;
    } else if (path === "sales") {
      path = ar ? "عروض وخصومات" : "Sales";
      return path;
    } else return path;
  };
  return (
    <div className={`breadcrumbs ${ar ? "ar" : ""}`}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link style={style} onClick={() => history.push("/")}>
            <HomeIcon />
          </Link>
        ) : (
          <Typography>
            <HomeIcon />
          </Typography>
        )}
        {pathnames.map((path, index) => {
          const router = pathnames.slice(0, index + 1).join("/");
          const lastCrumb = index === pathnames.length - 1;

          return lastCrumb ? (
            <Typography className={ar ? "ar" : ""} key={index}>
              {handlepath(path)}
            </Typography>
          ) : (
            <Link
              className={ar ? "ar" : ""}
              style={style}
              key={index}
              onClick={() => history.push(`/${router}`)}
            >
              {/* {path} */}
              {handlepath(path)}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default withRouter(MuiBreadCrumbs);
