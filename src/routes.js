import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App';
import Coin from './components/Coin';

const Routes = () => {
    return (
        <HashRouter basename="/">
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/crypto/:coin" component={Coin} />
                {/* any random urls are directed home */}
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        </HashRouter>
    );
};

export default Routes;
