import './App.css';
import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
};

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/chat' />}
    />
  );
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true
    };
  };

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isAuthenticated: true,
          loading: false
        })
      } else {
        this.setState({
          isAuthenticated: false,
          loading: false
        })
      }
    })
  };

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) :
      (
        <div className="App">
          <BrowserRouter>
            <Switch>
              <PrivateRoute path="/chat" authenticated={this.state.isAuthenticated} component={Chat}></PrivateRoute>
              <PublicRoute path="/signup" authenticated={this.state.isAuthenticated} component={Signup}></PublicRoute>
              <PublicRoute path="/login" authenticated={this.state.isAuthenticated} component={Login}></PublicRoute>
              <Route to="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
      );
  }
}

export default App;
