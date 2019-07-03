import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading';

import styles from './ContactData.module.css';

class ContactData extends Component {
    state = {
        name: '',
        phone: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading: false
    }
    handleOrder = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);


        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            // customer: {
            //     name: 'Travis Unangst',
            //     address: {
            //         street: 'blahblah lane',
            //         zipCode: '55555'
            //     },
            //     email: 'blahblah@this.com'
            // },
            // deliveryMethod: 'urgent'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {
        let form = (
            <form>
                <input className={styles.Input} type='text' name='name' placeholder='Your Name'></input>
                <input className={styles.Input} type='email' name='email' placeholder='Your Email'></input>
                <input className={styles.Input} type='text' name='address' placeholder='Your Address'></input>
                <input className={styles.Input} type='text' name='zip' placeholder='Your Zip'></input>
                <Button
                    btnType="Success"
                    clicked={this.handleOrder}
                >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Loading />
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;