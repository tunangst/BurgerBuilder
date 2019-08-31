import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';
import Loading from '../../components/UI/Loading/Loading';

import Order from '../../components/Order/Order';
class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Loading />;
        console.log(this.props.loading)
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
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);