import React from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password);
        } catch (error) {
            this.setState({ error: error });
        }
    };

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="mt-5 py-5 px-5">
                    <h1>
                        Sign up to
                        <Link to="/" className="title ml-2">Chatt</Link>
                    </h1>
                    <p className="lead">Fill in the form below to create an account.</p>
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
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </div>
                    <hr></hr>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        );
    }
};

export default Signup;