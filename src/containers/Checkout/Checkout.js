import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    state = {
        ingredients: [],
        totalPrice: 0
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);

        let foundIngredients = [];
        let price = 0;

        for (let param of query.entries()) {
            foundIngredients = param[0].split('>');
            foundIngredients.pop();

            price = +param[1];

        }

        this.setState({ ingredients: foundIngredients, totalPrice: price });
    }

    handleCheckoutCancel = () => {
        this.props.history.goBack();
    }
    handleCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.handleCheckoutCancel}
                    checkoutContinued={this.handleCheckoutContinue}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />}

                />
            </div>
        );
    };
}

export default Checkout;