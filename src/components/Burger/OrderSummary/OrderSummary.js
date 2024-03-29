import React, { Component, Fragment } from 'react';

import styles from './OrderSummary.module.css';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //converted to class just for debugging purposes to see when didUpdate fired
    componentDidUpdate() {
        // console.log('[OrderSummary] didUpdate');
    }
    render() {
        const ingredientSummary = this.props.ingredients;

        let result = ingredientSummary.map((ing, index) => {
            return (
                <li key={index}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {ing}
                    </span>
                </li>
            )
        });
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients stacked:</p>
                <ul className={styles.list}>
                    {result}
                </ul>
                <p className={styles.price}>Total Price: {this.props.price.toFixed(2)}</p>
                <Button
                    btnType='Danger'
                    clicked={this.props.purchaseCanceled}
                >
                    cancel
                </Button>
                <Button
                    btnType='Success'
                    clicked={this.props.purchaseContinued}
                >
                    continue
                </Button>
            </Fragment>
        );
    }
};

export default OrderSummary;