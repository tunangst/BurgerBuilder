import React, { Component, Fragment } from 'react';
// import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loading from '../../components/UI/Loading/Loading';

import styles from './BurgerBuilder.module.css';

class BurgerBuilder extends Component {
    state = {
        orderScreen: false,
        loading: false
    }
    componentDidMount() {
        console.log(this.props);

    }
    updatePurchaseState = (numIngredients) => {
        console.log(numIngredients)
        return numIngredients.length > 1;
    }
    orderScreenHandler = () => {
        this.setState({ orderScreen: true });
    }
    cancelPurchaseHandler = () => {
        this.setState({ orderScreen: false });
    }
    continuePurchaseHandler = () => {
        // alert('You theoretically bought this burger!!');
        // would recalculate price on server so orderer doesn't alter price
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingCount };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Loading />;
        if (this.props.ings) {
            burger = (
                <div className={styles.container}>
                    <div className={styles.burgerContainer}>
                        <p className={styles.label}>stack the burger</p>
                        <Burger ingredients={this.props.ings} />
                    </div>
                    <div className={styles.controlContainer}>
                        <BuildControls
                            addIngredient={this.props.onIngredientAdded}
                            removeIngredient={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.price}
                            orderScreen={this.orderScreenHandler}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                        />
                    </div>
                </div>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCanceled={this.cancelPurchaseHandler}
                    purchaseContinued={this.continuePurchaseHandler}
                    price={this.props.price}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Loading />;
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.orderScreen}
                    closeModal={this.cancelPurchaseHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}


//connect module to the redux store
const mapStateToProps = state => {
    //maps "ings" to redux state.ingredients for this module
    return {
        ingCount: state.burgerBuilder.ingredientCount,
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}
const mapDispatchToProps = dispatch => {
    //import redux actions
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

//connect returns a function so need another set of parameters
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);