import React from 'react';
import { Route, Switch } from 'react-router-dom';

import styles from './App.module.css';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
<<<<<<< HEAD
import Auth from './containers/Authentication/Auth';
=======
import Authentication from './containers/Authentication/Auth';
>>>>>>> d3f0b3076f5f34e060bb76cf658a467ccf3dc14e

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
<<<<<<< HEAD
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/' component={BurgerBuilder} exact />
=======
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/authentication" component={Authentication} />

          <Route path="/" component={BurgerBuilder} exact />
>>>>>>> d3f0b3076f5f34e060bb76cf658a467ccf3dc14e
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
