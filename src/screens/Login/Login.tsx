import React from 'react';
import Reflux, { Store } from 'reflux';
import { Form, FormGroup, Label, Input, Button, Alert, Spinner } from 'reactstrap';
import { History } from 'history';
import { UserActions, UserStore } from 'stores/UserStore';
import './Login.scss';

interface IProps {
    history: History;
}

interface IState {
    username: string;
    password: string;
    errorMessage: string | null;
    loading: boolean;
}

/**
 * Login Screen connects to the UserStore and handles user login behavior.
 */
class ScreensLogin extends Reflux.Component<typeof Store, IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.stores = [UserStore];
        this.storeKeys = ['errorMessage', 'loading'];

        this.state = {
            username: '',
            password: '',
            errorMessage: null,
            loading: false,
        };
    }

    public validateForm = () => {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    public handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ username: event.target.value });
    }

    public handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: event.target.value });
    }

    public handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        UserActions.UserLogin(this.state.username, this.state.password);
    }

    public render() {
        return (
            <div className="Login">
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="username">Username:</Label>
                        <Input id="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
                    </FormGroup>
                    <FormGroup >
                        <Label for="password">Password:</Label>
                        <Input id="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button disabled={!this.validateForm()} type="submit">
                            Login
                        </Button>
                    </FormGroup>
                    <div>
                        {this.state.loading && <Spinner color="primary" />}
                        {this.state.errorMessage != null && <Alert color="danger">{this.state.errorMessage}</Alert>}
                    </div>
                </Form>
            </div>
        );
    }
}

export default ScreensLogin;
