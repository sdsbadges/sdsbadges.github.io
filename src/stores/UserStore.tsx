import Reflux from 'reflux';

/**
 * Custom Error Type
 */
interface IError {
    error: string;
    error_description: string;
}

/**
 * Reflux User Actions
 */
export const UserActions = Reflux.createActions({
    UserLogin: { children: ['completed', 'catchException', 'failed'] },
    Logout: {},
});

/**
 * Reflux User Store, should eventually be converted to TypeScript.
 */
export class UserStore extends Reflux.Store {
    /**
     * Constructor for the UserStore class. Initializes the state and connects the listenable actions.
     */
    constructor() {
        super();

        const token = sessionStorage.getItem('token');

        // Set the stores default state
        this.state = {
            isAuthenticated: (token != null),
            errorMessage: null,
            loading: false,
            AuthServerURL: ""
        };
        this.listenables = [UserActions];

        this.loadSettings();
    }

    /**
     * Login with Username + Pass combination.
     * @param username contains username
     * @param password contains password
     */
    onUserLogin(username: string, password: string) {
        // const url = `${this.state.AuthServerURL}/token`;
        // const body = `grant_type=password&username=${username}&password=${password}`;
        this.setState({ loading: true, errorMessage: null });

        setTimeout(function() {
            UserActions.UserLogin.completed({
                access_token: "FAKE_TOKE",
            })
        }, 2000);

        // fetch(url, {
        //     method: 'POST', // or 'PUT'
        //     body, // data can be `string` or {object}!
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     },
        // }).then((res) => res.json())
        //     .then((response) => UserActions.UserLogin.completed(response))
        //     .catch((error) => UserActions.UserLogin.catchException(error));
    }

    /**
     * If the token is available, set the login information, otherwise call UserAction > Failed
     * @param json Contains access_token after a successful login
     */
    onUserLoginCompleted(json: { access_token: string; token_type: string; expires_in: number }) {
        if (json.access_token) {
            sessionStorage.setItem('token', json.access_token);
            this.setState({
                isAuthenticated: (json.access_token !== null),
                loading: false,
            });
        } else {
            UserActions.UserLogin.failed(json);
        }
    }

    /**
     * Catch any exception / timeout
     * @param error Contains error message and stack
     */
    onUserLoginCatchException(error: TypeError) {
        console.log(`POST - UserStore/UserLogin threw exception: ${error.message}, stack: ${error.stack}`);
        this.setState({ errorMessage: error.message, loading: false });
    }

    /**
     * User Login failed, set the description message for the user and log the error.
     * @param error Custom error contains description and message
     */
    onUserLoginFailed(error: IError) {
        console.log(`POST - UserStore/UserLogin failed with error:${error.error}`);
        this.setState({ errorMessage: error.error_description, loading: false });
    }

    /**
     * User Logout, remove session information.
     */
    onLogout() {
        sessionStorage.clear();
        this.setState({
            isAuthenticated: false,
        });
    }

    private loadSettings() {
        var url = "settings.json";
        var request = new XMLHttpRequest();

        request.open("GET", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = (): void => {
            if (request.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            if (request.status === 200) {
                var jsonData = JSON.parse(request.response);
                this.setState(jsonData);
                console.log(`[UserStore] settings.`);
            } else {
                setInterval(() => { this.loadSettings() }, 5000) ;
                console.error(`[UserStore] Error during request: status = ${request.status} ${request.statusText}`);
            }
        };

        request.send();
    }
}
Reflux.initStore(UserStore);
