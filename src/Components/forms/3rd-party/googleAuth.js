import React from "react";
import GoogleLogin from "react-google-login";
import GoogleImage from "../../../Assets/Images/google.svg";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { thirdparty_google } from "../../../actions/auth";
const CLIENT_ID =
  "379533839447-iit8dsdacvgrst9r0p05104a7st8g9j5.apps.googleusercontent.com";
function GoogleAuth(props) {
  const { dispatch } = props;
  const history = useHistory();
  const responseGoogle = (response) => {
    if (response.profileObj) {
      dispatch(
        thirdparty_google(
          response.profileObj.name,
          response.profileObj.email,
          response.profileObj.googleId,
          response.profileObj.imageUrl
        )
      ).then(() => {
        history.push(`/profile`);
      });
    }
  };

  return (
    <GoogleLogin
      clientId={CLIENT_ID}
      render={(renderProps) => (
        <img
          className="social-login"
          alt="google"
          src={GoogleImage}
          onClick={renderProps.onClick}
        />
      )}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
}

function mapStateToProps(state) {
  return {
    state,
  };
}
export default connect(mapStateToProps)(GoogleAuth);
