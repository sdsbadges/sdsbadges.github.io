import * as React from 'react';
import * as Reflux from 'reflux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ScreensHome from 'screens/Home/Home';
import ScreensLogin from 'screens/Login/Login';
import ScreensHeader from 'screens/Header/Header';
import UnauthenticatedRoute from 'components/Routes/UnauthenticatedRoute';
import AuthenticatedRoute from 'components/Routes/AuthenticatedRoute';
import UINotFound from 'components/UI/NotFound';
import { UserStore } from 'stores/UserStore';

/**
 * Contains all routes in the current system. This is setup to authenticate pages.
 * @param childProps Custom object currently only containing whether the user is authenticated or not.
 */
const Routes = ({ childProps } : any) => (
    <Switch>
        <AuthenticatedRoute path="/" exact component={ScreensHome} props={childProps} />
        <AuthenticatedRoute path="/home" exact component={ScreensHome} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={ScreensLogin} props={childProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={UINotFound} />
    </Switch>
);

/**
 * Contains the home page. Entrypoint for the portal application.
 */
export default class ScreensRoot extends Reflux.Component {
    constructor(props: any) {
        super(props);

        this.stores = [UserStore];
    }
    render() {
        const childProps = { isAuthenticated: this.state.isAuthenticated };
        return <BrowserRouter>
            <ScreensHeader />
            <Routes childProps={childProps} />
        </BrowserRouter>;
    }
}
