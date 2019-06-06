import React, { Component, Fragment } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //converted to class just for debugging purposes to see when didUpdate fired
    componentDidUpdate() {
        console.log('[OrderSummary] didUpdate');
    }
    render() {
        const ingredientSummary = this.props.ingredients;
        let result = ingredientSummary.map((ing, index) => {
            return (
                <li key={index}>
                    <span style={{ textTransform: 'capitalize' }}>
                        {ing}
                    </span>
                </li>
            )
        });
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients stacked:</p>
                <ul>
                    {result}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <Button
                    btnType='Danger'
                    clicked={this.props.purchaseCanceled}
                >
                    cancel
                </Button>
                <Button
                    btnType='Success'
                    clicked={this.props.purchaseContinued}
                >
                    continue
                </Button>
            </Fragment>
        );
    }
};

export default OrderSummary;

// const orderSummary = (props) => {

//     const ingredientSummary = props.ingredients;
//     console.log(ingredientSummary)
//     let result = ingredientSummary.map((ing, index) => {
//         return (
//             <li key={index}>
//                 <span style={{ textTransform: 'capitalize' }}>
//                     {ing}
//                 </span>
//             </li>
//         )
//     });
//     console.log(result)
//     return (
//         <Fragment>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following ingredients stacked:</p>
//             <ul>
//                 {result}
//             </ul>
//             <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//             <Button
//                 btnType='Danger'
//                 clicked={props.purchaseCanceled}
//             >
//                 cancel
//             </Button>
//             <Button
//                 btnType='Success'
//                 clicked={props.purchaseContinued}
//             >
//                 continue
//             </Button>
//         </Fragment>
//     );
// };