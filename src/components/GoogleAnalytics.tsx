// utils/GoogleAnalytics.js
import React from 'react';
import ReactGA from 'react-ga';
import { Route } from 'react-router-dom';

interface Location {
    pathname: string,
    search: string
}

interface IProps {
    location: Location,
    options: Object
}

class GoogleAnalytics extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public componentDidMount () {
        this.logPageChange(
            this.props.location.pathname,
            this.props.location.search
        );
    }

    public componentDidUpdate (prevProps: IProps) {
        const { location: { pathname, search } } = this.props;
        const isDifferentPathname = pathname !== prevProps.location.pathname;
        const isDifferentSearch = search !== prevProps.location.search;

        if (isDifferentPathname || isDifferentSearch) {
            this.logPageChange(pathname, search);
        }
    }

    public logPageChange = (pathname: any, search = '') => {
        const page = pathname + search;
        const { location } = window;
        ReactGA.set({
            page,
            location: `${location.origin}${page}`,
            ...this.props.options
        });
        ReactGA.pageview(page);
    }

    public render () {
        return null;
    }
}

const RouteTracker = () => <Route component={GoogleAnalytics} />;

const init = (options = {}) => {
    const isGAEnabled = process.env.NODE_ENV === 'production';

    if (isGAEnabled) {
        ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS!);
    }

    return isGAEnabled;
};

export default {
    GoogleAnalytics,
    RouteTracker,
    init
};
