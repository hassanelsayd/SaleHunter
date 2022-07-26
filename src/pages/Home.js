import React ,{Component} from "react"

//import Home Page Components
import Navbar from "../Components/Navbar";
import SearchSection from "../Components/SearchSection";
import ProductsList from "../Components/ProductsList";
import SignInPopUp from "../Components/forms/formPopUp/signInPopUp/signIn_pop";
import SignUpPopUp from "../Components/forms/formPopUp/signupPopup/signUp_pop";
//import style
import '../styles/home.css';

// Importing Redux

import {connect} from "react-redux"

// Importing Helmet
import {Helmet} from "react-helmet";
import Menu from "../Components/menu";
import FirstVisit from "../Components/firstVisit";
const pageTitle = "Home";

class Home extends Component {

    componentDidMount(){
        let visited = localStorage["alreadyVisited"];
        setTimeout(() => {
            if(visited) {
                //do not view Popup
           } else {
                //this is the first time
                localStorage["alreadyVisited"] = true;
                document.querySelector('.first-visit').classList.add('active')
           }
        }, 2000);
    }
    
    

    render() {
        const dark = localStorage.getItem("darkMode");
        if(dark) {
            document.documentElement.style.background = "#101010"
            document.getElementById('root').style.background = "#101010"
        }else{
            document.documentElement.style = ""
            document.getElementById('root').style = ""
        }
        return (
            <div className = {`home ${dark ? "dark" : ""}`}>
                <Helmet>
                    <title>{pageTitle}</title>
                    <link 
                        rel="icon" 
                        type="image/png" 
                        href="https://www.kindpng.com/picc/m/149-1491757_transparent-search-icon-clipart-search-icon-png-circle.png" 
                        sizes="16x16" />
                </Helmet>
                <Menu from = "home" />
                <Navbar from = 'home' />
                <SearchSection />
                <ProductsList />
                <SignUpPopUp />
                <SignInPopUp />
                <FirstVisit />
                
            </div>
        );
    };
    
};

const mapStateToProps = state =>{
    return{
        dark: state.darkMode
    }
}
export default connect(mapStateToProps)(Home);


