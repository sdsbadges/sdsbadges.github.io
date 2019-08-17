import * as React from 'react';
import './Home.scss';

/**
 * Currently, just holds a template for the home page.
 */
export default class ScreensHome extends React.Component {
    public render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Home Page</h1>
                    <p>Eventually will hold all of the sub applications</p>
                </div>
            </div>
        );
    }
}
