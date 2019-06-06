import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import styles from './BurgerBuilder.module.css';

const INGREDIENT_PRICES = {
    lettuce: .70,
    cheese: 1.00,
    patty: 1.50,
    bacon: 1.00,
    'bun-top': 1.30,
    'bun-bottom': 1.00,

}

class BurgerBuilder extends Component {
    state = {
        //bottom up
        ingredients: [
            // 'bacon',
            // 'cheese',
            // 'bun-top',
            // 'lettuce',
            // 'patty',
            // 'cheese',
            // 'bacon',
            // 'cheese',
            // 'patty',
            'bun-bottom'
        ],
        ingredientCount: {
            "bun-top": 0,
            cheese: 0,
            lettuce: 0,
            bacon: 0,
            patty: 0,
            "bun-bottom": 1,

        },
        totalPrice: 1.00,
        purchasable: false,
        orderScreen: false
    }
    updatePurchaseState = (numIngredients) => {
        if (numIngredients > 0) {
            this.setState({ purchasable: true });
        } else {
            this.setState({ purchasable: false })
        }
    }
    orderScreenHandler = () => {
        this.setState({ orderScreen: true })
    }
    cancelPurchaseHandler = () => {
        this.setState({ orderScreen: false })
    }
    continuePurchaseHandler = () => {
        alert('You theoretically bought this burger!!')
    }
    addIngredientHandler = (type) => {
        const newIngredients = [type, ...this.state.ingredients];
        let newIngredientCount = { ...this.state.ingredientCount };
        newIngredientCount[type]++;

        const ingPrice = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice + ingPrice;

        this.setState({
            totalPrice: newPrice,
            ingredientCount: newIngredientCount,
            ingredients: newIngredients
        });
        // console.log(`=======================`)
        // console.log(newIngredients.length)
        this.updatePurchaseState(newIngredients.length);
    }
    removeIngredientHandler = (type) => {
        console.log(this.state.ingredients, this.state.ingredients.length)

        if (this.state.ingredients.length > 0 && this.state.ingredientCount[type] > 0) {
            let checkIngredients = [...this.state.ingredients];
            for (let i = 0; i < checkIngredients.length; i++) {
                if (checkIngredients[i] === type) {
                    checkIngredients.splice(i, 1);
                    break;
                } else {
                    console.log(`there is no food of that type on the burger currently`);
                }
            }

            let updateIngredientCount = { ...this.state.ingredientCount };
            updateIngredientCount[type]--;

            const ingPrice = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            let newPrice = oldPrice - ingPrice;

            this.setState({
                totalPrice: newPrice,
                ingredientCount: updateIngredientCount,
                ingredients: checkIngredients,
            });
            // console.log(`=======================`)
            // console.log(checkIngredients.length)
            this.updatePurchaseState(checkIngredients.length);
        }
    }

    render() {
        const disabledInfo = { ...this.state.ingredientCount };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <Fragment>
                <Modal
                    show={this.state.orderScreen}
                    closeModal={this.cancelPurchaseHandler}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.cancelPurchaseHandler}
                        purchaseContinued={this.continuePurchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <div className={styles.container}>
                    <div className={styles.burgerContainer}>
                        <p className={styles.lable}>stack the burger</p>
                        <Burger ingredients={this.state.ingredients} />
                    </div>
                    <div className={styles.controlContainer}>
                        <BuildControls
                            addIngredient={this.addIngredientHandler}
                            removeIngredient={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            orderScreen={this.orderScreenHandler}
                            purchasable={this.state.purchasable}
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;