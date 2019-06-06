import React, { Component, Fragment } from 'react';

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
                <Toolbar showBar={this.showSideDrawerHandler} />
                <SideDrawer
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

export default Layout;