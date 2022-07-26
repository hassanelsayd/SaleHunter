import React, {useEffect, useState} from "react";
import axios from "axios";

// Importing Styles
import Slider from "./slider";

const userJWT = localStorage.getItem('JWT');
const ar = localStorage.getItem('ar')

const ProductsList = () => {
        const [authenticated] = useState(data => userJWT? true : false)
        const [arabic] =useState(data=> ar ? true : false)
        const [products, setProducts] = useState([])

        useEffect(() => {
            let config = {};
            if (userJWT){
                config = {
                    'Authorization' : `Bearer ${userJWT}` 
                }
            }

            axios({
                method:'GET',
                url:'https://sale-hunter.herokuapp.com/api/v1/products/recommended',
                headers:config
            }).then((response)=> {
                setProducts(response.data.products)
            })
            .catch((error)=> {
                console.log(error.response)
            })
            // eslint-disable-next-line
        }, [])
        const title = ()=> {
            if(authenticated && arabic){
                return "منتجات مقترحه"
            }
            else if (!authenticated && arabic){
                return "المنتجات الأكثر شهرة"
            }
            else if (authenticated){
                return "Recommended Products"
            }
            else if(!authenticated){
                return "Top Products"
            }
            
        }
        return(
            <div className={`products ${arabic? 'ar': ''}`}>
                <div className="container">

                    {/* Products Section Informations */}
                    <div className ="section-info">
                        <h3 className="section-title">{title()}</h3>
                    </div>

                    <div className="products-container">
                        
                        {/* Wrapping Products In Craousel Component */}
                            <Slider items = {products} from = "recommended" />
                    </div>
                </div>
            </div>
        )
    }

export default ProductsList