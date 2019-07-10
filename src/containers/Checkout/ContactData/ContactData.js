import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Loading from '../../../components/UI/Loading/Loading';
import Input from '../../../components/UI/Input/Input';

import styles from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        started: true
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Address'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        started: true
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          exactLength: 5
        },
        valid: false,
        started: true
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'you@e-mail.com'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        started: true
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'norush', displayValue: 'No Rush' },
            { value: 'urgent', displayValue: 'Urgent' }
          ]
        },
        value: 'norush',
        validation: {
          required: false
        },
        valid: true
      }
    },
    allValid: false,
    loading: false
  };
  handleOrder = event => {
    event.preventDefault();
    console.log(this.props.ings);
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };
  handleInputChange = (event, inputID) => {
    console.log(event.target.value);
    const updatedForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedForm[inputID]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.started = false;

    let allValid = true;
    for (let inputIdentifier in updatedForm) {
      allValid = updatedForm[inputIdentifier].valid && allValid;
    }

    updatedForm[inputID] = updatedFormElement;
    this.setState({
      orderForm: updatedForm,
      allValid: allValid
    });
  };
  checkValidity = (value, validation) => {
    let isValid = false;
    if (!validation.required) {
      return true;
    }
    if (validation.required) {
      isValid = value.trim() !== '';
    }
    if (validation.exactLength) {
      isValid = value.length === validation.exactLength;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength;
    }
    if (validation.maxLength) {
      isValid = value.length <= validation.maxLength;
    }
    return isValid;
  };

  render() {
    const formElementsArr = [];
    for (let key in this.state.orderForm) {
      formElementsArr.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.handleOrder}>
        {formElementsArr.map(formElement => (
          <Input
            started={formElement.config.started}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            changed={event => this.handleInputChange(event, formElement.id)}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.allValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Loading />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}
export default connect(mapStateToProps)(ContactData);
