import { Link } from "react-router-dom";
import Lock from "../Assets/Images/lock.svg";
import "../styles/notLogged.css";
import { useHistory } from "react-router-dom";

const ar = localStorage["ar"];
const dark = localStorage["darkMode"];
const NotLogged = () => {
  const history = useHistory();
  return (
    <div className={`unAuth ${dark ? "dark" : ""}`}>
      <div className={`container `}>
        <div className={`not-logged `}>
          <img src={Lock} alt="Not logged in" title="Not logged in" />
          <div>
            <h2 className={` t-center ${ar ? "ar" : ""}`}>
              {" "}
              {ar
                ? "عذرا ، تم رفض الوصول لهذه الصفحة!"
                : "Sory, Access Denied for this page!"}
            </h2>
            <p className={`t-center ${ar ? "ar" : ""}`}>
              {ar
                ? "ليس لديك أذونات لعرض هذه الصفحة ، يرجى تسجيل الدخول والمحاولة مرة أخرى."
                : "You Don't have permissions to view this page, please login and try again."}
            </p>
            <div className="flex-btns">
              <button
                onClick={() => history.goBack()}
                className={`${ar ? "ar" : ""}`}
              >
                {ar ? "الصفحة السابقة" : "Go back"}{" "}
              </button>

              <Link to="/sign-in">
                <button className={`t-center ${ar ? "ar" : ""}`}>
                  {ar ? "تسجيل الدخول" : "Login"}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NotLogged;
