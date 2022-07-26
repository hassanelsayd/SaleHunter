//importing components
import Menu from "../Components/menu";
import { Helmet } from "react-helmet";
//import assets
import SaleHunterLogo from "../Assets/Images/logo.svg";
import PriceTracker from "../Assets/Images/price-traker.png";
import Recomend from "../Assets/Images/recomend.png";
import GooglePlay from "../Assets/Images/gooleplay.png";
import microsoft from "../Assets/Images/microsoftstore.png";
import Store from "../Assets/Images/store.png";
import Location from "../Assets/Images/location.png";
import Laptop from "../Assets/Images/labTop.png";
import girl from "../Assets/Images/second section.png";
import Eldassa from "../Assets/Images/ahmedeldesoky.webp";
import Samra from "../Assets/Images/AhmedSamir.jpeg";
import Bebo from "../Assets/Images/bebo.webp";
import Shaza from "../Assets/Images/shaza.webp";
import Amr from "../Assets/Images/Amr.jpg";
import Hassan from "../Assets/Images/hassan.jpeg";
import Nadine from "../Assets/Images/nadine.jpeg";
import Youssef from "../Assets/Images/youssef.jpeg";
// import Avatar from "../Assets/Images/default-profile.png";
import Shape from "../Assets/Images/shape.svg";
//import style
import "../styles/about-us.css";

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
//varibles
const target = "_blank";

//local storage
const ar = localStorage["ar"];
const dark = localStorage["darkMode"];

const AboutUs = () => {
  if (dark) {
    sheet.insertRule(
      ".our-services-feature{box-shadow: 0 10px 20px rgba(255, 255, 255, 0.13);}"
    );
    sheet.insertRule(
      ".our-services__card{box-shadow: 0 10px 20px rgba(255, 255, 255, 0.13);}"
    );
  }

  return (
    <div className={`about-us ${dark ? "dark" : ""} `}>
      <header>
        <Header />
      </header>
      <main>
        <Menu from="about-us" />
        <OurServices />
        <OurTeam />
      </main>
    </div>
  );
};
export default AboutUs;
//section 1
const Header = () => {
  return (
    <section
      className={`header__section ${ar ? "ar" : ""}  ${dark ? "dark" : ""}`}
    >
      <div className="container">
        <h2 className={`primary-heading ${ar ? "ar" : ""} `}>
          {" "}
          {ar ? "~ من نحن " : "~ Who we Are"}{" "}
        </h2>
        <div className="about-us__content">
          <p className={`about-us__paragraph ${ar ? "ar" : ""}`}>
            {ar
              ? "نظرًا لأن العالم يميل إلى استخدام التكنولوجيا في جميع جوانب الحياة ، فإننا نقدم محرك بحث يسهل العثور على أفضل الأسعار والمقارنة بين المنتجات على تطبيق Android للجوال وسطح المكتب والموقع الإلكتروني. حيث سنقوم بجلب المنتجات من مواقع التجارة الإلكترونية مثل Amazon و Jumia بالإضافة إلى المتاجر المسجلة التي تستخدم منصتنا لاستضافة صفحة المتجر والمنتجات الخاصة بهم لتقديم أفضل الأسعار للمستخدم بمعلومات تساعد المستخدم في العثور على أفضل الصفقات وتوافر المنتجات في أقرب المتاجر. "
              : "As the world tends to use technology in all parts of life, we provide search engine that facilitate finding the best price and comparison between products on mobile Android application, Desktop and website. Where we will fetch the products from ecommerce websites like Amazon and Jumia plus the registered stores that use our platform to host their store page and products to give the optimal prices to the user with info that helps user to find the best deals & products availability in nearest stores."}
          </p>
          <img
            src={SaleHunterLogo}
            alt="sale-hunter-log"
            className="about-us__logo"
          />
        </div>
      </div>
    </section>
  );
};
//section 2
const OurServices = () => {
  return (
    <section className={`our-services  ${dark ? "dark" : ""}  `}>
      <Helmet>
        <title>About us</title>
        <link
          rel="icon"
          type="image/png"
          href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png"
          sizes="16x16"
        />
      </Helmet>
      <div className="container">
        <div className="our-services-header">
          <h2
            className={`primary-heading ${!ar ? "letter-spacing" : ""}  ${
              ar ? "ar" : ""
            }`}
          >
            {ar ? "خدماتنا" : "Our services"}{" "}
          </h2>
        </div>
        <div className={`our-services__content ${ar ? "ar" : ""} `}>
          <div className="our-services-content__features">
            <div className="our-services__features">
              <Feature
                image={Recomend}
                header="Recommendations"
                paragraph="Recommend products 
                to the user based on 
                previous search."
                headerAR="التوصيات"
                paragraphAR="يوصي المنتجات للمستخدم 
                بناءً على البحث السابق."
              />
              <Feature
                link=""
                image={PriceTracker}
                header="Price Tracker"
                paragraph="Shows the items that 
                got big price changes 
                in a time."
                headerAR="تعقب السعر"
                paragraphAR="يعرض العناصر التي شهدت تغيرات كبيرة في الأسعار في وقت واحد."
              />
            </div>
            <div className="our-services__features">
              <Feature
                image={Store}
                header="Create Store"
                paragraph="Allows sellers to  
                create free hosted 
               store page."
                headerAR="إنشاء متجر"
                paragraphAR="يسمح للبائعين بإنشاء صفحة متجر باستضافة مجانية."
              />
              <Feature
                image={Location}
                header="Nearest Stores"
                paragraph="The map shows the 
                nearest stores have 
                the available products."
                headerAR="أقرب المتاجر"
                paragraphAR="توضح الخريطة أقرب المتاجر التي بها المنتجات المتاحة"
              />
            </div>
          </div>
          <div className={`our-services__card  ${dark ? "dark" : ""} `}>
            <div className="card_image">
              <img src={girl} alt="girl" />
            </div>

            <div className="card-text">
              <h3 className={`tertiary-heading ${ar ? "ar-text " : ""}`}>
                {ar
                  ? "الدعم السريع لعملائنا"
                  : "Quick support for our customers"}{" "}
              </h3>
              <p className={`our-services__paragraph  ${ar ? "ar-text " : ""}`}>
                {ar
                  ? "متجرنا يدور حول معالجة أسئلة العملاء ، يمكننا توظيف وكلاء خدمة العملاء لضمان الاهتمام المناسب باتصالات العملاء عبر قنوات متعددة"
                  : "our store revolves around addressing customers’ questions, we can hiring customer service agents to ensure proper attention is paid to your customer communications across multiple channels"}
              </p>
            </div>
          </div>
        </div>
        <div className="platforms">
          <div className="platforms__content">
            <img src={Shape} alt="shape" className="shape" />
            <img src={Laptop} alt="laptop and phone" className="laptop" />
            <div className="content-download">
              <h3
                className={`tertiary-heading tertiary-heading--white  ${
                  ar ? "ar-text " : ""
                }`}
              >
                {ar
                  ? "قم بتثبيت تطبيقنا الآن!"
                  : "Install our Application Now!"}{" "}
              </h3>
              <div className="download-btns">
                <img src={GooglePlay} alt="google play" />
                <img src={microsoft} alt="microsoft store" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const Feature = (props) => {
  return (
    <div className="our-services-feature">
      <div className="feature-content">
        <img src={props.image} alt="icon" className="feature-icon" />
        <h3 className={`tertiary-heading ${ar ? "ar-text " : ""}`}>
          {ar ? props.headerAR : props.header}{" "}
        </h3>
        <p className={`our-services__paragraph  ${ar ? "ar-text " : ""}`}>
          {ar ? props.paragraphAR : props.paragraph}
        </p>
      </div>
    </div>
  );
};

//section 4
const OurTeam = () => {
  return (
    <div className="our-team ">
      <div className="container">
        <h3
          className={`secondary-heading  ${!ar ? "letter-spacing" : ""}  ${
            ar ? "ar-text" : ""
          }`}
        >
          {ar ? "فريقنا" : "Our team "}
        </h3>
        <div className="our-team__content">
          <div className="group">
            <PlayerCard
              link="https://ahmed-eldesoky.vercel.app/"
              name="Ahmed Eldesoky"
              role="Frontend Developer "
              img={Eldassa}
            />
            <PlayerCard
              link="https://www.linkedin.com/in/ahmed-samir-b0206b1b8/"
              name="Ahmed Samir"
              role="Backend Developer "
              img={Samra}
            />
            <PlayerCard
              link="https://play.google.com/store/apps/dev?id=5289896800613171020"
              name="Amr Elkassaby"
              role="Android Developer "
              img={Amr}
            />

            <PlayerCard
              link="https://www.linkedin.com/in/nadine-essam79/"
              name="Nadien Essam"
              role="UI / UX designer "
              img={Nadine}
            />
          </div>
          <div className="group">
            <PlayerCard
              link="https://www.linkedin.com/in/hassan-elsayd-218a9510a/"
              name="Hassan Elsayed"
              role="Frontend Developer"
              img={Hassan}
            />
            <PlayerCard
              link="https://www.linkedin.com/in/youssef-mahmoud-452099173/"
              name="Youssef mahmoud"
              role="Backend Developer "
              img={Youssef}
            />
            <PlayerCard
              link="https://www.linkedin.com/in/abdelhady-al-sayed-17266b1a0/"
              name="Abdelhady Al Sayed"
              role="Flutter Developer "
              img={Bebo}
            />

            <PlayerCard
              link="https://www.linkedin.com/in/shaza-ehab-6a0a9b1a6/"
              name="Shaza Ehab"
              role="Flutter Developer "
              img={Shaza}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
const PlayerCard = (props) => {
  return (
    <>
      <a href={props.link} target={target}>
        <div className={`player  ${dark ? "dark" : ""}`}>
          <div className="player__img">
            <img src={props.img} alt="player" className="img" />
          </div>
          <div className="player__info">
            <h3 className="tertiary-heading">{props.name} </h3>
            <span className="role">{props.role}</span>
          </div>
        </div>
      </a>
    </>
  );
};
