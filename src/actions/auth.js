import * as type from './types';
import AuthService from '../services/auth.service'

// Signup Sync Action
export const register = (fullname, email, password, passwordConfirm) => (dispatch) => {
    return AuthService.register(fullname, email, password, passwordConfirm)
    .then(
        // Success Case
        (response) => {
            dispatch({
                type : type.REGISTER_SUCCESS
            });
            dispatch({
                type:type.SET_MESSAGE,
                response: response.data.message
            })
            return Promise.resolve();
        },

        // Fail Case
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type :type.REGISTER_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
            return Promise.reject()
        }
    );
};


// Update profile action
export const updateUserProfile = (fullname, email, profile_img) => (dispatch) => {
    return AuthService.updateUserProfile(fullname, email, profile_img)
    .then(
        // Success Case
        (response) => {
            dispatch({
                type : type.PROFILE_UPDATED_SUCCESS
            });
            dispatch({
                type:type.SET_MESSAGE,
                response: response.data.message
            })
            return Promise.resolve();
        },

        // Fail Case
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type :type.PROFILE_UPDATED_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
            return Promise.reject()
        }
    );
};


// Change Password Action
export const updatePassword = (oldPassword, newPassword, newPasswordConfirm) => (dispatch) => {
    return AuthService.updatePassword(oldPassword, newPassword, newPasswordConfirm)
    .then(
        // Success Case
        (response) => {
            dispatch({
                type : type.UPDATE_PASSWORD_SUCCESS
            });
            dispatch({
                type:type.SET_MESSAGE,
                response: response.data.message
            })
            return Promise.resolve();
        },

        // Fail Case
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type :type.UPDATE_PASSWORD_SUCCESS,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
            return Promise.reject()
        }
    );
};


// Signin Sync Action
export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
        // Success Case
        (data) => {
            dispatch({
                type: type.LOGIN_SUCCESS,
                payload: {user:data}
            });
            return Promise.resolve()
        },

        // Fail Case
        (error) => {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString();
            dispatch({
                type: type.LOGIN_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
        return Promise.reject()
        }
    )
}

// 3rd_party login action
export const thirdparty_google = (fullname, email,thirdParty_id, profile_img) => (dispatch) => {
    return AuthService.thirdparty_google(fullname, email,thirdParty_id, profile_img).then(
        // Success Case
        (data) => {
            dispatch({
                type: type.LOGIN_SUCCESS,
            });
            return Promise.resolve()
        },

        // Fail Case
        (error) => {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
             error.message || error.toString();
        dispatch({
            type: type.LOGIN_FAIL,
        });
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject()
        }
    )
}
export const thirdparty_facebook = (fullname,thirdParty_id, profile_img) => (dispatch) => {
    return AuthService.thirdparty_facebook(fullname,thirdParty_id, profile_img).then(
        // Success Case
        (data) => {
            dispatch({
                type: type.LOGIN_SUCCESS,
            });
            return Promise.resolve()
        },

        // Fail Case
        (error) => {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
             error.message || error.toString();
        dispatch({
            type: type.LOGIN_FAIL,
        });
        dispatch({
            type: type.SET_MESSAGE,
            payload: message
        });
        return Promise.reject()
        }
    )
}

export const verifyEmail = (email) => (dispatch) => {
    return AuthService.verifyEmail(email)
    .then(
        // Success Case
        (response) => {
            dispatch({
                type : type.FORGET_PASSWORD_SUCCESS
            });
            dispatch({
                type:type.SET_MESSAGE,
                response: response.data.message
            })
            return Promise.resolve();
        },

        // Fail Case
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type :type.FORGET_PASSWORD_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
            return Promise.reject()
        }
        );
}

export const verifyEmailToken = (token) => (dispatch) => {
    return AuthService.verifyEmailToken(token)
    .then(
        // Success Case
        (response) => {
            dispatch({
                type : type.SEND_TOKEN_SUCCESS
            });
            dispatch({
                type:type.SET_MESSAGE,
                response: response.data.message
            })
            return Promise.resolve();
        },

        // Fail Case
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type :type.SEND_TOKEN_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
            return Promise.reject()
        }
        );
}



export const updateForgottenPassword = (password, confirmPassword, token) => (dispatch) => {
    return AuthService.updateForgottenPassword(password, confirmPassword, token)
    .then(
        // Success Case
        (response) => {
            dispatch({
                type : type.RESET_PASSWORD_SUCCESS
            });
            dispatch({
                type:type.SET_MESSAGE,
                response: response.data.message
            })
            return Promise.resolve();
        },

        // Fail Case
        (error) => {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type :type.RESET_PASSWORD_FAIL,
            });
            dispatch({
                type: type.SET_MESSAGE,
                payload: message
            });
            return Promise.reject()
        }
        );
}

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: type.LOGOUT
    });
};