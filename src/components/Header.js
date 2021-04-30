import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';

const Header = (props) => {
    return (
        <header>
            <nav className="navbar navbar-expand-sm fixed-top navbar-light bg-light">
                <Link className="navbar-brand mt-2">Chatt</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse jusify-content-end" id="navbarNavAltMarkup">
                    {auth().currentUser
                        ? <div className="navbar-nav">
                            <Link className="nav-item nav-link mr-3 mt-2" to="/chat">Profile</Link>
                            <button className="btn btn-primary mr-3" onClick={() => auth().signOut()}>Logout</button>
                        </div>
                        : <div className="navbar-nav">
                            <Link className="nav-item nav-link mr-3" to="/login">Sign In</Link>
                            <Link className="nav-item nav-link mr-3" to="/signup">Sign Up</Link>
                        </div>}
                </div>
            </nav>
        </header >
    );
};

export default Header;