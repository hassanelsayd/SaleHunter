// Import React 
import ReactDOM from "react-dom";

//import Redux 

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'; 
import {rootReducer} from './reducers/index';

// import React Router
import { BrowserRouter } from "react-router-dom";

// import styles
import "./styles/style.css";
import 'bootstrap/dist/css/bootstrap.css';

//import Component
import SaleHunter from "./Components/SaleHunter";

// create redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
    <Provider store= {store} >
        <BrowserRouter>
            <SaleHunter />
        </BrowserRouter>
    </Provider>
    , document.getElementById("root")
);
