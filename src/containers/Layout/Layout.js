import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    closeSideDrawerHandler = () => {
        this.setState({ showSideDrawer: false });
    }
    showSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true });
    }
    render() {
        return (
            <Fragment>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    showBar={this.showSideDrawerHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.closeSideDrawerHandler}
                    open={this.state.showSideDrawer}
                />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};
export default connect(mapStateToProps)(Layout);