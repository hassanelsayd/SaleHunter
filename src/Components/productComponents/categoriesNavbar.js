import React, { useState } from 'react'
import "../../styles/cat-navbar.css"
import { useHistory } from 'react-router-dom'


const ar = localStorage.getItem('ar')
const CategoriesNavbar = (props) => {
    const [arabic] = useState(data=> ar? true : false)
    const history = useHistory()
    const toggleCategories = () =>{
        const toggler = document.querySelector('.Category-toggle');
        const cats = document.querySelector(".categories")
        const arrow = document.querySelector('.cat-navbar .arrow');
        if(cats.classList.contains("closed")){
            cats.classList.remove("closed");
            toggler.classList.remove("closed")
            arrow.style.transform = "rotate(0deg)"
        }
        else{
            cats.classList.add("closed");
            toggler.classList.add("closed")
            arrow.style.transform = "rotate(90deg)"
        }
    }
    const Search = (cat) => {
        history.push({
            pathname:`/cat=${cat}`,
            state:{cat}
        })
    }
  return (
    <div className='cat-navbar'>
        <div className={`container ${arabic? 'ar' :''}`}>
            <div className='Category-toggle' onClick={toggleCategories}>
                <svg xmlns="http://www.w3.org/2000/svg" className="cat-menu" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className={arabic? 'ar' :''}> {arabic? "الفئات": "Categories"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <ul className='categories'>
                {[...props.categories].map(cat => {
                    return(
                        <li className='cat' key = {cat} onClick={() => Search(cat)}>
                            {cat}
                        </li>
                    )
                } )}
            </ul>
        </div>
    </div>
  )
}

export default CategoriesNavbar