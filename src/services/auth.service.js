import axios from "axios";
const API_URL = `https://sale-hunter.herokuapp.com/api/v1/users/`;

class AuthService {
  // Login Service (Received JWT from DB and Stores it in Local Storage)
  async login(email, password) {
    return axios
      .post(API_URL + `auth/signin`, { email, password })
      .then((response) => {
        if (response) {
          localStorage.setItem("JWT", response.headers.authorization);
        }
        return response.data;
      });
  }

  // 3rd-party login
  thirdparty_google(fullname, email, thirdParty_id, profile_img) {
    return axios
      .post(API_URL + `auth/google`, {
        fullname,
        email,
        thirdParty_id,
        profile_img,
      })
      .then((response) => {
        if (response) {
          localStorage.setItem("JWT", response.headers.authorization);
        }
        return response.data;
      });
  }

  thirdparty_facebook(fullname, thirdParty_id, profile_img) {
    return axios
      .post(API_URL + `auth/facebook`, { fullname, thirdParty_id, profile_img })
      .then((response) => {
        if (response) {
          localStorage.setItem("JWT", response.headers.authorization);
        }
        return response.data;
      });
  }

  // Register "Signup" Service (Send User Data To DB and DB Will generate JWT)
  register(fullname, email, password, passwordConfirm) {
    return axios.post(API_URL + `auth/signup`, {
      fullname,
      email,
      password,
      passwordConfirm,
    });
  }

  // ForgetPassword Service
  verifyEmail(email) {
    return axios.post(API_URL + `verifyEmail`, { email });
  }

  verifyEmailToken(token) {
    return axios.get(API_URL + `verifyEmailToken/${token}`);
  }

  updateForgottenPassword(password, confirmPassword, token) {
    return axios.patch(API_URL + `auth/resetPassword/${token}`, {
      password,
      confirmPassword,
    });
  }

  // Logout Service (Removes JWT from The Local Storage)
  logout() {
    localStorage.removeItem("JWT");
  }
  updateUserProfile(fullname, email, profile_img) {
    let requestBody = {};
    if (email !== null) {
      requestBody = {
        fullname,
        email,
        profile_img,
      };
    } else if (email === null) {
      requestBody = {
        fullname,
        profile_img,
      };
    }
    const userJWT = localStorage.getItem("JWT");
    return axios
      .patch(API_URL, requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJWT}`,
        },
      })
      .then((response) => {
        if (response) return response;
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  updatePassword(oldPassword, newPassword, newPasswordConfirm) {
    const userJWT = localStorage.getItem("JWT");
    return axios.patch(
      API_URL + `updatePassword`,
      { oldPassword, newPassword, newPasswordConfirm },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userJWT}`,
        },
      }
    );
  }
}
export default new AuthService();
