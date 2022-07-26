import {
    SEARCH_SUCCESS,
    SEARCH_FAIL
  } from "../actions/types";

const initialState = {searchResult:{}}
// eslint-disable-next-line
export default function (state= initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SEARCH_SUCCESS: 
            return{
                ...state,
                searchResult: payload.searchResult
            }
        case SEARCH_FAIL:
            return{
                ...state
            }

        default : return state
    }


}