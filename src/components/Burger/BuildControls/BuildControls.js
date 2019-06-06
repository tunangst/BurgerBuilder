import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import styles from './BuildControls.module.css';

const controls = [
    { label: 'TopBun', type: 'bun-top' },
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Patty', type: 'patty' },
    { label: 'BotBun', type: 'bun-bottom' },
];

const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p>Current Price: $ <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(element => {
                return <BuildControl
                    removed={() => props.removeIngredient(element.type)}
                    added={() => props.addIngredient(element.type)}
                    key={element.label}
                    ingredientLabel={element.label}
                    disabled={props.disabled[element.type]}
                />
            })}
            <button
                className={styles.OrderButton}
                disabled={!props.purchasable}
                onClick={props.orderScreen}
            >
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls;

