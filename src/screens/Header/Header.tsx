import React from "react";
import Reflux from "reflux";
import { Button } from 'reactstrap';
import { UserStore, UserActions } from "stores/UserStore";
import "./Header.scss";
import Logo from "assets/logo.svg";

/**
 * Contains the header and navigation bar
 */
export default class ScreensHeader extends Reflux.Component {
    /**
     * Constructor for reflux component
     * @param props any type for now
     */
    constructor(props: any) {
        super(props);
        this.stores = [UserStore];
        document.addEventListener("click", this.documentClickHandler);
    }

    public componentWillUnmount(): void {
        document.removeEventListener("click", this.documentClickHandler);
    }

    /**
     * Catches and logs errors in descendant components
     */
    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error.message);
    }

    /**
     * Logout button was clicked
     */
    public handleLogout = (event: any) => {
        UserActions.Logout();
    };

    public render() {
        let navMenuButton = <div className="col"></div>, navMenu, userInfo = <div className="col mr-0"></div>;

        if (this.state.isAuthenticated) {
            navMenuButton = (
                <div className="col">
                    <button ref={ (r):void => { this.button = r } } className="navbar-toggler p-0 border-0 float-left" type="button" data-toggle="offcanvas" onClick={ ():void => { this.setState({ isOpen: !this.state.isOpen }) } }>
                        <span className="navbar-toggler-icon" />
                    </button>

                    <a className="navbar-brand float-left pt-0 d-none d-sm-block" href="/">{/* Product name goes here... */}</a>
                </div>
            );

            navMenu = (
                <div ref={(r): void => { this.dropDown = r; }} className={`navbar-collapse offcanvas-collapse${this.state.isOpen ? " open": ""}`}>
                    <button className="navbar-toggler p-0 border-0 float-right" type="button" data-toggle="offcanvas" onClick={ ():void => { this.setState({ isOpen: !this.state.isOpen }) } }>
                        <i className="mdi mdi-close" />
                    </button>

                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/link1">
                                <i className="mdi mdi-timetable" />
                                <span>Link 1</span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="/link2">
                                <i className="mdi mdi-message-text" />
                                <span>Link 2</span>
                            </a>
                        </li>

                        <li className="nav-item">
                            <Button onClick={this.handleLogout}>Logout</Button>
                        </li>

                    </ul>
                </div>
            );

            userInfo = (
                <div className="col mr-0">
                    {/* User info/menu goes here... */}
                </div>
            );
        }

        return (
            <nav className="navbar fixed-top row">
                {navMenuButton}

                <div className="col">
                    <a className="navbar-brand-img" href="/">
                        <img src={Logo} alt="Temp Logo" />
                    </a>
                </div>

                {userInfo}

                {navMenu}
            </nav>
        );
    }

    private onDocumentClick(e: Event) {
        // Close the menu if the user clicks anywhere outside the menu or menu button.
        if (this.button && (this.button === e.target || this.button.contains(e.target as HTMLElement))) {
            return;
        }

        if (this.dropDown && !this.dropDown.contains(e.target as HTMLElement)) {
            this.setState({ isOpen: false});
        }
    }

    private documentClickHandler = (e: any) => this.onDocumentClick(e);
    private dropDown: HTMLDivElement | null = null;
    private button: HTMLElement | null = null;
}
