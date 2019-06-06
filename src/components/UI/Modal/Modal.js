import React, { Component, Fragment } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.css';
class Modal extends Component {
    componentDidUpdate(nextProps, nextState) {
        console.log('[Modal] did update');
        return nextProps.show !== this.props.show;
    }
    render() {
        return (
            <Fragment>
                <div
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
                <Backdrop
                    show={this.props.show}
                    clicked={this.props.closeModal}
                />

            </Fragment>
        )
    }
};

export default Modal;