import React from 'react';
import { withState } from './chat-context';
import { withRouter, Redirect, Route, Switch } from 'react-router-dom';
import { SET_AUTH_DATA } from './store/actionTypes';
import Header from './Header/Header';
import Home from './Home/Home';
import Auth from './Auth/Auth';
import Chat from './Chat/Chat';
import './App.css';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />}
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


  componentDidMount() {
    const user = localStorage.getItem('user');
    user && this.props.dispatch({ type: SET_AUTH_DATA, user: user });
    window.onunload = () => {
      localStorage.clear();
    }
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <PrivateRoute path='/chat' authenticated={this.props.state.user ? true : false} component={Chat} />
          <PublicRoute path='/auth' authenticated={this.props.state.user ? true : false} component={Auth} />
          <PublicRoute path='/' exact authenticated={this.props.state.user ? true : false} component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withState(App));
