import * as type from './types';

export const sign_in_pop = () =>{
    return {
        type: type.SHOW_SIGNIN_POP
    }
}
export const sign_up_pop = () =>{
    return{
        type:type.SHOW_SIGNUP_POP
    }
}