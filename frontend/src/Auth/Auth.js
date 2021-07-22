import React from 'react';
import { withState } from '../chat-context';
import { withRouter } from 'react-router';
import AuthService from '../services/AuthService';
import { AUTH_FAIL, AUTH_SUCCESS } from '../store/actionTypes';


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
            isSignup: false
        }
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    authHandler = () => {
        this.setState({ isSignup: !this.state.isSignup });
    }

    authFormSubmitHandler = (event) => {
        event.preventDefault();
        const { email, password, isSignup } = this.state;
        if (isSignup) {
            AuthService.signup({ email: email, password: password })
                .then(res => {
                    this.props.dispatch({ type: AUTH_SUCCESS, user: res });
                    this.props.history.push('/chat');
                })
                .catch(err => {
                    this.props.dispatch({ type: AUTH_FAIL, error: err.message });
                })
        } else {
            AuthService.login({ email: email, password: password })
                .then(res => {
                    this.props.dispatch({ type: AUTH_SUCCESS, user: res });
                    this.props.history.push('/chat');
                })
                .catch(err => {
                    this.props.dispatch({ type: AUTH_FAIL, error: err.message });
                })
        }
    }

    render() {
        const { email, password, isSignup } = this.state;
        return (
            <div className="form-group container col-6 center my-5 p-5">
                <form onSubmit={this.authFormSubmitHandler}>
                    <p>Fill in the form below to login to your account.</p>
                    <div className="m-3">
                        <input
                            value={email}
                            className="form-control"
                            placeholder="Enter Email"
                            name="email"
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="m-3">
                        <input
                            className="form-control"
                            value={password}
                            placeholder="Enter Password"
                            name="password"
                            onChange={this.changeHandler}
                        />
                    </div>
                    <div className="m-3">
                        <button type="submit" className="btn btn-block btn-primary">
                            {isSignup
                                ? 'SIGN UP'
                                : 'LOGIN'
                            }
                        </button>
                    </div>
                </form>
                <div className="m-3">
                    <button onClick={this.authHandler} className="btn btn-block btn-outline-secondary">
                        {isSignup
                            ? 'Already have an account ? Login here'
                            : "Don't have an account ? Signup here"
                        }
                    </button>
                </div>
            </div>
        );
    }
};

export default withRouter(withState(Auth));
