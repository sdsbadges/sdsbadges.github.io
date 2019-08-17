import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * If the user is authenticated, then we simply render the passed in component. If the user is not authenticated,
 * then we use the Redirect React Router v4 component to redirect the user to the login page.
 */
export default ({ component: C, props: cProps, ...rest }: any) =>
    <Route
        {...rest}
        render={(props) =>
            cProps.isAuthenticated
                ? <C {...props} {...cProps} />
                : <Redirect
                    to={`/login?redirect=${props.location.pathname}${props.location.search}`}
                />}
    />;
