import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Loading from '../../components/UI/Loading/Loading';

import Order from '../../components/Order/Order';
class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        let orders = <Loading />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);