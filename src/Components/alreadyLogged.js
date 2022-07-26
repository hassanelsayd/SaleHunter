import Lock from "../Assets/Images/lock.svg";
import "../styles/notLogged.css";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import { useHistory } from "react-router-dom";

const ar = localStorage["ar"];

const AlreadyLogged = (props) => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="not-logged">
        <img src={Lock} alt="Already logged in" title="Already logged in" />
        <div>
          <h2 className={` t-center ${ar ? "ar" : ""}`}>
            {" "}
            {ar
              ? "عذرا ، تم رفض الوصول لهذه الصفحة!"
              : "Sory, Access Denied for this page!"}
          </h2>
          <p className={`t-center ${ar ? "ar" : ""}`}>
            {ar
              ? "ليس لديك أذونات لعرض هذه الصفحة ، يرجى تسجيل الخروج والمحاولة مرة أخرى."
              : "You Don't have permissions to view this page, please logout and try again."}
          </p>
          <div className="flex-btns">
            {" "}
            <button
              onClick={() => history.goBack()}
              className={`t-center ${ar ? "ar" : ""}`}
            >
              {ar ? "الصفحة السابقة" : "Go back"}
            </button>
            <button
              onClick={() => props.dispatch(logout())}
              className={`t-center ${ar ? "ar" : ""}`}
            >
              {ar ? "تسجيل الخروج" : "Logout"}
            </button>
          </div>
          <button
            onClick={() => props.dispatch(logout())}
            className={`t-center ${ar ? "ar" : ""}`}
          >
            {ar ? "تسجيل الخروج" : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(AlreadyLogged);
