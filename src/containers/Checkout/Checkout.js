import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
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