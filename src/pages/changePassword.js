// Importig React Libiraries
import React, { Component } from "react";

// Import Menu and navbar
import Menu from "../Components/menu"
import Navbar from "../Components/Navbar";

// Importing React-Router
import { Link } from 'react-router-dom';

// Importing Redux
import { connect } from "react-redux";
import { updatePassword, logout } from "../actions/auth";
// Importing Validation Libraries
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// importing Assets
import img from '../Assets/Images/update-password.svg';

// Importing Styles 
import "../styles/change-password.css"

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash , faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
const show = <FontAwesomeIcon icon={faEye}  />
const hide = <FontAwesomeIcon icon={faEyeSlash} />

// Validations

const password = value =>{
    if (!value) {
        return(
            <div className="error">
                {ar?
                    <span className="ar">
                        الرقم السري مطلوب
                    </span>
                :
                    <span >
                        The Password is required!
                    </span>
                }
                <div className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
            </div>
        );
        
    }
    else if(value.length < 8) {
        return(
            <div className="error">
                {ar?
                    <span className="ar">
                        علي الأقل 8 خانات
                    </span>
                :
                    <span >
                        At least 8 digits
                    </span>
                }
                <div className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
            </div>
        )
        
    }

    else if(!value.match(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9@*$^&!%()#]+)$/)){
        return (
            <div className="error">
                {ar?
                    <span className="ar">
                        علي الأقل حروف ورقم وعلامه مميزه
                    </span>
                :
                    <span >
                        At least 1 number and 1 char
                    </span>
                }
                <span >
                </span>
                <div className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
            </div>
        );
    }
    
}

const ar = localStorage.getItem('ar')
class ChangePassword extends Component {

constructor(props) {
    super(props);
    this.state = {
        oldPassword:"",
        password: "",
        passwordConfirm:'',
        oldPassVisible: false,
        newPassVisible: false,
        confirmPassVisible: false,
        loading:false
    };

}

confirmPassword = (value) =>{
    if (!value) {
        return (
            <div className="error">
                {ar?
                <span className="ar">
                    تأكيد الرقم السري مطلوب
                </span>
            :
                <span >
                    The Confrim password is required!
                </span>
            }
                <div className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
            </div>
        );
    }
    else if(value !== this.state.password){
        
        return (
            <div className="error">
                {ar?
                <span className="ar">
                    تأكيد الرقم السري غير مطابق
                </span>
            :
                <span >
                    Confirm password not matches
                </span>
                }   
                <div className="icon">
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </div>
            </div>
        );
    }
}


onOldPassChanged = (e) => {
    this.setState({
        oldPassword: e.target.value
    })
}
onPassChanged = (e) => {
    this.setState({
        password: e.target.value
    })
}
onConfirmPassChanged = (e) => {
    this.setState({
        passwordConfirm: e.target.value
    })
}

handleUpdatePassword = (e) => {
    e.preventDefault();
        
        this.form.validateAll();
        
        const {dispatch, history } = this.props;
        if (this.checkBtn.context._errors.length === 0) {
            this.setState({
                loading: true
            });
            dispatch(
                updatePassword(this.state.oldPassword,this.state.password, this.state.passwordConfirm)
            )
            .then(() => {
                dispatch(logout()).then(() => {
                    history.replace("/sign-in")
                })
                this.setState({
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    loading: false
                });
            });
        }
}

render() {
    // Define Variables
    const {message} = this.props;
    const userJWT = localStorage.getItem("JWT")
    let dark = localStorage.getItem("darkMode")

    // Cahnge HTML Tag Background During Dark Mode
    if(dark) {
        document.documentElement.style.background = "#111"
    }
    
    // Add Custom Style For Loader-box
    let loaderStyle = {
        display: 'none'
    };
    
    if(this.state.loading){
        loaderStyle = {
            display: 'flex'
        }
    }

    if( this.props.isLoggedIn || userJWT){
    return (
        <div className= {`change-password ${dark ? "dark" : ""}`}>
                
                <Navbar />
                <Menu from = "profile" />

                <div className="loader-box" style={loaderStyle}>
                    <div className="loader"></div>
                </div>
                <div className='container' >

                    <div className='row align-vertical' >
                        <div className='col-md-7 image-side'>
                            <div className='form-main-image'>
                                <img src ={img} alt = 'main-img' />
                            </div>
                        </div>

                        <div className='col-md-5 form-side '>
                            <h1 className={`main-title ${ar? 'ar' :''}`}>{ar? 'تعديل الرقم السري' : "Change Password! "}</h1>
                            <p style={{marginBottom:'40px'}} className={`main-paragraph ${ar? 'ar' :''}`}>{ar? 'تمتع بمزيد من الخصوصية' : "Enjoy more privacy"}</p>
                            
                                <Form
                                    ref={(c) => {
                                        this.form = c;
                                    }}
                                    onSubmit={this.handleUpdatePassword}
                                >

                                    <div className="password-input">
                                        <div className="form-group mb-4">
                                            <Input
                                                type={this.state.oldPassVisible ? 'text': 'password'}
                                                className={`form-control data-input ${ar? 'ar' :''}`}
                                                name="Old password"
                                                value={this.state.oldPassword}
                                                onChange = {this.onOldPassChanged}
                                                placeholder={ar? 'الرقم السري القديم' : "Old Password"}
                                                validations={[password]}
                                            />
                                            <div className={`password-toggler ${ar? 'ar' :''}`} onClick = {() => this.setState({oldPassVisible: !this.state.oldPassVisible})}>
                                                {this.state.oldPassVisible ? show : hide}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="password-input">
                                        <div className="form-group mb-4">
                                            <Input
                                                type={this.state.newPassVisible ? 'text': 'password'}
                                                className={`form-control data-input ${ar? 'ar' :''}`}
                                                name="New password"
                                                value={this.state.password}
                                                onChange = {this.onPassChanged}
                                                placeholder={ar? 'الرثم السري الجديد' : "New Password"}
                                                validations={[password]}

                                            />
                                            <div className={`password-toggler ${ar? 'ar' :''}`} onClick = {() => this.setState({newPassVisible: !this.state.newPassVisible})}>
                                                {this.state.newPassVisible ? show : hide}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="password-input">
                                        <div className="form-group mb-4">
                                            <Input
                                                type={this.state.confirmPassVisible ? 'text': 'password'}
                                                className={`form-control data-input ${ar? 'ar' :''}`}
                                                name="Confirm new password"
                                                value={this.state.passwordConfirm}
                                                onChange = {this.onConfirmPassChanged}
                                                placeholder={ar? 'تأكيد الرقم السري' : "Confirm New Password"}
                                                validations={[password ,this.confirmPassword]}
                                            />
                                            <div className={`password-toggler ${ar? 'ar' :''}`} onClick = {() => this.setState({confirmPassVisible: !this.state.confirmPassVisible})}>
                                                {this.state.confirmPassVisible ? show : hide}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="submit" className={`form-control ${ar? 'ar' :''}`} id="submit" 
                                        value={ar? 'تعديل الرقم السري' : "Change Password"} />
                                    </div>

                                    {message && (
                                        
                                        <div className="error backend">
                                            <span >
                                                {message}
                                            </span>
                                            <div className="icon">
                                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                            </div>
                                        </div>
                                    )}
                                    <CheckButton
                                        style={{ display: "none" }}
                                        ref={(c) => {
                                            this.checkBtn = c;
                                        }}
                                    />
                                </Form>
                                
                        </div>
                    </div>
                </div>
            </div>
    );
}
else {
    return(
        <div className="not-logged">
            <h1 className="not-logged-title">You are not logged in</h1>
            <Link to = "/sign-in" className="btn" >Login</Link>
        </div>
    )
}
}
}
function mapStateToProps(state) {
    const {message} = state.message;
    const { isLoggedIn } = state.authReducer;
    return{
        message,
        isLoggedIn
    }
}
export default connect(mapStateToProps)(ChangePassword)