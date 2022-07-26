import axios from "axios";
class SearchService {
    getItems(API_KEY,searchTerm,pageNumber){
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=${pageNumber}`)
        .then((response)=> {
            if(response) {
                return response.data
            }
            
        })
    }
}
export default new SearchService();