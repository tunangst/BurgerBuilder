import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './App.module.css';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Authentication/Auth';
import Logout from './containers/Authentication/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {

  componentDidMount = () => {
    this.props.onTryAutoSignIn();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/authentication" component={Authentication} />
        <Route path="/" component={BurgerBuilder} exact />
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/authentication" component={Authentication} />
          <Route path="/" component={BurgerBuilder} exact />
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <div className={styles.App} >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckStateOfToken())
  };
};
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
