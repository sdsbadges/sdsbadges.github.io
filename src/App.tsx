import * as React from 'react';
import ScreensRoot from 'screens/Root';

class App extends React.Component {
    render() {
        return <ScreensRoot />;
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error.message);
    }
}

export default App;
