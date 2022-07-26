import SearchService from "../services/search.service"
import * as type from './types';

export const getItems = (API_KEY, searchTerm,pageNumber) => (dispatch) => {
    return SearchService.getItems(API_KEY,searchTerm,pageNumber).then(
        (data)=>{
            dispatch({
                type: type.SEARCH_SUCCESS,
                payload:{searchResult: data.results}
            });
            return Promise.resolve();
    },

        (error)=> {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            dispatch({
                type: type.SEARCH_FAIL,
                payload: message
            })
            return Promise.reject()
        }

)
    
    
}