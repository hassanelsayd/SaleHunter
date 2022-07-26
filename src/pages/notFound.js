import React from 'react'
import Navbar from "../Components/Navbar"
import Menu from "../Components/menu"
import Error from "../Assets/Images/error404.svg"
import { Link } from 'react-router-dom'
import "../styles/notFound.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleLeft } from '@fortawesome/free-solid-svg-icons';

// Importing Helmet
import {Helmet} from "react-helmet";
const ar = localStorage.getItem('ar')

const pageTitle = "Page not found";

const NotFound = () => {
    const dark = localStorage.getItem("darkMode");
    if(dark) {
        document.documentElement.style.background = "#101010"
        document.getElementById('root').style.background = "#101010"
    }else{
        document.documentElement.style = ""
        document.getElementById('root').style = ""
    }
    
    return (
        <div className= {`not-found ${dark ? "dark" : ""}`}>
            <Helmet>
                    <title>{pageTitle}</title>
                    <link 
                        rel="icon" 
                        type="image/png" 
                        href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png" 
                        sizes="16x16" />
                </Helmet>
                <Navbar />
                <Menu />
                <div className='container' >

                    <div className='row not-found-content '>

                        <div className='col-lg-7 col-md-7 image-side'>
                            <div className='form-main-image'>
                                <img src ={Error} alt = 'main-img' />
                            </div>
                        </div>

                        <div className='col-lg-5 col-md-8 col-sm-12 error-404-message'>
                                <h1 className={`main-title ${ar? 'ar' :''}`}>
                                    {ar? 'عفوًا ، الصفحة غير موجودة !' : "Oops, Page not Found!"}    
                                </h1>
                                <p className={`main-paragraph ${ar? 'ar' :''}`}>
                                    {ar? 'هذه الصفحة التي تبحث عنها غير متوفرة. لا تقلق ، يمكننا مساعدتك في العودة.' : 
                                    
                                    "This page you're looking for isn't available Don't worry we can help you to get back."}    

                                </p>
                                <Link to = "/">
                                    <button  className={`go-home ${ar? 'mr-auto' :''}`}>
                                        <FontAwesomeIcon icon={faAngleLeft} />
                                        <span className={ar? 'ar mr-auto' :''} style={{marginLeft:"15px"}}>
                                            {ar? 'العوده إلي الصفحة الرئيسيه' : "Back to Home"}
                                        </span>
                                        
                                    </button>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default NotFound