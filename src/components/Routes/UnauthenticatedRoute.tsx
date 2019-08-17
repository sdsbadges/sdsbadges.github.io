import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function querystring(name: any, url = window.location.href) {
    name = name.replace(/[[]]/g, '\\$&');

    const regex = new RegExp("[?&]" + name + '(=([^&#]*)|&|#|$)', 'i');
    const results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * If the user is not authenticated, then we simply render the passed in component. If the user is authenticated,
 * then we use the Redirect React Router v4 component to redirect the user to the home page. If you navigate to a
 * specific page first then you will be redirected to this exact page after the successful login.
 */
export default ({ component: C, props: cProps, ...rest }: any) => {
    const redirect = querystring('redirect');
    return (
        <Route
            {...rest}
            render={(props) =>
                !cProps.isAuthenticated
                    ? <C {...props} {...cProps} />
                    : <Redirect
                        to={redirect === '' || redirect === null ? '/' : redirect}
                    />}
        />
    );
};
