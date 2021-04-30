import React from 'react';
import { Link } from 'react-router-dom';
import { signin } from '../helpers/auth';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signin(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error });
        }
    };

    render() {
        return (
            <div className="container">
                <form
                    className="mt-5 py-5 px-5"
                    onSubmit={this.handleSubmit}
                >
                    <h1 className="title ml-2">
                        Login to
                        <Link to="/">Chatt</Link>
                    </h1>
                    <p className="head">Fill in the form below to login to your account.</p>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            value={this.state.password}
                        />
                    </div>
                    <div className="form-group">
                        {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
                        <button type="submit" className="btn btn-primary px-5">Login</button>
                    </div>
                    <hr></hr>
                    <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                </form>
            </div>
        );
    }
};

export default Login;