import React, { Component, Fragment } from 'react';
// import axios from '../../axios-orders';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

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
        // axios.get('https://burger-builder-47451.firebaseio.com/ingredientCount.json')
        //     .then(response => {
        //         console.log(response)
        //         debugger;
        //         this.setState({ ingredientCount: response.data });
        //     })
        //     .catch(error => { });
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
        ingCount: state.ingredientCount,
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    //import redux actions
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
}

//connect returns a function so need another set of parameters
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);