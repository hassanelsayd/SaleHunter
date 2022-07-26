import Home from "../pages/Home";
import Login from "../pages/SignIn";
import Register from "../pages/SignUp";
import ForgetPassPage from "../pages/forgetPassPage";
import SendCodePage from "../pages/SendCodePage";
import ResetPassPage from "../pages/resetPassPage";
import Profile from "../pages/profile";
import UpdateProfile from "../pages/updateProfile";
import CreateStore from "../pages/createStore";
import ChangePassword from "../pages/changePassword";
import NotFound from "../pages/notFound";
import Result from "../pages/result";
import AllResults from "../pages/allResults";
import ProductDetails from "../pages/productPage";
import Favourites from "../pages/favourites";
import ViewedProducts from "../pages/viewedProducts";
import Settings from "../pages/settings";
import DashBoard from "../pages/dashboard/DashBoard";
import StoreProfile from "../pages/StoreProfile";
import Sales from "../pages/Sales";
import AboutUs from "../pages/about-us";
// eslint-disable-next-line
export default [
  { path: "/", name: "home", Component: Home },
  { path: "/sign-in", name: "login", Component: Login },
  { path: "/sign-up", name: "Register", Component: Register },
  { path: "/forgot", name: "ForgetPassPage", Component: ForgetPassPage },
  { path: "/code/:token?", name: "SendCodePage", Component: SendCodePage },
  { path: "/reset", name: "ResetPassPage", Component: ResetPassPage },
  { path: "/profile", name: "Profile", Component: Profile },
  {
    path: "/profile/edit-profile",
    name: "UpdateProfile",
    Component: UpdateProfile,
  },
  { path: "/profile/createStore", name: "CreateStore", Component: CreateStore },
  {
    path: "/change-password",
    name: "changePassword",
    Component: ChangePassword,
  },
  { path: "/term=:searchTerm", name: "result", Component: Result },
  { path: "/cat=:categoryName", name: "result", Component: Result },
  {
    path: "/term=:searchTerm/all-:type",
    name: "allResults",
    Component: AllResults,
  },
  {
    path: "/cat=:categoryName/all-:type",
    name: "allResults",
    Component: AllResults,
  },
  { path: "/pid=:productID", name: "allResults", Component: ProductDetails },
  { path: "/favourites", name: "favourites", Component: Favourites },
  { path: "/history", name: "history", Component: ViewedProducts },

  { path: "/settings", name: "settings", Component: Settings },
  { path: "/sales", name: "sales", Component: Sales },
  { path: "/dashboard", name: "dashboard", Component: DashBoard },
  { path: "/about-us", name: "about-us", Component: AboutUs },
  {
    path: "/store-profile=:store_id",
    name: "StoreProfile",
    Component: StoreProfile,
  },

  { path: null, name: null, Component: NotFound },
];
