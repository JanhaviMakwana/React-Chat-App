import React from 'react';
import { Link } from 'react-router-dom';
import { withState } from '../chat-context';

const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light ">
                <Link className="navbar-brand mt-2">Chatt</Link>
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <div className="collapse navbar-collapse jusify-content-end" id="navbarNavAltMarkup">
                    {props.state.user
                        ? <div className="navbar-nav">
                            <button className="btn btn-primary mr-3" onClick={() => { }}>Logout</button>
                        </div>
                        : <div className="navbar-nav">
                            <Link className="nav-item nav-link mr-3" to="/auth">Sign In</Link>
                        </div>
                    }
                </div>
            </nav>
        </header>
    );
};

export default withState(Header);