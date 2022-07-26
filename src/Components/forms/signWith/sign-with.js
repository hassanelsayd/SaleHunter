import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from "../3rd-party/googleAuth"
import FacebookAuth from '../3rd-party/facebookAuth'

import { connect } from 'react-redux';
import { clearMessage } from "../../../actions/message";


const ar = localStorage.getItem('ar')
class RenderRoute extends Component {
    
    render(){
        const {dispatch} = this.props;
        return(   
            <div className={`route-message ${ar? 'ar' :''}`}>
                {this.props.description}
                <Link to ={`/${this.props.oppsite}`} className="link-route">
                    <span className={ar? 'ar' :''} id="signUpRoute" onClick={() =>  dispatch(clearMessage())} > {this.props.oppsite_text}</span>
                </Link>
            </div>
        );
    }
}
const SignWith = ({type, oppsite,oppsite_text, description, from, dispatch}) =>{
    
    return (
        <div className="sign-with" style={{textAlign:'center'}}>
            <span className={`full-width-span mt-4 ${ar? 'ar' :''}`}>{ar? 'او' : "Or"} {oppsite_text}  {ar? 'بواسطة' : "with"}</span>
            <div className=' social-sign'>
                <div className=' social'>
                    <GoogleAuth  />
                    <FacebookAuth />
                </div>
                
                <h4 className="sign-with-route">
                    {from === 'page' ?
                        <RenderRoute oppsite={oppsite} oppsite_text = {oppsite_text}description={description} dispatch= {dispatch}/>
                        :''
                    }
                </h4>
            </div>
        </div>  
    );
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
        message
    };
    }
export default connect(mapStateToProps)(SignWith);
