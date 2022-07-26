import * as types from '../actions/types';


const userJWT = localStorage.getItem("JWT");
const initialState = userJWT
    ? { isLoggedIn: true }
    : { isLoggedIn: false };
//eslint-disable-next-line
export default function (state = initialState, action) {
    const { type } = action;
    switch(type){
        case types.REGISTER_SUCCESS:
            return{
                ...state,
                isLoggedIn:true
            };
        case types.REGISTER_FAIL:
            return{
                ...state,
                isLoggedIn: false,
            };
        case types.LOGIN_SUCCESS:
            return{
                ...state,
                isLoggedIn:true
            };
            
        case types.PROFILE_UPDATED_SUCCESS:
            return{
                ...state,
                isLoggedIn:true
            };

        case types.PROFILE_UPDATED_FAIL:
            return{
                ...state,
                isLoggedIn:true
            };

        case types.LOGIN_FAIL:
            return{
                ...state,
                isLoggedIn:false
            };

        case types.LOGOUT:
            return{
                ...state,
                isLoggedIn: false
            }
        case types.FORGET_PASSWORD_SUCCESS:
            return{
                ...state
            };
        case types.FORGET_PASSWORD_FAIL:
            return{
                ...state
            };
            
        case types.SEND_TOKEN_SUCCESS:
            return{
                ...state
            };
        case types.SEND_TOKEN_FAIL:
            return{
                ...state
            };
        case types.RESET_PASSWORD_SUCCESS:
            return{
                ...state
            };
        case types.RESET_PASSWORD_FAIL:
            return{
                ...state
            };
        default : return state
    }
}