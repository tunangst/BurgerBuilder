import React, { Fragment } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import styles from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let addClasses = [styles.SideDrawer, styles.Close];
    if (props.open) {
        addClasses = [styles.SideDrawer, styles.Open]
    }
    return (
        <Fragment>
            <div className={addClasses.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}>
                    <Logo height='11%' />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
            <Backdrop
                show={props.open}
                clicked={props.closed}
            />
        </Fragment>
    );
}

export default sideDrawer;