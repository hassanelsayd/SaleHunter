import React from 'react';
import { connect } from 'react-redux';
// import {thirdparty} from "../../../actions/auth"
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FBIMAGE from '../../../Assets/Images/facebook.svg'
import { thirdparty_facebook } from '../../../actions/auth';
import { useHistory } from 'react-router-dom';
const APP_ID = '641431183774654'
function FacebookAuth(props) {
  const {dispatch} = props;
  const history = useHistory()
  const responseFacebook = (response) => {
    if (response.id){
      dispatch(thirdparty_facebook(response.name, response.id, response.picture.data.url))
      .then(() => {
        history.push(`/profile`)
      })
    }
  }

  return (
            <FacebookLogin
              appId={APP_ID}
              autoLoad={false}
              fields="name,email,picture.width(500)"
              scope="public_profile,user_friends"
              callback={responseFacebook}
              
              render={(renderProps) => (
                <img
                  className = "social-login"
                  alt="facebook"
                  src= {FBIMAGE}
                  onClick={renderProps.onClick}
                />
              )}
              icon="fa-facebook" />
  );
}

function mapStateToProps(state) {
  return {
    state
  };
  }
  export default connect(mapStateToProps)(FacebookAuth);