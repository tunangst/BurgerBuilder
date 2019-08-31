import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';


class Checkout extends Component {
    // state = {
    //     ingredients: [],
    //     totalPrice: 0
    // }
    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);

    //     let foundIngredients = [];
    //     let price = 0;

    //     for (let param of query.entries()) {
    //         foundIngredients = param[0].split('>');
    //         foundIngredients.pop();

    //         price = +param[1];

    //     }

    //     this.setState({ ingredients: foundIngredients, totalPrice: price });
    // }

    // componentDidMount = () => {
    //     this.props.onInitPurchase();
    // }
    handleCheckoutCancel = () => {
        this.props.history.goBack();
    }
    handleCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
        return (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCanceled={this.handleCheckoutCancel}
                    checkoutContinued={this.handleCheckoutContinue}
                />
                <Route
                    path={this.props.match.url + '/contact-data'}
                    component={ContactData}
                />
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};
// const mapDispatchToProps = dispatch => {
//     return {
//         onInitPurchase: () => dispatch(actions.purchaseInit())
//     };
// };

export default connect(mapStateToProps)(Checkout);