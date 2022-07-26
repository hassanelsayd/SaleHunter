// import React
import React, {Component} from 'react';

// import React Router
import { Route, Switch, Router } from "react-router-dom";
import history from "../../src/history";
import routes from "./routes"

class SaleHunter extends Component{

    render(){
        
    
        return(
            <div>
                <Router history={history}>
                    <Switch>
                        {routes.map(({ path, Component }, key) => (
                            <Route exact path={path} key={key} component = {Component} />
                        ))}

                    </Switch>
                </Router>
            </div>
        )
    }
}
export default SaleHunter;