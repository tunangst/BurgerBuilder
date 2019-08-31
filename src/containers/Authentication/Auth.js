import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import * as actions from '../../store/actions/index';

import styles from './Auth.module.css';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                started: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                started: false
            }
        },
        isSignup: true
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
        if (validation.isEmail) {
            const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = emailRegex.test(value);
        }
        return isValid;
    };

    handleInputChange = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                started: true
            }
        };
        this.setState({ controls: updatedControls });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    switchAuthenticationMode = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    };

    render() {
        const formElementsArr = [];
        for (let key in this.state.controls) {
            formElementsArr.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        const formElements = formElementsArr.map(formElement => (
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
        ));
        return (
            <div className={styles.Auth}>
                <form onSubmit={this.handleSubmit}>
                    {formElements}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthenticationMode}>
                    swap to {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup))
    };
};
export default connect(
    null,
    mapDispatchToProps
)(Auth);
