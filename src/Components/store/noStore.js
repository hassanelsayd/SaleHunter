import { Link } from "react-router-dom";
import emptyPage from "../../Assets/Images/empty_page.png";
import "../../styles/store/noStore.css";
const ar = localStorage["ar"];
const NoStore = () => {
  return (
    <div className="container">
      <div className="no-store">
        <img src={emptyPage} alt="dont have store" title="Dont have store" />
        <div>
          <h2 className={`${ar ? "ar" : ""}`}>
            {" "}
            {ar
              ? "عفوًا ، ليس لديك متجر بعد!"
              : "Oop's you don't have a store yet!"}
          </h2>
          <p className={` t-center ${ar ? "ar" : ""}`}>
            {ar
              ? "لا تقلق ، يمكنك إنشاء متجر جديد الآن والحصول على مزيد من التواصل مع عملائك."
              : "Never mind you can create new store now and get more connectivity with your customers."}
          </p>
          <Link to="/profile/createStore">
            <button className={`${ar ? "ar" : ""}`}>
              {" "}
              {ar ? "انشاء متجر" : "Create store"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NoStore;
